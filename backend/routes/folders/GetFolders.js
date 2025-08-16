const userSchema = require('../../models/UserSchema')
const folderSchema = require("../../models/FolderSchema");

const getNotes = async(req,res) =>{


        const {uid,type} = req.params
        
        if(type == "all"){

                const folder =  await userSchema.findById(uid).populate('folders');
                console.log(folder);
                  res.status(200).json([...folder.folders])
                  return;
        }else{
                const folders = await folderSchema.findById(uid);
                // console.log(folders);
                
                 res.status(200).json(folders);
                 return;
        }

      
}

module.exports = getNotes