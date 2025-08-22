import { Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage/LandingPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Layout from "./dashbord/Layout";
import FaceRecognition from "./dashbord/notes/FaceRecognition";
import NoteDetails from "./dashbord/notes/NoteDetails";
import NotesConatiner from "./dashbord/notes/NotesConatiner";
import HomePage from "./dashbord/home/Page";
import FolderPage  from "./dashbord/folders/Page";

export default function App() {
  return (
    <>
   
    
      <Routes>
          <Route path="/" element={ <LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Layout/>}>
                  <Route path="home" element={<HomePage/>}/>
                  <Route path="notes" element={<NotesConatiner/>}/>
                  <Route path="notes/:id" element={<NoteDetails/>}/>
                  <Route path="folders" element={<FolderPage/>}/>
                  <Route path="folders/:id" element={<NoteDetails/>}/>
          </Route>
          <Route path="/faceverify/:id" element={<FaceRecognition mode="verify" userId={localStorage.getItem('_id')}/>}/>
      </Routes>
    </>
   
   
  )
}
