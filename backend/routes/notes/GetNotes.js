const userSchema = require('../../models/UserSchema')

const getNotes = async(req,res) =>{


        const {uid} = req.params
        
        const notes =  await userSchema.findById(uid).populate('notes');

        res.status(200).json([...notes.notes])
}

module.exports = getNotes