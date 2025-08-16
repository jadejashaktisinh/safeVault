const userSchema = require('../../models/UserSchema')
const noteSchme = require("../../models/NotesSchema");

const getNotes = async(req,res) =>{


        const {uid,type} = req.params
        
        if(type == "all"){

                const notes =  await userSchema.findById(uid).populate('notes');
                  res.status(200).json([...notes.notes])
                  return;
        }else{
                const notes = await noteSchme.findById(uid);
                console.log(notes);
                
                 res.status(200).json(notes);
                 return;
        }

      
}

module.exports = getNotes