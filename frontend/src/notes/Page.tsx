// import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
// import NoteDetails from "./NoteDetails";
// import NotesConatiner from "./NotesConatiner";
// import PopupForm from "./PopUPForm";

export default function Page() {

  // const [isOpen,setIsOpen] = useState(false)

  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-64">
          <Navbar />
        </div>
        <div className="flex-1 p-4 overflow-auto">
          
         <Outlet></Outlet>
        </div>
      </div>

      {/* <PopupForm /> */}

    </>
  )
}
