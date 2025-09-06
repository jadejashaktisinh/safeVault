import FileDisplay from "../../components/FileDisplay";
import PrivateCheckBox from "../../components/PrivateCheckBox";
import TextAreaInput from "../../components/TextAreaInput";
import TextInput from "../../components/TextInput";
import { useAppSelector } from "../../hooks";
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
  upfolderId?: string
  onClose: () => void;

}

const PopupForm: React.FC<PopupFormProps> = ({ id, upDesc, upTitle, isPrivate, files_url, onClose, upfolderId }) => {

  const folders = useAppSelector((state) => state.folder.folders);
  const type: string = "note"
  const {
    title, setTitle,
    desc, setDesc,
    folderId, setFolderId,
    privateNote, setPrivateNote,
    files,
    handleFilesChange, handleDeleteFile, handleSubmit,
  } = useForm({ id, upDesc, upTitle, isPrivate, files_url, onClose, type, upfolderId });

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
          <TextInput title={title} setTitle={setTitle} />
          <TextAreaInput desc={desc} setDesc={setDesc} />
          <div>
            <label className="block text-lg font-medium mb-2">Add inside folder</label>
            <select
              name="selcti"
              value={folderId ?? "null"} 
              onChange={(e) => {
                const value = e.target.value === "null" ? null : e.target.value
                setFolderId(value)
                console.log("Selected folder:", value)
              }}
            >
              <option value="null">Select folder</option>

              {folders.map((folder) => (
                <option key={folder._id} value={folder._id}>
                  {folder.title}
                </option>
              ))}
            </select>

          </div>
          <div className="p-4">

            <PrivateCheckBox privateNote={privateNote} setPrivateNote={setPrivateNote} />

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
            <FileDisplay files={files} handleDeleteFile={handleDeleteFile} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
