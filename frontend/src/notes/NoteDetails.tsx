import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



export default function NoteDetails() {
    const handleUpdate = () => alert("Update note");
    const handleDelete = () => alert("Delete note");
     const { id } = useParams()
    const [note, setNote] = useState<{
        isPrivate: boolean,
        _id: string,
        desc: string,
        title: string,
        files_url: any[]
    } | null>(null)
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {

        fetch(`${apiUrl}/getnotes/${id}/single`, {
            method: "GET"
        }).then(res => {
            res.json().then(data => {
                console.log(data);
                setNote(data)

            })
        })
    }, [])

    return (
         

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

                    {/* Media Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {note?.files_url.map((file, idx) => (
                            <div key={idx} className="relative border rounded overflow-hidden bg-gray-100">
                                {file.file_type === "image/jpeg" && (
                                    <img src={file.url} alt="note media" className="w-full h-64 object-cover" />
                                )}
                                {file.file_type === "video" && (
                                    <video controls className="w-full h-64 object-cover">
                                        <source src={file.url} type="video/mp4" />
                                    </video>
                                )}
                                {file.file_type === "pdf" && (
                                    <embed
                                        src={file.url}
                                        type="application/pdf"
                                        className="w-full h-64 rounded"
                                    />
                                )}


                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleUpdate}
                            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Update Note
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Delete Note
                        </button>
                    </div>
                </div>
            </div>
        </div>
                 
    );
}
