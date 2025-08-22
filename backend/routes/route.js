const routes = require('express').Router();
const multer = require("multer");


const validationSignup = require('../middlewares/validationSignup');
const validationLogin = require('../middlewares/vakidationLogin');
const signup = require('./auth/Signup');
const login = require('./auth/Login');
const AddNote = require('./notes/AddNotes')
const getNotes = require('./notes/GetNotes')
const deleteNote = require("./notes/DeleteNote");
const updateNote = require("./notes/UpdateNote");


const addFolder = require("./folders/AddFolder");
const getFolders = require("./folders/GetFolders");
const upload = multer({dest:"uploads/"}) 


routes.post("/signup",validationSignup,signup);
routes.post("/login",validationLogin,login);
routes.post("/addnote",upload.array('files', 10),AddNote);
routes.post("/updatenote/:id",upload.array("files", 10),updateNote);

routes.post("/addfolder",addFolder);



routes.get("/getnotes/:uid/:type",getNotes)
routes.get("/deletenote/:id",deleteNote);

routes.get("/getfolders/:uid/:type",getFolders)

module.exports = routes