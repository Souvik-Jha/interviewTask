const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required: true
    },
    userType:{
        type:String,
        enum:["vendor","Customer"]
    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)