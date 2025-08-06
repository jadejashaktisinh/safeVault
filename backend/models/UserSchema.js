const mongoose = require('mongoose');
const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    notes:[{type: Schema.Types.ObjectId ,ref:'notes' }]

});

module.exports = mongoose.model("user",userSchema);