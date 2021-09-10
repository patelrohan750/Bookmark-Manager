const mongoose=require('mongoose');
const validator = require('validator');
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Name is Required"],
        minlength:[3,"minimum 3 letters are required"],
        maxlength:[15,"maximum 15 letters allowed"]
    },
    email: {
        type: String,
        required: [true,"Email id is Required"],
        unique:[true,"Email id Already Exist"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }
        }
    },
    password:{
        type:String,
        required: [true,"Password is Required"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode:{
        type:String,
        required:false
    }
})

const User=new mongoose.model('user',UserSchema)
module.exports=User