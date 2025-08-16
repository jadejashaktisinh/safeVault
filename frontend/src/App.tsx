import { Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage/LandingPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Page from "./notes/Page";
import FaceRecognition from "./notes/FaceRecognition";
import NoteDetails from "./notes/NoteDetails";
import NotesConatiner from "./notes/NotesConatiner";

export default function App() {
  return (
    <>
   
    
      <Routes>
          <Route path="/" element={ <LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/notes" element={<Page/>}>
                  <Route index element={<NotesConatiner/>}/>
                  <Route path=":id" element={<NoteDetails/>}/>
          </Route>
          <Route path="/faceverify/:id" element={<FaceRecognition mode="verify" userId={localStorage.getItem('_id')}/>}/>
      </Routes>
    </>
   
   
  )
}
