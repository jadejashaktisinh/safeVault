import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import FormInput from "../components/FormInput";
import FormSubmitButton from "../components/FormSubmitButton";
import FormFooter from "../components/FormFooter";
import RememberMe from "../components/RememberMe";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {

    e.preventDefault();
    if (isDisabled) return;
    setIsDisabled(true);
    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }).then((res) => {
      res.json().then((data) => {
        console.log(data);
        setIsDisabled(false);
        if (!data.success) {
          data.message.details.forEach((e: { message: String }) => {
            toast.error(e.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          });
        } else {
          navigate("/notes");
        }
      });
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">

        <div className="text-center">
          <div className="text-3xl font-bold text-indigo-600 flex justify-center items-center">
            <div className="size-7">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>{" "}
            SafeVault
          </div>
          <p className="text-gray-500 mt-1 text-sm">
            Create a new secure account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <FormInput
            htmlFor="fname"
            label="First Name"
            type="text" placeholder="John"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <FormInput
            htmlFor="lname"
            label="Last Name"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <FormInput
            htmlFor="email"
            label="Email"
            type="text"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <FormInput
            htmlFor="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            showPassword={showPassword}
            onClick={() => setShowPassword(!showPassword)}
          />
          <RememberMe 
          value={formData.remember} 
          onChange={(e)=>{
            setFormData({...formData,remember:e.target.checked})
          }}
          />
          <FormSubmitButton isDisabled={isDisabled} text="Sign Up" />
        </form>
      <FormFooter text="Log in" href="/login"/>
      </div>
      <ToastContainer />
    </div>
  );
}
