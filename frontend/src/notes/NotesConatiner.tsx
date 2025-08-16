import { useEffect, useState } from "react";
import Note from "./Note";
import Masonry from "react-masonry-css";


const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1
};

export default function NotesConatiner() {

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [notes, setNotes] = useState<{
    isPrivate: boolean,
    _id: string,
    desc: string,
    title: string,
    files_url: any[]
  }[] | null>(null)

  useEffect(() => {

    fetch(`${apiUrl}/getnotes/${localStorage.getItem('_id')}/all`, {
      method: "GET"
    }).then(res => {
      res.json().then(data => {
        setNotes(data)

      })
    })
  }, [])

  return (
    // <div className="columns-3 gap-3 p-5">
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
            id={note._id}

          />
        ))
      }


    </Masonry>


  )
}
