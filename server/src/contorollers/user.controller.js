const User = require('../models/user.model')

const crypto = require("crypto");
const sendMail = require('../services/email-sender')
const tokenServices = require('../services/token-service');
const bcrypt = require('bcryptjs');


module.exports.createuser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ message: "All Fields are Required" })
        }
        //check if email id is alreadyExists
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.json({ successfull: false, message: "Email id is already Exists " })
        }

        //hash password
        const hasedPassword = await bcrypt.hash(password, 12)
        const user = await new User(
            {
                name, email,
                password: hasedPassword,
                verificationCode: crypto.randomBytes(32).toString("hex")

            }).save()
        // console.log(user);
        // res.json({ user: user })

        let html = `
        <h1>Hello, ${user.name}</h1>
        <p>Please click the following link to verify your Account</p>
        <a href="${process.env.BASE_URL}api/user/register/verify/${user.verificationCode}">Verify Now</a>
        `
        sendMail(user.email, "Bookmark Manager App", "Please Verify Your Account", html)

        //here VerificationLink is temprory send in client side
        return res.json({
            successfull: true,
            message: "Hurray! Your Account is created Please verify your email address",
            VerificationLink: `${process.env.BASE_URL}api/user/register/verify/${user.verificationCode}`
        })

    }

    catch (err) {

        if (err) {
            if (err.name == 'ValidationError') {
                for (field in err.errors) {
                    console.log(err.errors[field].message);
                    return res.status(400).json({ error: err.errors[field].message })
                }
            } else {
                console.log(err);
                return res.status(400).json({ errors: err })
            }
        }

    }

}
module.exports.verifyuser = async (req, res) => {
    try {
        const { verificationcode } = req.params;
        const user = await User.findOne({ verificationCode: verificationcode });
        if (!user) {
            return res.json({ successfull: false, message: "Invalid Verification Code" })
        }
        user.isVerified = true;
        user.verificationCode = undefined
        await user.save()


        return res.json({ message: "Your account is verifed", user: user, auth: true })
    }
    catch (e) {
        console.log(e);
        return res.status(401).json({ error: "Some verification Error please try again" })
    }
}

module.exports.loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const userLogin = await User.findOne({ email });
        // console.log("userLogin: ",userLogin);

        if (userLogin) {

            //first check the user is verifed email
            if (!userLogin.isVerified) {
                return res.json({ successfull: false, message: "Invalid details" })
            }

            //check password
            const isMatch = await bcrypt.compare(password, userLogin.password)
            if (!isMatch) {
                return res.json({ successfull: false, message: "Invalid details" })
            }
            else {

                //token
                const { accessToken, refreshToken } = tokenServices.generateTokens({
                    _id: userLogin._id
                });

                //store referesh token in db
                await tokenServices.storeRefreshToken(refreshToken, userLogin._id)

                res.cookie('refreshToken', refreshToken, {
                    maxAge: 1000 * 60 * 60 * 24 ** 30,
                    httpOnly: true
                })
                res.cookie('accessToken', accessToken, {
                    maxAge: 1000 * 60 * 60 * 24 ** 30,
                    httpOnly: true
                })
                // console.log(req.cookies);
                res.json({ successfull: true, message: "🙂 Hurray! user login successfully", user: userLogin,tokens: refreshToken})
            }


        } else {
            res.json({ successfull: false, message: "Invalid details" })
        }

    } catch (e) {
        console.log(e);
    }
}


module.exports.refresh = async (req, res) => {
    //1. get refresh token from cookie
    //2. check if refresh token is valid
    //3. check if refresh token is in db
    //4. check if valid user
    //5. generate new tokens refretoken and accesstoken
    //6. update refreshtoken in db
    //7. put in cookie
    //8. response


    //1.get refresh token from cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    console.log(req.cookies);
    console.log('refresh refreshToken: ',refreshTokenFromCookie);

    //2. check if refresh token is valid
    let userData;
    try {
        userData = await tokenServices.verifyRefreshToken(refreshTokenFromCookie)

    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" })
    }
    console.log('userData: ',userData);
    //3. check if refresh token is in db


    try {
        const token = await tokenServices.findRefreshToken(userData._id, refreshTokenFromCookie)

        if(!token){
            return res.status(401).json({ message: "Invalid Token" })
        }
        console.log('findrefreshToken: ',token);
    } catch (err) {
        return res.status(500).json({ message: "Internal error" })
    }



    //4. check if valid user
    const user=await User.findOne({_id:userData._id});

    if(!user){
        return res.status(404).json({ message: "No user" })
    }
    console.log('find user refreshToken: ',user);    

     //5. generate new tokens refretoken and accesstoken
     const {accessToken,refreshToken}=await tokenServices.generateTokens({_id:userData._id})

    console.log('new tokens');
    console.log('accessToken: ',accessToken);
    console.log('refreshToken: ',refreshToken);
     //6. update refreshtoken in db
      

        try{
          const updateToken= await tokenServices.updateRefreshToken(userData._id,refreshToken)
          console.log('updateToken: ',updateToken);

        }catch(err){
            return res.status(500).json({ message: "Internal error" })
        }


      //7. put in cookie

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 ** 30,
            httpOnly: true
        })
        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 ** 30,
            httpOnly: true
        })

      //8. response

      res.json({user:user,auth:true})
}

module.exports.logoutuser=async(req,res)=>{
    //delete refreshToen from db
    const {refreshToken}=req.cookies
    await tokenServices.removeRefreshToken(refreshToken);

    //delete cookies
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')
    res.json({user:null,auth:false})

}