const { verifyAccessToken } = require("../services/token-service");

module.exports=async (req,res,next)=>{
    try{
        const {accessToken}=req.cookies;
        // console.log(accessToken);
        if(!accessToken){
            throw new Error()
        }
        const userData=await verifyAccessToken(accessToken)
        if(!userData){
            throw new Error()
        }
        console.log("userData: ",userData);
        req.user=userData
        next()
    }
    catch(e){
        console.log(e);
        res.status(401).json({message:"Invalid Token"})
    }
  
}