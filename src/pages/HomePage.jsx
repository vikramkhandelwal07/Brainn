import React from 'react';
import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom';
import HoverButton from '../components/ui/hover-button';
import { FiArrowRight } from 'react-icons/fi';
import { Component } from "../components/ui/etheral-shadow";
import { FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import AnimationCommunity from '../components/ui/animation-community';
import TimelineSection from '../components/sections/home/timeline-section';
import Category from '../components/sections/home/Category';
import Footer from '../components/common/Footer';
import { BeamsBackground } from '../components/ui/beams-background';

const HomePage = () => {
  return (
    <div className='w-full overflow-x-hidden'>
      {/* ----------- section 1 ----------- */}
      <div className="bg-black min-h-screen w-full relative overflow-hidden">
        {/* ----------- Large Screens Content with Spline ----------- */}
        <div className="hidden lg:block absolute inset-0">
          <h1
            className="
              absolute top-32 left-1/2 transform -translate-x-1/2 
              font-poppins text-5xl lg:text-7xl text-center whitespace-nowrap font-semibold
              bg-gradient-to-r from-white via-violet-500 to-white 
              bg-clip-text text-transparent
            "
          >
            Learn Like Never Before.
          </h1>

          <div className="absolute top-56 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-white via-violet-500 to-blue-500 rounded"></div>

          <Spline
            scene="https://prod.spline.design/CKWJ4epf4OrLqPzd/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* ----------- Mobile/Tablet Content (No Spline) ----------- */}
        <div className="block lg:hidden absolute inset-0 z-10 bg-black flex flex-col items-center justify-center px-4">
          <h1
            className="
              font-poppins text-3xl sm:text-4xl md:text-5xl text-center font-semibold mb-4
              bg-gradient-to-r from-white via-violet-500 to-white 
              bg-clip-text text-transparent leading-tight
            "
          >
            Learn Like Never Before.
          </h1>

          <div className="w-32 sm:w-40 md:w-48 h-1 bg-gradient-to-r from-white via-violet-500 to-blue-500 rounded mb-6"></div>

          <h2 className="text-white text-xl sm:text-2xl text-center px-4 font-semibold mb-4 bg-gradient-to-r from-blue-400 via-violet-500 to-white bg-clip-text text-transparent">
            Upskill. Reskill. Repeat.
          </h2>

          <h3 className="text-center px-6 text-base sm:text-lg text-gray-400 mb-8 max-w-md">
            Instructors thrive here. Learners rise here.
          </h3>

          {/* Mobile Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full max-w-md">
            <Link to="/signup" className="w-full sm:w-auto">
              <HoverButton className="w-full sm:w-auto py-3 px-6 hover:scale-105 transition-all duration-300 font-semibold bg-blur text-white bg-gradient-to-r from-black via-violet-500 to-black flex items-center justify-center gap-2 backdrop-blur-md text-sm sm:text-base">
                Become an Instructor <FiArrowRight className="text-lg" />
              </HoverButton>
            </Link>

            <Link to="/signup" className="w-full sm:w-auto">
              <HoverButton className="w-full sm:w-auto text-white py-3 px-6 hover:scale-105 transition-all duration-300 font-semibold backdrop-blur-md flex items-center justify-center gap-2 text-sm sm:text-base">
                Register as Student <FiArrowRight className="text-lg" />
              </HoverButton>
            </Link>
          </div>
        </div>

        {/* ----------- Desktop Buttons ----------- */}
        <div className="hidden lg:flex absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 items-center gap-8 mt-10">
          <Link to="/signup">
            <HoverButton className="py-2 px-9 hover:scale-105 transition-all duration-300 font-semibold bg-blur text-white bg-gradient-to-r from-black via-violet-500 to-black flex items-center gap-2 backdrop-blur-md">
              Become an Instructor <FiArrowRight className="text-xl" />
            </HoverButton>
          </Link>

          <Link to="/signup">
            <HoverButton className="text-white py-3 px-11 hover:scale-105 transition-all duration-300 font-semibold backdrop-blur-md flex items-center gap-2">
              Register as Student <FiArrowRight className="text-xl" />
            </HoverButton>
          </Link>
        </div>
      </div>

      {/* ----------- Intersection Cards ----------- */}
      <div className="relative bg-black pb-16 sm:pb-20 lg:pb-32 mt-20">
        <div className="container mx-auto px-4">
          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8 -mt-16 sm:-mt-20 lg:-mt-32 z-10">
            {/* Explore Courses Card */}
            <div className="w-full lg:w-[30rem] h-[10rem] lg:h-[14rem] rounded-xl lg:rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 flex flex-col items-center justify-center text-white p-3 lg:p-4 transition-all hover:scale-[1.03] duration-300">
              <FaBookOpen className="text-3xl lg:text-4xl text-white mb-2 lg:mb-3" />
              <h2 className="text-xl lg:text-2xl font-semibold mb-1">Explore Courses</h2>
              <p className="text-center text-xs lg:text-sm mb-2 lg:mb-3">
                Dive into trending topics across design, tech, and innovation. Learn at your pace.
              </p>
              <button className="mt-auto text-xs lg:text-sm text-white/80 underline hover:text-white">
                Browse Catalog →
              </button>
            </div>

            {/* Start Teaching Card */}
            <div className="w-full lg:w-[30rem] h-[10rem] lg:h-[14rem] rounded-xl lg:rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 flex flex-col items-center justify-center text-white p-3 lg:p-4 transition-all hover:scale-[1.03] duration-300">
              <FaChalkboardTeacher className="text-3xl lg:text-4xl text-white mb-2 lg:mb-3" />
              <h2 className="text-xl lg:text-2xl font-semibold mb-1">Start Teaching</h2>
              <p className="text-center text-xs lg:text-sm mb-2 lg:mb-3">
                Share your knowledge with the world. Create impactful courses in minutes.
              </p>
              <button className="mt-auto text-xs lg:text-sm text-white/80 underline hover:text-white">
                Become an Instructor →
              </button>
            </div>

            {/* Join as Learner Card */}
            <div className="w-full lg:w-[30rem] h-[10rem] lg:h-[14rem] rounded-xl lg:rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 flex flex-col items-center justify-center text-white p-3 lg:p-4 transition-all hover:scale-[1.03] duration-300">
              <PiStudentBold className="text-3xl lg:text-4xl text-white mb-2 lg:mb-3" />
              <h2 className="text-xl lg:text-2xl font-semibold mb-1">Join as Learner</h2>
              <p className="text-center text-xs lg:text-sm mb-2 lg:mb-3">
                Begin your learning journey with curated, expert-led lessons tailored for you.
              </p>
              <button className="mt-auto text-xs lg:text-sm text-white/80 underline hover:text-white">
                Sign Up →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ----------- section 2 ----------- */}
      <div className="bg-black h-screen w-full relative overflow-hidden">
        <div className="flex w-full h-screen justify-center items-center">
          <Component
            color="rgba(128, 128, 128, 1)"
            animation={{ scale: 100, speed: 90 }}
            noise={{ opacity: 1, scale: 1.2 }}
            sizing="fill"
          />
        </div>
      </div>

      {/* ----------- section 3 ----------- */}
      <div className="bg-gray-200 min-h-screen w-full relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-0 flex flex-col items-center justify-between gap-8">

          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-10 lg:mt-20 flex flex-col justify-between gap-7 lg:flex-row lg:gap-0">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold lg:w-[45%] text-center lg:text-left">
              Get the skills you need for a{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-transparent bg-clip-text">
                job that is in demand.
              </span>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-10 lg:w-[40%]">
              <div className="text-sm sm:text-base text-center lg:text-left">
                The modern Brainn dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>

              <div>
                <a
                  href="/signup"
                  className="inline-block px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-3xl text-gray-100 font-semibold text-lg lg:text-xl
              bg-gradient-to-r from-purple-700 via-pink-700 to-red-950
              hover:outline hover:outline-4 hover:outline-black hover:outline-offset-4
              transition-all duration-100 hover:scale-90 hover:text-white"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>

          <div className="w-full">
            <TimelineSection />
          </div>
        </div>
      </div>

      {/* ---------section 4 --------------- */}
      <div className="relative min-h-screen w-full bg-black overflow-hidden py-12 lg:py-0">
        <BeamsBackground intensity="strong" />
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">Categories</h2>
          <p className="text-center max-w-2xl text-white/80 text-base lg:text-lg mb-8">
            Explore our curated set of categories designed to help you navigate through the content with ease.
          </p>
          <div className="w-full">
            <Category />
          </div>
        </div>
      </div>

      {/* ----------- section 5 community ----------- */}
      <div className="bg-black min-h-screen w-full relative overflow-hidden">
        <div className='container mx-auto flex items-center h-full'>
          <AnimationCommunity />
          <div className='mx-auto w-full absolute bottom-0 h-14 bg-black' />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;