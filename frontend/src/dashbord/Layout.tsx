import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {


  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-64">
          <Navbar />
        </div>
        <div className="flex-1 p-4 overflow-auto">
          
         <Outlet></Outlet>
           
        </div>
      </div>


    </>
  )
}
