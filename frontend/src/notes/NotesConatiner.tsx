import { useEffect, useState } from "react";
import NoteList from "./NoteList";

export default function NotesConatiner() {

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [notes,setNotes] = useState<{
    isPrivate:boolean,
    desc:string,
    title:string,
    files_url:any[],


  }[] | null>( null) 

  useEffect(()=>{

      fetch(`${apiUrl}/getnotes/${localStorage.getItem('_id')}`,{
        method:"GET"
      }).then(res => {
        res.json().then(data =>{
            console.log(data);
            setNotes(data)
            
        })
      })
  },[])

  return (
    <div className=" p-5 grid grid-cols-[repeat(auto-fit,minmax(500px,6fr))] gap-3">

    {
      notes?.map((note)=>(
          <NoteList isPrivate={note.isPrivate} desc={note.desc} files_url = {note.files_url} title = {note.title}/>
      ))
    }

        {/* <NoteList isPrivate={true} />
        <NoteList/>
        <NoteList/>
        <NoteList/> */}
    </div>
    

  )
}
