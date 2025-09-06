export interface Folder{
    _id:string,
    title:string,
    desc:string
    isPrivate: boolean,
    notes:Note[],
    folders:Folder[]
} 
export interface Note{
    isPrivate: boolean,
    _id: string,
    desc: string,
    title: string,
    files_url: {
        file_type:string,
        url:string
  }[]
}