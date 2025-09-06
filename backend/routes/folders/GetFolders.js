const NoteSchema = require('../../models/NotesSchema')
const folderSchema = require("../../models/FolderSchema");

const getNotes = async (req, res) => {


        const { id, type } = req.params
        const uid = req.user._id;
        console.log(uid);
        if (type == "all") {

                const folder = await folderSchema.find({ userId: uid, parentId: null });
                console.log(folder);
                res.status(200).json([...folder])
                return;
        } else {

                const notes = await NoteSchema.find({ parentId: id });
                const folder = await folderSchema.findById(id);
                const folders = await folderSchema.find({ parentId: id });
                res.status(200).json({
                        ...folder._doc,
                        notes: notes,
                        folders: folders,
                        success: true,
                });

                return;
        }


}

module.exports = getNotes