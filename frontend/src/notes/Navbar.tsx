
interface Props{
    onOpen:()=>void
}

export default function Navbar({onOpen}:Props) {
  return (
    <>
                   <header className="  w-full  z-50 bg-white flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf4] px-10 py-3">
                        <div className="flex items-center gap-4 text-[#0d151c]">
                            <div className="size-4">
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div>
                            <h2 className="text-[#0d151c] text-lg font-bold leading-tight tracking-[-0.015em]">SafeVault</h2>
                        </div>
                        <div className="flex flex-1 justify-end gap-5">
                            
                            <div className="flex gap-2">
                                <button
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#0b80ee] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]"
                                    onClick={onOpen}
                                >
                                    
                                    <span className="truncate">Add Note</span>
                                    
                                </button>
                                <button
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7edf4] text-[#0d151c] text-sm font-bold leading-normal tracking-[0.015em]"
                                >
                                    <a href="/signup">
                                    <span className="truncate">Log  out</span>
                                    </a>
                                </button>
                            </div>
                        </div>
                    </header>
           
    </>
  )
}
