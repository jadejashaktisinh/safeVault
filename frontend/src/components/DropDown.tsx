import { useEffect, useRef, useState } from "react";


export default function ({ type,_id }: { type: string,_id: string }) {

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="p-2 rounded-full hover:bg-gray-200 transition"
        onClick={handleMenuClick}
      >
        <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
      </button>

      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            data-id={_id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMenuOpen(false);
            }}
          >
            Copy
          </button>
          {type == "folder" && <button
                                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                  data-id={_id}
                                  onClick={(e) => {
                                           e.preventDefault();
                                           e.stopPropagation();
                                           setMenuOpen(false);
                                  }}
                                 >
                                Paste
                              </button>
          }
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            data-id={_id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMenuOpen(false);
            }}
          >
            Move To
          </button>
        </div>
      )}
    </div>
  )
}
