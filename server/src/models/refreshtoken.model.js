const mongoose=require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const refreshSchema=new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    userId:{
        type:ObjectId,
        ref:"user"
    }
},{
    timestamps:true
})
const Referesh=new mongoose.model('tokens',refreshSchema)
module.exports=Referesh