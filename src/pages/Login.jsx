import React from "react"
import LoginForm from "../components/sections/auth/LoginForm"

import LoginImage from "../assets/loginImage.jpg"

const Login = () => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">

      <div className="relative w-full md:w-1/2 bg-gradient-to-br from-gray-900 via-black to-black flex items-center justify-center p-10 overflow-hidden">
        <div className="flex flex-col w-full max-w-md gap-4 z-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Build skills for today, tomorrow, and beyond. Learn the way that works best for you.
          </p>
          <LoginForm />
        </div>
      </div>


   
     
      <div className="w-full md:w-1/2 flex items-center justify-center h-screen">
        <img
          src={LoginImage} // Make sure LoginImage is imported or defined properly
          alt="Brain EdTech Illustration"
          className="h-full w-full object-cover"
        />
      </div>

    </div>
  )
}

export default Login
