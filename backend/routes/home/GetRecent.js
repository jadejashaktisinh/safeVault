const folderSchema = require("../../models/FolderSchema")
const notesSchema = require("../../models/NotesSchema")


const getRecent = async(req,res) =>{


        const uid = req.user._id;
        
        const folders = await folderSchema.find({userId:uid}).sort({createdAt:-1,updatedAt:-1}).limit(5);
        const notes = await notesSchema.find({userId:uid}).sort({createdAt:-1,updatedAt:-1}).limit(5);

        res.status(200).json({notes:notes,folders:folders});
}

module.exports = getRecent;