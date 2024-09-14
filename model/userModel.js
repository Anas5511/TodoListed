const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
        minlength : 3
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        minlength : 3
    },
    email : {
        type : String,
        unique : true,
        validate :[ validator.isEmail , "Please Add an Valid Email "],
        required : true
    },
    password : {
        type : String ,
        minlength : 8,
        maxlenght : 25,
        required : true
    },
    passwordChangedAt : {type : Date , default : Date.now()},
    role : {
        type : String,
        enum : ["user" , "admin"],
        default : "user"
    }
}, {timestamps : true})


const userModel = mongoose.model("user" , userSchema)
module.exports = userModel