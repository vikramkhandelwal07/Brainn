import React from "react"
import LoginForm from "../components/sections/auth/LoginForm"
import LoginImage from "../assets/loginImage.jpg"

const Login = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">

      {/* Left Section - Content */}
      <div className="relative w-full lg:w-1/2 bg-gradient-to-br from-gray-900 via-black to-black flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden min-h-screen lg:min-h-auto">

        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-yellow-500/20 to-pink-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>

        <div className="flex flex-col w-full max-w-sm sm:max-w-md gap-4 sm:gap-6 z-10">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent mb-2 sm:mb-3">
              Welcome Back
            </h1>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
              Build skills for today, tomorrow, and beyond. Learn the way that works best for you.
            </p>
          </div>

          <div className="mt-2 sm:mt-4">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center h-screen relative overflow-hidden">
        <img
          src={LoginImage}
          alt="Brain EdTech Illustration"
          className="h-full w-full object-cover"
        />

        {/* Optional overlay for better visual integration */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/10"></div>
      </div>

      {/* Mobile Image Section - Shows only on mobile as background */}
      <div className="lg:hidden absolute inset-0 opacity-5">
        <img
          src={LoginImage}
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>

    </div>
  )
}

export default Login