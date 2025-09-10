const FolderSchema = require("../../models/FolderSchema");
const NoteSchema = require("../../models/NotesSchema")

const AddInsideFolder = async (req, res) => {

    const { folderId, uploadId, type } = req.body;

    if (!folderId || !uploadId) {
        return res.status(400).json({ msg: "data is missing", success: false });
    }
    try {
        let folder;
        if (type == "notes") {
            await NoteSchema.findByIdAndUpdate(uploadId, { parentId: folderId })
            folder = await FolderSchema.findByIdAndUpdate(
                folderId, {
                $addToSet: {
                    notes: uploadId
                }
            }, { new: true });
        } else if (type == "folders") {

            await FolderSchema.findByIdAndUpdate(uploadId, { parentId: folderId, })
            folder = await FolderSchema.findByIdAndUpdate(
                folderId, {
                $addToSet: {
                    folders: uploadId
                }
            }, { new: true });
        }

        res.status(200).json({ msg: ` ${type} added created`, success: true });
    } catch (e) {
        res.status(400).json({ msg: e.message, success: false });
    }
}
module.exports = AddInsideFolder;