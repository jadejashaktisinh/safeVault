const routes = require('express').Router();
const multer = require("multer");


//authnectication
const validationSignup = require('../middlewares/validationSignup');
const validationLogin = require('../middlewares/vakidationLogin');
const signup = require('./auth/Signup');
const login = require('./auth/Login');

//notes 
const AddNote = require('./notes/AddNotes')
const getNotes = require('./notes/GetNotes')
const deleteNote = require("./notes/DeleteNote");
const updateNote = require("./notes/UpdateNote");

//folders
const addFolder = require("./folders/AddFolder");
const getFolders = require("./folders/GetFolders");
const updateFolder = require("./folders/UpdateFolder");
const deleteFolder = require("./folders/DeleteFolder");

//home
const getRecent = require("./home/GetRecent");

//activity
const getAcitity = require('./activitylog/GetActivity');


const verifyToken = require('../utils/VerifyToken');
const upload = multer({dest:"uploads/"}) 



//auth
routes.post("/signup",validationSignup,signup);
routes.post("/login",validationLogin,login);

//notes
routes.post("/addnote",verifyToken,upload.array('files', 10),AddNote);//done
routes.post("/updatenote/:id",upload.array("files", 10),updateNote);
routes.get("/getnotes/:type{/:id}",verifyToken,getNotes) //done
routes.get("/deletenote/:id",deleteNote);

//folders
routes.post("/addfolder",verifyToken,upload.none(),addFolder);//done
routes.post("/updatefolder/:id",upload.none(),updateFolder);
routes.get("/getfolders/:type{/:id}",verifyToken,getFolders);//done
routes.get("/deletefolder/:id",deleteFolder);

//home
routes.get("/getrecent",verifyToken,getRecent);//done

//activity
routes.get("/getactivity",verifyToken,getAcitity);//done


module.exports = routes