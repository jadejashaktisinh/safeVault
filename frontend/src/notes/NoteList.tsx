interface Props {
    isPrivate: boolean,
    desc: string,
    title: string,
    files_url: any[],
}
export default function NoteList({ isPrivate, title, desc, files_url }: Props) {

    // Only show the first two files
    const filesToShow = files_url.slice(0, 2);
    const remainingFilesCount = files_url.length - 2;

    return (

        <>
            {!isPrivate ?
                <div className="bg-gray-300 p-5 rounded">
                    <div className="mb-4">
                        <p className="text-2xl font-bold">{title}</p>
                        <p>{desc}</p>
                    </div>
                    <div className="flex item-center justify-between">

                        {
                            filesToShow.map((file, idx) => (
                                <div key={idx}>
                                    {file.file_type === "image/jpeg" && (
                                        <>
                                        <img src={file.url} alt="Preview" className="w-full h-48 object-cover rounded" />
                                        <p>image</p>
                                        </>
                                    )}
                                    {file.file_type === "video" && (
                                        <>
                                        <video controls className="w-full h-48 object-cover rounded">
                                            <source src={file.url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <p>video</p>
                                        </>
                                    )}
                                    {file.file_type === "pdf" && (
                                        <>
                                        <iframe src={file.url} className="w-full h-48 rounded" title="PDF preview" />
                                        <p>pdf</p>
                                        </>
                                    )}
                                    {file.file_type === "other" && (
                                        <p className="text-red-500">Unsupported file type</p>
                                    )}
                                </div>
                            ))
                        }
                        {remainingFilesCount > 0 && (
                            <span className="text-5xl">
                                +{remainingFilesCount}
                            </span>
                        )}
                    </div>

                </div> :
                    <div className="bg-gray-300 p-5 rounded">
                    <div className="mb-4 flex justify-between">
                        <div>
                        <p className="text-2xl font-bold">{title}</p>
                        <p>{desc}</p>
                        </div>

                        <p className="text-xl">face varification required </p>
                    </div>
                    <div className="flex item-center justify-between">

                        {
                            filesToShow.map((file, idx) => (
                                <div key={idx}>
                                    {file.file_type === "image/jpeg" && (
                                        <>
                                        <img src={file.url} alt="Preview" className="w-full h-48 object-cover rounded blur" />
                                        <p>image</p>
                                        </>
                                    )}
                                    {file.file_type === "video" && (
                                        <>
                                        <video controls className="w-full h-48 object-cover rounded">
                                            <source src={file.url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <p>video</p>
                                        </>
                                    )}
                                    {file.file_type === "pdf" && (
                                        <>
                                        <iframe src={file.url} className="w-full h-48 rounded" title="PDF preview" />
                                        <p>pdf</p>
                                        </>
                                    )}
                                    {file.file_type === "other" && (
                                        <p className="text-red-500">Unsupported file type</p>
                                    )}
                                </div>
                            ))
                        }
                        {remainingFilesCount > 0 && (
                            <span className="text-5xl">
                                +{remainingFilesCount}
                            </span>
                        )}
                    </div>

                </div>

            }
        </>

    )


}
