const mongoose = require('mongoose')
const Schema = mongoose.Schema

const folderSchema = mongoose.Schema({
    userId:{type: Schema.Types.ObjectId ,ref:'user',default:null },
    title:{type:String,required:true},
    desc:{type:String,default:""},
    isPrivate:{type:Boolean,default:false},
    parentId:{type: Schema.Types.ObjectId ,ref:'folders',default:null },
},{ timestamps: true })

module.exports = mongoose.model("folders",folderSchema)