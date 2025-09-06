const userSchema = require('../../models/UserSchema')
const noteSchme = require("../../models/NotesSchema");

const getNotes = async(req,res) =>{


        const {id,type} = req.params
        const uid = req.user._id;
        if(type == "all"){

                const notes =  await noteSchme.find({userId:uid,parentId:null});
                  res.status(200).json([...notes])
                  return;
        }else{
                const notes = await noteSchme.findById(id);
                console.log(notes);
                
                 res.status(200).json(notes);
                 return;
        }

      
}

module.exports = getNotes