import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FolderForm from "./FolderForm";
import Masonry from "react-masonry-css";
import NoteCard from "../notes/Note";
import FolderCard from "./FolderCard";
import type { Folder, Note } from "../../types";

export default function FolderDetails() {

    const breakpointColumnsObj = {
        default: 3,
        1024: 2,
        640: 1
    };
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const { id } = useParams()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [folder, setFolder] = useState<{
        isPrivate: boolean,
        _id: string,
        desc: string,
        title: string,
        notes: Note[],
        folders: Folder[]
    } | null>(null)

    const handleUpdate = (id: string) => {
        console.log(id);
        setIsOpen(true)

    };
    const handleDelete = (id: string) => {

        fetch(`${apiUrl}/deletefolder/${id}`).then((res) => {
            res.json().then((data) => {
                if (data.success) {
                    alert("note deleted");
                } else {
                    alert(data.msg);
                    navigate("/folders");
                }
            })
        })
    };

    useEffect(() => {

        fetch(`${apiUrl}/getfolders/single/${id}`, {
            method: "GET",
            credentials: "include"
        }).then(res => {
            res.json().then(data => {
                console.log(data);
                setFolder(data)

            })
        })
    }, [isOpen, id])
    return (
        <>
            {
                folder && <div className="flex min-h-screen bg-gray-50">
                    <div className="flex-1 p-6">
                        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <h1 className="text-3xl font-bold mb-4 md:mb-0">{folder?.title}</h1>
                                <div className="flex gap-2">
                                    <span className={`px-2 py-1 text-xs font-bold rounded `}>
                                        Verified
                                    </span>
                                </div>
                            </div>
                            <div className="mb-6">
                                <p className="text-gray-800">{folder?.desc}</p>
                            </div>
                            <h2>Notes</h2>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="flex gap-5"
                                columnClassName="space-y-5"
                            >
                                {folder.notes && folder.notes.map((note) => (
                                    <NoteCard _id={note._id} title={note.title} desc={note.desc} isPrivate={note.isPrivate} files_url={note.files_url} />
                                ))}
                            </Masonry>
                            <h2>Folder</h2>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="flex gap-5"
                                columnClassName="space-y-5"
                            >
                                {folder.folders && folder.folders.map((folder) => (
                                    <FolderCard key={folder._id} {...folder} />
                                ))}
                            </Masonry>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => handleUpdate(folder._id)}
                                    className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Update Note
                                </button>
                                <button
                                    onClick={() => handleDelete(folder._id)}
                                    className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete Note
                                </button>
                            </div>
                        </div>
                    </div>
                    {isOpen && <FolderForm id={folder._id} isPrivate={folder.isPrivate} upDesc={folder.desc} upTitle={folder.title} onClose={() => { setIsOpen(false) }} />}
                </div>
            }
        </>
    )
}
