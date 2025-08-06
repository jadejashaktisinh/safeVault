import { useState } from "react";
import Navbar from "./Navbar";
import NotesConatiner from "./NotesConatiner";
import PopupForm from "./PopUPForm";

export default function Page() {


    const [isOpen,setIsOpen] = useState(false)

  return (
    <>
        <Navbar onOpen={() => setIsOpen(true)}/>
        <NotesConatiner/>
        {isOpen && <PopupForm onClose={() => setIsOpen(false)}/>}

    </>
  )
}
