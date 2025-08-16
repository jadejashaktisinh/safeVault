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
    notes:[{type: Schema.Types.ObjectId ,ref:'notes' }],
    folders:[{type: Schema.Types.ObjectId ,ref:'folders' }]


});

module.exports = mongoose.model("user",userSchema);