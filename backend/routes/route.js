const routes = require('express').Router();
const multer = require("multer");


const validationSignup = require('../middlewares/validationSignup');
const validationLogin = require('../middlewares/vakidationLogin');
const signup = require('./auth/Signup');
const login = require('./auth/Login');
const AddNote = require('./notes/AddNotes')
const getNotes = require('./notes/GetNotes')
const upload = multer({dest:"uploads/"}) 


routes.post("/signup",validationSignup,signup);
routes.post("/login",validationLogin,login);
routes.post("/addnote",upload.array('files', 10),AddNote);

routes.get("/getnotes/:uid",getNotes)
module.exports = routes