import useForm from "../../hooks/useForm";

interface PopupFormProps {
  id?: string,
  upDesc?: string,
  upTitle?: string,
  isPrivate?: boolean,
  files_url?: {
    file_type: string,
    url: string
  }[],
  onClose: () => void;
}

const PopupForm: React.FC<PopupFormProps> = ({ id, upDesc, upTitle, isPrivate, files_url, onClose }) => {

  const {
    title, setTitle,
    desc, setDesc,
    privateNote, setPrivateNote,
    files,
    handleFilesChange, handleDeleteFile, handleSubmit
  } = useForm( {id, upDesc, upTitle, isPrivate, files_url, onClose} );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center flex-col" style={{ width: "80%", marginLeft: "20%" }}>


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
          {!id ? "Add" : "Update"}
        </button>
      </div>
      <div className="bg-white w-full h-full p-5 overflow-auto relative rounded-none">


        <h2 className="text-3xl font-semibold mb-6">{!id ? "Add new" : "Update"} note</h2>
        <form className="space-y-6" >

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
                  <p className="text-sm text-gray-600 mb-2 truncate">{file.file_type}</p>

                  {file.file_type === "image/jpeg" && (
                    <img src={file.url} alt="Preview" className="w-full h-48 object-cover rounded" />
                  )}
                  {file.file_type === "video/mp4`" && (
                    <video controls className="w-full h-48 object-cover rounded">
                      <source src={file.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {file.file_type === "pdf" && (
                    <iframe src={file.url} className="w-full h-48 rounded" title="PDF preview" />
                  )}
                  {file.file_type === "other" && (
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
