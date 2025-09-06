import { useState, type JSX } from "react";
import { Home, FileText, Folder, Trash2, Activity } from "lucide-react";
import { Link } from "react-router-dom";

interface NavItem {
  name: string;
  icon: JSX.Element;
  path: string;
}

const navItems: NavItem[] = [
  { name: "Home", icon: <Home size={20} />, path: "/home" },
  { name: "Notes", icon: <FileText size={20} />, path: "/notes" },
  { name: "Folders", icon: <Folder size={20} />, path: "/folders" },
  { name: "Trash", icon: <Trash2 size={20} />, path: "/trash" },
  { name: "Activity Log", icon: <Activity size={20} />, path: "/activity" },
];

export default function Navbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="p-2 md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-4 transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <h1 className="text-xl font-bold mb-8">SafeVault</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-700 transition-colors"
              onClick={() => setIsOpen(false)} // close on mobile click
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 md:pl-64 p-4">{children}</main>
    </>
  );
}
