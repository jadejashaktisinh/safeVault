const mongoose = require('mongoose')

const notesSchema = mongoose.Schema({

    title:String,
    desc:String,
    isPrivate:Boolean,
    files_url:[{
        url:String,
        file_type:String
    }],

})

module.exports = mongoose.model("notes",notesSchema)