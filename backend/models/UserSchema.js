const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true, trim: true 
    },
    lastName:{
        type:String,
        required: true, trim: true 

    },
    email:{
        type:String,
        required: true, unique: true, lowercase: true, trim: true 
    },
    password:{
        type:String,
        required: true
    },
    token:String,
    refreshToken:String

});

module.exports = mongoose.model("user",userSchema);