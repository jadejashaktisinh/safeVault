import { Link } from "react-router-dom";
import type { Folder } from "../../types";
import DropDown from "../../components/DropDown";

export default function FolderCard({
  _id,
  title,
  desc,
  isPrivate,
}: Folder) {
  return (

    <Link to={isPrivate ? `/faceverify/folder/${_id}` : `/folders/${_id}`}>
      <div className="max-w-4xl mx-auto p-6 bg-gray-300 rounded-lg shadow-md m-2">
        <div className="flex justify-between items-center gap-2 mb-4">
          <span className="text-sm font-bold rounded">
            {isPrivate ? "Private" : "Public"}
          </span>
          <DropDown type="folder" _id={_id} />
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p>{isPrivate ? "🔒 Face verification required" : desc}</p>
        </div>
      </div>
    </Link>

  );
}
