import { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";



interface Activity{
      log:string,
      type:"create" | "update" | "delete" | "login" | "logout" | "verification",
      createdAt: string
}
export default function Page() {

    const [data,setData] = useState<Activity[] | null>(null);
    useEffect(()=>{
            const apiUrl = import.meta.env.VITE_BACKEND_URL
            fetch(
              `${apiUrl}/getactivity`,
                {
                  credentials: "include",
                }
            )
            .then(res => {
                  res.json().then(data => {                     
                      setData(data.data);
                      
                    })
                  })
          
    },[])
  return (
    <div
      className="relative p-6 flex size-full min-h-screen flex-col  group/design-root overflow-x-hidden"
      style={{ fontFamily: "Inter, 'Noto Sans', sans-serif" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Activity</h2>
      </div>


      <div className="p-4 flex justify-start">
        <div className="w-full max-w-2xl space-y-3 h-fit">
          
          

        {
          data && data.map((d)=>(
                <ActivityCard log={d.log} type={d.type} createdAt={d.createdAt}/>   
          ))
        }
        </div>
      </div>
    </div>
  );
}
