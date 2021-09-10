const jwt = require('jsonwebtoken');
const Referesh=require('../models/refreshtoken.model')

module.exports.generateTokens=(payload)=>{
    console.log("generateTokens");
    const accessToken=jwt.sign(payload,process.env.JWT_SECRECT_KEY,{
        expiresIn:"1h"
    })
    const refreshToken=jwt.sign(payload,process.env.JWT_REFERESH_SECRECT_KEY,{
        expiresIn:"1y"
    })

    return {accessToken,refreshToken}
};

module.exports.storeRefreshToken=async(token,userId)=>{
    try{
        await Referesh.create({
            token,userId
        })

    }catch(e){
        console.log(e);
    }
}

module.exports.verifyAccessToken=async(token)=>{
    return jwt.verify(token,process.env.JWT_SECRECT_KEY)
}

module.exports.verifyRefreshToken=async(refreshtoken)=>{
    return jwt.verify(refreshtoken,process.env.JWT_REFERESH_SECRECT_KEY)
}
module.exports.findRefreshToken=async(userId,refreshtoken)=>{
    return await Referesh.findOne({userId:userId,token:refreshtoken})
}

module.exports.updateRefreshToken=async(userId,refreshtoken)=>{
    return await Referesh.updateOne({userId:userId},{token:refreshtoken})
}

module.exports.removeRefreshToken=async(refreshtoken)=>{
    return await Referesh.deleteOne({token:refreshtoken})
}