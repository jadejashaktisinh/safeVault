import { useEffect, useState } from "react";
import FolderCard from "./FolderCard";
import Masonry from "react-masonry-css";
import FolderForm from "./FolderForm";
import AddButton from "../../components/AddButton";
import { setFolders } from "../../features/folderSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1
};

export default function Page() {


  const [isOpen, setIsOpen] = useState<boolean>(false);
  const folders = useAppSelector((state) => state.folder.folders)
  const dispatch = useAppDispatch();

  useEffect(() => {

    const apiUrl = import.meta.env.VITE_BACKEND_URL

    fetch(
      `${apiUrl}/getfolders/all`,
      {
        credentials: "include",
      }
    ).then(res => {
      res.json().then(data => {

        dispatch(setFolders(data));
      });
    })

    console.log(folders);

  }, [isOpen])

  return (
    <div className="p-6">
      <div className="flex  justify-between  items-center mb-4">
        <h2 className="text-2xl font-bold mb-4">My Folders</h2>
        <AddButton text="Add Folder" onClick={() => { setIsOpen(true) }} />
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-5"
        columnClassName="space-y-5"
      >

        {folders && folders.map((folder) => (
          <FolderCard key={folder._id} {...folder} />

        ))}
      </Masonry>
      {isOpen && <FolderForm onClose={() => { setIsOpen(false) }} />}
    </div>
  );
}
