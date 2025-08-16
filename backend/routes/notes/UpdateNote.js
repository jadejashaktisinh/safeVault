const NoteSchema = require("../../models/NotesSchema");


const UpdateNote = async (req,res)=>{

    const {data,id} = req.body;

    try{
            const updated = await NoteSchema.findByIdAndUpdate(id,data);
            res.status(200).json(({msg:"updated sccussesfully",success:true}))
    }catch(e){
        res.status(400).json({ msg: e.message, success: false });
    }
}
module.exports = UpdateNote;