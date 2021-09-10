const mongoose=require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const CategorySchema=new mongoose.Schema({
    created:{
        type:String,
        required:true,
    },
    lastUpdate:{
        type:String,
        required:false,
    },
    category:{
        type:String,
        required:true,
    },
    userBy:{
        type:ObjectId,
        ref:"user"
    }
})
const Category=new mongoose.model('categories',CategorySchema);
module.exports=Category;