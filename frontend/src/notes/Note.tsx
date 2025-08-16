

// interface Note{
//     desc:string,
//     title:string,
//     Imagestyle?:string,
//     Authstyle?:string
//     files_url:{
//             file_type:string,
//             url:string
//     }[]
// }

// export default function Note ({title,desc,files_url,Imagestyle,Authstyle}:Note) {


//     const filesToShow:Note["files_url"] = files_url.slice(0, 2);
//     const remainingFilesCount:number = files_url.length - 2;

//   return (
//     <>

//            {/* <div className="bg-gray-300 p-5 m-2 rounded">
//                     <div className="mb-4">
//                         <p className="text-2xl font-bold">{title}</p>
//                         <p>{desc}</p>
//                         <p className={`${Authstyle}`}>Face Veification required</p>
//                     </div>
//                     <div className="flex item-center justify-between">

//                         {
//                             filesToShow.map((file, idx) => (
//                                 <div key={idx}>
//                                     {file.file_type === "image/jpeg" && (
//                                         <>
//                                         <img src={file.url} alt="Preview" className={`w-full h-48 object-cover rounded ${Imagestyle}`} />
//                                         <p>image</p>
//                                         </>
//                                     )}
//                                     {file.file_type === "video" && (
//                                         <>
//                                         <video controls className="w-full h-48 object-cover rounded">
//                                             <source src={file.url} type="video/mp4" />
//                                             Your browser does not support the video tag.
//                                         </video>
//                                         <p>video</p>
//                                         </>
//                                     )}
//                                     {file.file_type === "pdf" && (
//                                         <>
//                                         <iframe src={file.url} className="w-full h-48 rounded" title="PDF preview" />
//                                         <p>pdf</p>
//                                         </>
//                                     )}
//                                     {file.file_type === "other" && (
//                                         <p className="text-red-500">Unsupported file type</p>
//                                     )}
//                                 </div>
//                             ))
//                         }
//                         {remainingFilesCount > 0 && (
//                             <span className="text-5xl">
//                                 +{remainingFilesCount}
//                             </span>
//                         )}
//                     </div>

//                 </div> */}

//                 <div className="relative bg-gray-300 p-5 m-2 rounded">
//   {/* Tags in top right */}
//   <div className="absolute top-2 right-2 flex gap-2">
//     <span className={`px-2 py-1 text-xs font-bold rounded ${Authstyle}`}>
//       {Imagestyle ? "Private" : "Public"}
//     </span>
//     <span className="px-2 py-1 text-xs font-bold rounded bg-blue-600 text-white">
//       {/* {category} */} My Note
//     </span>
//   </div>

//   {/* Title & Desc */}
//   <div className="mb-4">
//     <p className="text-2xl font-bold">{title}</p>
//     <p>{desc}</p>
//   </div>

//   {/* Files */}
//   <div className="flex items-center justify-between">
//     {filesToShow.map((file, idx) => (
//       <div key={idx}>
//         {file.file_type === "image/jpeg" && (
//           <>
//             <img src={file.url} alt="Preview"
//               className={`w-full h-48 object-cover rounded ${Imagestyle}`} />
//             <p>image</p>
//           </>
//         )}
//         {file.file_type === "video" && (
//           <>
//             <video controls className="w-full h-48 object-cover rounded">
//               <source src={file.url} type="video/mp4" />
//             </video>
//             <p>video</p>
//           </>
//         )}
//         {file.file_type === "pdf" && (
//           <>
//             <iframe src={file.url} className="w-full h-48 rounded" />
//             <p>pdf</p>
//           </>
//         )}
//       </div>
//     ))}
//     {remainingFilesCount > 0 && (
//       <span className="text-5xl">+{remainingFilesCount}</span>
//     )}
//   </div>
// </div>

//     </>
//   )
// 
import { Link } from "react-router-dom";


interface NoteProps {
  id:string,
  title: string;
  desc: string;
  isPrivate:boolean,
  files_url: {
    file_type:string,
    url:string
  }[];
 
}

export default function Note({
  id,
  title,
  desc,
  files_url,
  isPrivate
 
}: NoteProps) {

    const mediaCounts = files_url.reduce(
    (acc, file) => {
      if (file.file_type === "image/jpeg") acc.images += 1;
      else if (file.file_type === "video") acc.videos += 1;
      else if (file.file_type === "pdf") acc.pdfs += 1;
      else acc.others += 1;
      return acc;
    },
    { images: 0, videos: 0, pdfs: 0, others: 0 }
  );


  return (
    <Link to={isPrivate ? `/faceverify/${id}` : `/notes/${id}`}>
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md m-2">
     
      <div className="flex justify-end gap-2 mb-4">
        <span className={`px-2 py-1 text-xs font-bold rounded `}>
          {isPrivate ? "Private" : "Public"}
        </span>
       
      </div>

      {/* Title & Description */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p>
          {isPrivate ?   "🔒 Face verification required" : desc}
        </p>
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
