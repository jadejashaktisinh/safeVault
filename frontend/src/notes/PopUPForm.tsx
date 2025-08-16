import React, { useState } from "react";

interface PopupFormProps {
  onClose ? : () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ onClose }) => {


  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [privateNote, setPrivateNote] = useState(false);
  const [inputFiles, setInputFiles] = useState<File[]>([]);
  const [files, setFiles] = useState<{ url: string; name: string; type: string }[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setInputFiles(prev => [...prev, ...selectedFiles]);
    const filePreviews = selectedFiles.map((file) => {
      const url = URL.createObjectURL(file);
      let type = "other";
      if (file.type.startsWith("image/")) type = "image";
      else if (file.type.startsWith("video/")) type = "video";
      else if (file.type === "application/pdf") type = "pdf";
      return { url, type, name: file.name };
    });
    setFiles(prev => ([...(prev || []), ...filePreviews]));
  };

  const handleDeleteFile = (index: number) => {
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
    inputFiles.forEach(file => {
      formData.append('files', file);
    });
    fetch(`${apiUrl}/addnote`, {
      method: "POST",
      body: formData
    }).then(res => {
      res.json().then(data => {
        console.log(data);
        // onClose();
      });
    }).catch(error => {
      console.error(error)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center flex-col">
      <div className="justify-between w-full flex border-b-2 pb-1 pt-2 bg-white p-5">
        <button
          onClick={onClose}
          className="  text-gray-600 hover:text-red-600 text-2xl font-bold"
        >
          &times;
        </button>

        <button
          onClick={handleSubmit}
          type="button"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
      <div className="bg-white w-full h-full p-5 overflow-auto relative rounded-none">
        {/* Close Button */}

        <h2 className="text-3xl font-semibold mb-6">Add new note</h2>
        <form className="space-y-6" >
          {/* Title Input */}
          <div>
            <label className="block text-lg font-medium mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          {/* Instructions Input */}
          <div>
            <label className="block text-lg font-medium mb-2" >Description *</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              rows={4}
            />
          </div>

          <div className="p-4">
            {/* Toggle Private Button */}
            <div className="mb-4 flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privateNote}
                  onChange={() => setPrivateNote((prev) => !prev)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-lg">Set Private</span>
              </label>
            </div>
            {/* Choose Image Button */}
            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Choose Image
              <input
                type="file"
                multiple
                accept="image/*,video/*,application/pdf"
                className="hidden"
                onChange={handleFilesChange}
              />
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
              {files && files.map((file, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow border relative">
                  <button
                    type="button"
                    onClick={() => handleDeleteFile(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-lg font-bold"
                    title="Delete file"
                  >
                    &times;
                  </button>
                  <p className="text-sm text-gray-600 mb-2 truncate">{file.name}</p>
                  {file.type === "image" && (
                    <img src={file.url} alt="Preview" className="w-full h-48 object-cover rounded" />
                  )}
                  {file.type === "video" && (
                    <video controls className="w-full h-48 object-cover rounded">
                      <source src={file.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {file.type === "pdf" && (
                    <iframe src={file.url} className="w-full h-48 rounded" title="PDF preview" />
                  )}
                  {file.type === "other" && (
                    <p className="text-red-500">Unsupported file type</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
