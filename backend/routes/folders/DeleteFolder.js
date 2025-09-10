const FolderSchema = require("../../models/FolderSchema");
const addActivity = require("../../utils/ActivityLoger");

const DeleteFolder = async function (req, res) {

    const { id } = req.params;

    try {
        const deletedFolder = await FolderSchema.findByIdAndDelete(id);
        addActivity(deletedFolder.userId,"delete",`deleted folder ${deletedFolder.title}`)
        res.status(200).json({ msg: "note deleted successfully", sucsess: true });
    } catch (e) {  
        res.status(400).json({ msg: e.message, success: false });
    }

}
module.exports = DeleteFolder