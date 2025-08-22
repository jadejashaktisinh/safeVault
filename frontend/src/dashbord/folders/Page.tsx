import FolderCard from "./FolderCard";
import Masonry from "react-masonry-css";


const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1
};

export default function Page() {
  const folders = [
    {
      id: "1",
      title: "Work",
      desc: "All work-related notes",
      isPrivate: true,
      notesCount: 5,
    },
    {
      id: "2",
      title: "Personal",
      desc: "Random personal stuff",
      isPrivate: false,
      notesCount: 12,
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Folders</h2>
       <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex gap-5"
              columnClassName="space-y-5"
            >
      {folders.map((folder) => (
        <FolderCard key={folder.id} {...folder} />
      ))}
      </Masonry>
    </div>
  );
}
