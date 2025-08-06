import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function Signup() {

  const [formData ,setFromData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""

  }) 
  const navigate = useNavigate()

  function handleSubmit(){

      const apiUrl = import.meta.env.VITE_BACKEND_URL;

      fetch(`${apiUrl}/signup`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify(formData)
      }).then(res =>{
          res.json().then(data =>{
            console.log(data);
            if(!data.success){

              data.message.details.forEach((e:{message:String}) => {
                toast.error(e.message, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                  transition: Bounce,
                  });
              });
             
            }else{
              localStorage.setItem('_id',data._id)
              navigate('/notes')
            }
            
          })
      })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="text-3xl font-bold text-indigo-600 flex justify-center items-center">
          <div className="size-7">
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </div> SafeVault
          </div>
          <p className="text-gray-500 mt-1 text-sm">Create a new secure account</p>
        </div>

        {/* Signup Form */}
        <form className="space-y-5" >
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-sm">
              First Name
            </label>
            <input
              type="text"
              id="fname"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="John "
              value={formData.firstName}
              onChange={(e) => setFromData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-sm">
              Last Name
            </label>
            <input
              type="text"
              id="lname"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder=" Doe"
              value={formData.lastName}
              onChange={(e) => setFromData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFromData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFromData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button
            type="button"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition font-medium"
            onClick={handleSubmit}
            
          >
            Sign Up
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:underline font-medium">
            Log in
          </a>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
}
