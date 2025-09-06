import { useEffect, useState } from "react";
import FolderCard from "../folders/FolderCard";
import Masonry from "react-masonry-css";
import AddButton from "../../components/AddButton";
import type { Folder, Note } from "../../types";
import NoteCard from "../notes/Note"
import FolderForm from "../folders/FolderForm";
import PopupForm from "../notes/PopUPForm";
const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1
};

export default function Page() {
  

  const [isOpenFolder,setIsOpenFolder] = useState<boolean>(false);
  const [isOpenNote,setIsOpenNote] = useState<boolean>(false);

  const [data,setData] = useState<{notes:Note[],folders:Folder[]} | null>(null);

  useEffect(()=>{

        const apiUrl = import.meta.env.VITE_BACKEND_URL;
 
        fetch(
          `${apiUrl}/getrecent`,{
            credentials: "include"
          }
          
        ).then(res=>{
              res.json().then(data=>{
                      
                  setData(data);
                    
              });
        })
    
    
    
  },[isOpenFolder,isOpenNote])

  return (
    <div className="p-6">
     <div className="flex  justify-between  items-center mb-4">
        <h2 className="text-2xl font-bold">Recent</h2>
        <div className="flex gap-5">
             <AddButton  text="Add Note" onClick={()=>{setIsOpenNote(true)}}/>
             <AddButton  text="Add Folder" onClick={()=>{setIsOpenFolder(true)}}/>
        </div>
     </div>
     <h2>Notes</h2>
        <Masonry 
              breakpointCols={breakpointColumnsObj}
              className="flex gap-5"
              columnClassName="space-y-5"
            >
     
      {data?.notes && data?.notes.map((note) => (  
         <NoteCard _id={note._id} title={note.title} isPrivate={note.isPrivate} files_url={note.files_url} desc={note.desc} /> 
     
      ))}
      </Masonry>

      <h2>Folders</h2>
        <Masonry 
              breakpointCols={breakpointColumnsObj}
              className="flex gap-5"
              columnClassName="space-y-5"
            >
     
      {data?.folders && data?.folders.map((folder) => (  
         <FolderCard key={folder._id} {...folder} /> 
     
      ))}
      </Masonry>
     {isOpenFolder && <FolderForm onClose={()=>{setIsOpenFolder(false)}}/>}
     {isOpenNote && <PopupForm onClose={()=>{setIsOpenNote(false)}}/>}
    </div>
  );
}
