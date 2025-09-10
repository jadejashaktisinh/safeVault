const noteSchema = require("../../models/NotesSchema");
const addActivity = require("../../utils/ActivityLoger");

const DeleteNote = async function (req, res) {

    const { id } = req.params;
    try {
        const deletedNote = await noteSchema.findByIdAndDelete(id);
        addActivity(deletedNote.userId,"delete",`deleted note ${deletedNote.title}`)
        res.status(200).json({ msg: "note deleted successfully", sucsess: true });
    } catch (e) {
        res.status(400).json({ msg: e.message, success: false });
    }

}
module.exports = DeleteNote