const FolderSchema = require("../../models/FolderSchema");
const userSchema = require("../../models/UserSchema");


const AddFolder = async (req,res)=>{

        const {data,uid} = req.body;

        try{
                const folderSchema = new FolderSchema(data);
                const newFolder =  await folderSchema.save();
                console.log(newFolder);
                
                await userSchema.findByIdAndUpdate(uid,{$push:{folders:newFolder._id}})


                res.status(200).json({ msg: "folder created", success: true });
        }catch(e){
                res.status(400).json({ msg: e.message, success: false });
        }
}
module.exports = AddFolder;