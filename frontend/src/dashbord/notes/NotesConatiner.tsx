import { useEffect, useState } from "react";
import Note from "./Note";
import Masonry from "react-masonry-css";
import PopupForm from "./PopUPForm";
import AddButton from "../../components/AddButton";

export default function NotesConatiner() {
  
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1
  };
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<{
    isPrivate: boolean,
    _id: string,
    desc: string,
    title: string,
    files_url: {
      file_type: string,
      url: string
    }[]
  }[] | null>(null)

  useEffect(() => {

    fetch(`${apiUrl}/getnotes/all`, {
      method: "GET",
      credentials: "include",
    }).then(res => {
      res.json().then(data => {
        setNotes(data)

      })
    })
  }, [isOpen])
  function onClose() {
    setIsOpen(false);
  }

  return (

    <div className="p-6">
      <div className="flex  justify-between  items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">My Notes</h2>
        <AddButton onClick={() => { setIsOpen(true) }} text={"Add Note"} />
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-5"
        columnClassName="space-y-5"
      >

        {
          notes?.map((note) => (
            <Note
              title={note.title}
              desc={note.desc}
              files_url={note.files_url}
              isPrivate={note.isPrivate}
              _id={note._id}
            />
          ))
        }
      </Masonry>
      {isOpen && <PopupForm onClose={onClose} />}
    </div>


  )
}
