const mongoose=require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const BookmarkSchema=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    hostname:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    categoryId:{
        type:ObjectId,
        ref:"categories",
        required:false
    },
    userBy:{
        type:ObjectId,
        ref:"user"
    },
    created:{
        type:String,
        required:true,
    },
    lastUpdate:{
        type:String,
        required:false,
    },

}, {
    timestamps: true,
})
const Bookmark=new mongoose.model('bookmark',BookmarkSchema)
module.exports=Bookmark;