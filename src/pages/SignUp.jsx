import React from 'react';
import SignupForm from '../components/sections/auth/SignUpForm';

const Signup = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-tr from-pink-700/40 via-black to-black px-6 md:px-20 gap-10 text-white">

      {/* Left Section: Headings and Description */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
      <div>
        
        <h1 className="text-4xl md:text-5xl font-bold font-poppins leading-loose">
          Join the millions learning to code with <span className="text-yellow-400 leading-normal">Brainn </span>for free
        </h1>
      </div>
        <p className="text-lg md:text-xl text-gray-300 leading-tight">
          Master the latest technologies, level up your career, or simply explore the world of code , all in one place.
        </p>
        <p className="text-sm text-gray-400">
          No credit card required. No hidden fees. Just pure, high-quality learning at your own pace.
        </p>
      </div>

      {/* Right Section: Signup Form */}
      <div className="w-full md:w-1/2 flex justify-center">
        <SignupForm />
      </div>

    </div>
  );
};

export default Signup;
