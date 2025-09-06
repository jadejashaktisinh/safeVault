const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notesSchema = mongoose.Schema({
    userId:{type: Schema.Types.ObjectId ,ref:'user',default:null },
    title:{type:String,required:true},
    desc:{type:String,default:""},
    isPrivate:{type:Boolean,default:false},
    parentId:{type: Schema.Types.ObjectId ,ref:'folders',default:null },
    files_url:{
        type:[{
            url:String,
            file_type:String, 
        }],
        default:[]
    },

},{ timestamps: true })

module.exports = mongoose.model("notes",notesSchema)