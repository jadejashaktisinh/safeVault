const mongoose = require('mongoose')
const Schema = mongoose.Schema

const folderSchema = mongoose.Schema({

    title:String,
    desc:String,
    isPrivate:Boolean,
    notes:[{type: Schema.Types.ObjectId ,ref:'notes' }],
    folder:[{type: Schema.Types.ObjectId ,ref:'folders' }]
})

module.exports = mongoose.model("folders",folderSchema)