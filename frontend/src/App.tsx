import { Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage/LandingPage";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Page from "./notes/Page";
import FaceRecognition from "./notes/FaceRecognition";

export default function App() {
  return (
    <>
   
    
      <Routes>
          <Route path="/" element={ <LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/notes" element={<Page/>}/>
          <Route path="/face" element={<FaceRecognition mode="verify" userId={localStorage.getItem('_id')}/>}/>
      </Routes>
    </>
   
   
  )
}
