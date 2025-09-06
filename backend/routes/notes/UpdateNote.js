const NoteSchema = require("../../models/NotesSchema");
const addActivity = require("../../utils/ActivityLoger");


const UpdateNote = async (req,res)=>{

    const { title, desc, isPrivate, } = req.body;
    const {id} = req.params;

    try{
            const updated = await NoteSchema.findByIdAndUpdate(id,{title:title,desc:desc,isPrivate:isPrivate}, { new: true } );
           
            addActivity(updated.userId,"update",`updated note ${updated.title}`)
            res.status(200).json(({msg:"updated sccussesfully",success:true}))
    }catch(e){
        res.status(400).json({ msg: e.message, success: false });
    }
}
module.exports = UpdateNote;