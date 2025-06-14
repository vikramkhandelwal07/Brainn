import React from 'react';
import SignupForm from '../components/sections/auth/SignUpForm';

const Signup = () => {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-tr from-pink-700/40 via-black to-black px-4 sm:px-6 md:px-8 lg:px-20 py-8 lg:py-0 gap-6 sm:gap-8 lg:gap-10 text-white">

      {/* Left Section: Headings and Description */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 sm:space-y-6 max-w-2xl lg:max-w-none">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-poppins leading-tight sm:leading-relaxed lg:leading-loose">
            Join the millions learning to code with <span className="text-yellow-400">Brainn</span> for free
          </h1>
        </div>
        <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
          Master the latest technologies, level up your career, or simply explore the world of code, all in one place.
        </p>
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto lg:mx-0">
          No credit card required. No hidden fees. Just pure, high-quality learning at your own pace.
        </p>
      </div>

      {/* Right Section: Signup Form */}
      <div className="w-full lg:w-1/2 flex justify-center max-w-md lg:max-w-none">
        <SignupForm />
      </div>

    </div>
  );
};

export default Signup;