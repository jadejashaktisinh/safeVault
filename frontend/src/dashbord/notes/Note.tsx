import { Link } from "react-router-dom";
import type { Note } from "../../types";
import DropDown from "../../components/DropDown";

export default function Note({
  _id,
  title,
  desc,
  files_url,
  isPrivate,
}: Note) {

  const mediaCounts = files_url.reduce(
    (acc, file) => {
      if (file.file_type === "image/jpeg") acc.images += 1;
      else if (file.file_type === "video/mp4") acc.videos += 1;
      else if (file.file_type === "pdf") acc.pdfs += 1;
      else acc.others += 1;
      return acc;
    },
    { images: 0, videos: 0, pdfs: 0, others: 0 }
  );


  return (

    <Link to={isPrivate ? `/faceverify/${_id}` : `/notes/${_id}`}>
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-gray-300 rounded-lg shadow-md m-2 relative">
        <div className="flex justify-between items-center gap-2 mb-4">
          <span className="text-sm font-bold rounded">
            {isPrivate ? "Private" : "Public"}
          </span>
         <DropDown type="note" _id={_id}/>
        </div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p>{isPrivate ? "🔒 Face verification required" : desc}</p>
        </div>
        <div className="flex gap-6 mb-6">
          {mediaCounts.images > 0 && <span>📷 {mediaCounts.images} Images</span>}
          {mediaCounts.videos > 0 && <span>🎬 {mediaCounts.videos} Videos</span>}
          {mediaCounts.pdfs > 0 && <span>📄 {mediaCounts.pdfs} PDFs</span>}
          {mediaCounts.others > 0 && <span>❓ {mediaCounts.others} Other Files</span>}
        </div>
      </div>
    </Link>
    
  );
}
