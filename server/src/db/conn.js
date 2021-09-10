const mongoose=require('mongoose');

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).then(()=>{
    console.log("Database connection sucessfull");
}).catch((e)=>{
    console.log("No Database Connection!!!");
    console.log(e);
})