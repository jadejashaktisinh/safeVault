const noteSchema = require("../../models/NotesSchema");

const DeleteNote = async function (req, res) {

    const { id } = req.params;

    try {
        await noteSchema.findByIdAndDelete(id);

        res.status(200).json({ msg: "note deleted successfully", sucsess: true });
    } catch (e) {
        console.log(e);
        
        res.status(400).json({ msg: e.message, success: false });

    }

}
module.exports = DeleteNote