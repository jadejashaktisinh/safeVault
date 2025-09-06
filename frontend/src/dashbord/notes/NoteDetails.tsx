import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopupForm from "./PopUPForm";
import FileDisplay from "../../components/FileDisplay";
import type { Note } from "../../types";



export default function NoteDetails() {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    
    const { id } = useParams()
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [note, setNote] = useState<Note | null>(null)
    
    const handleUpdate = (id:string) => {
        console.log(id);
        setIsOpen(true)
        
    };
    const handleDelete = (id:string) => {   

            fetch(`${apiUrl}/deletenote/${id}`).then((res)=>{
                    res.json().then((data)=>{
                        if(data.success){
                            alert("note deleted");
                        }else{
                            navigate("/notes");
                        }
                    })
            })
    };
    useEffect(() => {

        fetch(`${apiUrl}/getnotes/single/${id}`, {
            method: "GET",
            credentials:"include"
        }).then(res => {
            res.json().then(data => {
                console.log(data);
                setNote(data)

            })
        })
    }, [isOpen])

    return (
         

       <>

        {note && 
         <div className="flex min-h-screen bg-gray-50">

            {/* Main content */}
            <div className="flex-1 p-6">
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
                    {/* Top Section: Title + Tags */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h1 className="text-3xl font-bold mb-4 md:mb-0">{note?.title}</h1>
                        <div className="flex gap-2">
                            <span className={`px-2 py-1 text-xs font-bold rounded `}>
                                Verified
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <p className="text-gray-800">{note?.desc}</p>
                    </div>


                    <FileDisplay files={note.files_url} />

                    <div className="flex gap-4">
                        <button
                            onClick={()=>handleUpdate(note._id)}
                            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Update Note
                        </button>
                        <button
                            onClick={()=>handleDelete(note._id)}
                            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Delete Note
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && <PopupForm id={note._id} upTitle={note.title} upDesc={note.desc} files_url={note.files_url} isPrivate={note.isPrivate} onClose={()=>{setIsOpen(false)}}/>}
        </div>
        }
       </>
                 
    );
}
