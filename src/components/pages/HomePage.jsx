import React from 'react';
import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom';
import HoverButton from '../ui/hover-button';
import { FiArrowRight } from 'react-icons/fi';

const HomePage = () => {
  return (
    <div>
      {/* ----------- section 1 ----------- */}
      <div className="bg-black h-svh w-full relative overflow-hidden">

        {/* ----------- Large Screens Content ----------- */}
        <div className="hidden lg:block absolute inset-0 z-0">
          {/* Main Gradient Heading */}
          <h1
            className="
      absolute top-32 left-1/2 transform -translate-x-1/2 
      font-poppins text-7xl text-center whitespace-nowrap font-semibold
      bg-gradient-to-r from-white via-violet-500 to-white 
      bg-clip-text text-transparent
    "
          >
            Learn Like Never Before.
          </h1>

          {/* Decorative Line */}
          <div className="absolute top-56 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-white via-violet-500 to-blue-500 rounded"></div>


          {/* Spline 3D Scene */}
          <Spline
            scene="https://prod.spline.design/CKWJ4epf4OrLqPzd/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* ----------- Small Screens Fallback Content ----------- */}
        <div className="block lg:hidden absolute inset-0 z-0 bg-black">
          <h1
            className="
      absolute top-28 md:top-36 left-1/2 transform -translate-x-1/2 
      font-poppins text-3xl md:text-5xl text-center whitespace-nowrap font-semibold
      bg-gradient-to-r from-white via-violet-500 to-white 
      bg-clip-text text-transparent
    "
          >
            Learn Like Never Before.
          </h1>

          <div className="absolute top-[12rem] md:top-[14rem] left-1/2 transform -translate-x-1/2 w-32 md:w-48 h-1 bg-gradient-to-r from-white via-violet-500 to-blue-500 rounded"></div>

          {/* Headings visible on small screens */}
          <h2 className="absolute top-[15rem] left-1/2 transform -translate-x-1/2 text-white text-2xl text-center px-4 whitespace-nowrap font-semibold
      bg-gradient-to-r from-blue-400 via-violet-500 to-white 
      bg-clip-text text-transparent">
            Upskill. Reskill. Repeat.
          </h2>

          <h3 className="absolute top-[18rem] left-1/2 transform -translate-x-1/2 text-center px-6 whitespace-nowrap text-lg text-gray-400">
            Instructors thrive here. Learners rise here.
          </h3>
        </div>

        {/* ----------- Common Buttons ----------- */}
        <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center gap-6 md:gap-8 mt-10">
          <Link to="/signup">
            <HoverButton className="py-2 px-9 hover:scale-105 transition-all duration-300 font-semibold bg-blur text-white bg-gradient-to-r from-black via-blue-500 to-violet-800 flex items-center gap-2 backdrop-blur-md">
              Become an Instructor <FiArrowRight className="text-xl" />
            </HoverButton>
          </Link>

          <Link to="/signup">
            <HoverButton className="text-white py-3 px-11 hover:scale-105 transition-all duration-300 font-semibold backdrop-blur-md">
              Register as Student
            </HoverButton>
          </Link>
        <div className='bg-black absolute top-64 z-50 left-full h-96 w-[40rem]'></div>
        </div>
      </div>


      {/* ----------- section 2 ----------- */}
      <div className=' bg-black h-svh w-full relative overflow-hidden' >
        
      </div>
    </div>
  
  );
};

export default HomePage;
