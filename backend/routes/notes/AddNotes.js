const userSchema = require('../../models/UserSchema')
const NotesShema = require('../../models/NotesSchema')
const AddInsideFolder = require("../folders/AddInsideFolder");
const activityLoger = require("../../utils/ActivityLoger");
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();


const AddNotes = async (req, res) => {

  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    let files_url = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            resource_type: "auto",
          });
          files_url.push({
            url: result.secure_url,
            file_type: file.mimetype
          });
          fs.unlinkSync(file.path);
        } catch (uploadError) {
          console.error('Error uploading file:', uploadError);
          throw uploadError;
        }
      });

     
      await Promise.all(uploadPromises);
    }

    const { title, desc, isPrivate,folderId } = req.body;
    const uid = req.user._id;
    const newNote = new NotesShema({
      userId:uid,
      title,
      desc,
      isPrivate,
      files_url
    });
    const note  = await newNote.save();
    activityLoger(uid,"create","note created successfully");

    if(folderId){
      req.body.folderId = folderId,
      req.body.uploadId = note._id;
      req.body.type = "notes";
      console.log(folderId);
      await AddInsideFolder(req,res);
      return;
    }
    
    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      note: newNote
    });
  } catch (error) {
    if (req.files) {
      req.files.forEach(file => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error creating note",
      error: error.message
    });
  }
};

module.exports = AddNotes;
