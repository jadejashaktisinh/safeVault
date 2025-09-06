import { useState } from "react";


interface PopupFormProps {
  id?: string,
  upDesc?: string,
  upTitle?: string,
  isPrivate?: boolean,
  files_url?: {
    file_type: string,
    url: string
  }[],
  type:string,
  upfolderId?:string
  onClose: () => void;
}



export default function useForm({id, upDesc, upTitle, isPrivate, files_url, onClose,type,upfolderId}:PopupFormProps) {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const [title, setTitle] = useState(upTitle ?? "");
    const [folderId, setFolderId] = useState(upfolderId ?? null);
    const [desc, setDesc] = useState(upDesc ?? "");
    const [privateNote, setPrivateNote] = useState(isPrivate ?? false);
    const [inputFiles, setInputFiles] = useState<File[]>([]);
    const [updateFiles,setUpdateFiles] =  useState<{ url: string, file_type: string }[]>(files_url ?? []);;
    const [files, setFiles] = useState<{ url: string, file_type: string }[]>(files_url ?? []);
    console.log(files);

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        setInputFiles(prev => [...prev, ...selectedFiles]);
        const filePreviews = selectedFiles.map((file) => {
            const url = URL.createObjectURL(file);
            let file_type = "other";
            if (file.type.startsWith("image/")) file_type = "image";
            else if (file.type.startsWith("video/")) file_type = "video";
            else if (file.type === "application/pdf") file_type = "pdf";
            return { url, file_type, name: file.name };
        });
        setFiles(prev => ([...(prev || []), ...filePreviews]));
    };

    const handleDeleteFile = (index: number) => {
        console.log("file index",index);
        setUpdateFiles(prev => prev ? prev.filter((_, i) => i !== index) : []);
        setFiles(prev => prev ? prev.filter((_, i) => i !== index) : []);
        setInputFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Title is required.");
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('uid', String(localStorage.getItem('_id')));
        formData.append('isPrivate', String(privateNote));
        if(updateFiles){
                    formData.append('updateFiles', String(updateFiles));

        }
        if(folderId){
            formData.append("folderId",folderId);
        }
        inputFiles.forEach(file => {
            formData.append('files', file);
        });
        fetch(`${apiUrl}/${id ? `update${type}/` + id : `add${type}`}`, {
            method: "POST",
            credentials:"include",
            body: formData
        }).then(res => {
            res.json().then(data => {
                console.log(data);
                onClose();
            });
        }).catch(error => {
            console.error(error)
        });
    };

    return {
        title, setTitle,
        desc, setDesc,
        folderId, setFolderId,
        privateNote, setPrivateNote,
        inputFiles, files,
        handleFilesChange, handleDeleteFile, handleSubmit
    };
}