
export default function PrivateCheckBox({privateNote,setPrivateNote}:{privateNote:boolean,setPrivateNote:(call:(bool:boolean)=>boolean)=>void}) {
  return (
   <div className="mb-4 flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privateNote}
                  onChange={() => setPrivateNote((prev:boolean) => !prev)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-lg">Set Private</span>
              </label>
            </div>
  )
}
