require('dotenv').config({path:'../.env'});
const express=require('express');
const app=express()
const cors = require('cors');
require('./db/conn')
const  cookieParser = require('cookie-parser')
const UserRouter=require('./routers/user.router')
const BookmarkRouter=require('./routers/bookmark.router')
const CategoryRouter=require('./routers/category.router')
const PORT=8000;
const {getLinkPreview}=require('link-preview-js')


app.use(cookieParser())
const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(UserRouter)
app.use(BookmarkRouter)
app.use(CategoryRouter)




  
// getLinkPreview("https://codepen.io/angeladelise/pen/Bajdvav",{timeout:10000}).then((data)=>{
//     console.log(data)
    
//     // console.log(data.images[0]);
    
// }).catch((e)=>{
//     console.log(e);
// })



app.listen(PORT,()=>{
    console.log(`server running at https://localhost:${PORT}`);
})