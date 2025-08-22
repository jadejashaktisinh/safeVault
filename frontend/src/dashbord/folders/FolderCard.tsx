import { Link } from "react-router-dom";

interface FolderProps {
  id: string;
  title: string;
  desc: string;
  isPrivate: boolean;
  notesCount: number; // how many notes inside this folder
}

export default function FolderCard({
  id,
  title,
  desc,
  isPrivate,
  notesCount,
}: FolderProps) {
  return (
    <Link to={isPrivate ? `/faceverify/folder/${id}` : `/folders/${id}`}>
      <div className="max-w-4xl mx-auto p-6 bg-gray-300 rounded-lg shadow-md m-2">
        {/* Privacy Tag */}
        <div className="flex justify-end gap-2 mb-4">
          <span className="px-2 py-1 text-xs font-bold rounded">
            {isPrivate ? "Private" : "Public"}
          </span>
        </div>

        {/* Title & Desc */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p>{isPrivate ? "🔒 Face verification required" : desc}</p>
        </div>

        {/* Folder Stats */}
        <div className="flex gap-6 mb-6">
          <span>📝 {notesCount} Notes</span>
        </div>
      </div>
    </Link>
  );
}
