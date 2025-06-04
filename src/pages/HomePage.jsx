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
    <div className=''>
      {/* ----------- section 1 ----------- */}
      <div className="bg-black h-screen w-full relative overflow-hidden">
        {/* ----------- Large Screens Content ----------- */}
        <div className="hidden lg:block absolute inset-0">
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

          <div className="absolute top-56 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-white via-violet-500 to-blue-500 rounded"></div>

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

          <h2 className="absolute top-[15rem] left-1/2 transform -translate-x-1/2 text-white text-2xl text-center px-4 whitespace-nowrap font-semibold bg-gradient-to-r from-blue-400 via-violet-500 to-white bg-clip-text text-transparent">
            Upskill. Reskill. Repeat.
          </h2>

          <h3 className="absolute top-[18rem] left-1/2 transform -translate-x-1/2 text-center px-6 whitespace-nowrap text-lg text-gray-400">
            Instructors thrive here. Learners rise here.
          </h3>
        </div>

        {/* ----------- Common Buttons ----------- */}
        <div className="absolute top-1/2 left-1/2 z-10 transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center gap-6 md:gap-8 mt-10">
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

          <div className="bg-black absolute top-64 z-10 left-full h-96 w-[40rem]"></div>
        </div>
      </div>

      {/* ----------- Intersection Cards (half in both sections) ----------- */}


      <div>
        <div className="absolute w-full top-[90vh] left-0 flex justify-center gap-10 z-10">
          {/* Explore Courses Card */}
          <div className="w-[22rem] h-[14rem] rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 flex flex-col items-center justify-center text-white p-6 transition-all hover:scale-[1.03] duration-300">
            <FaBookOpen className="text-4xl text-white mb-3" />
            <h2 className="text-2xl font-semibold mb-1">Explore Courses</h2>
            <p className="text-center text-sm mb-3">
              Dive into trending topics across design, tech, and innovation. Learn at your pace.
            </p>
            <button className="mt-auto text-sm text-white/80 underline hover:text-white">
              Browse Catalog →
            </button>
          </div>

          {/* Start Teaching Card */}
          <div className="w-[22rem] h-[14rem] rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 flex flex-col items-center justify-center text-white p-6 transition-all hover:scale-[1.03] duration-300">
            <FaChalkboardTeacher className="text-4xl text-white mb-3" />
            <h2 className="text-2xl font-semibold mb-1">Start Teaching</h2>
            <p className="text-center text-sm mb-3">
              Share your knowledge with the world. Create impactful courses in minutes.
            </p>
            <button className="mt-auto text-sm text-white/80 underline hover:text-white">
              Become an Instructor →
            </button>
          </div>

          <div className="w-[22rem] h-[14rem] rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20 flex flex-col items-center justify-center text-white p-6 transition-all hover:scale-[1.03] duration-300">
            <PiStudentBold className="text-4xl text-white mb-3" />
            <h2 className="text-2xl font-semibold mb-1">Join as Learner</h2>
            <p className="text-center text-sm mb-3">
              Begin your learning journey with curated, expert-led lessons tailored for you.
            </p>
            <button className="mt-auto text-sm text-white/80 underline hover:text-white">
              Sign Up →
            </button>
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
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">

          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ml-20">
              Get the skills you need for a{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-transparent bg-clip-text">
                job that is in demand.
              </span>
            </div>

            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern Brainn dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>

              <div >
                <a
                  href="/signup"
                  className="inline-block px-10 py-4 rounded-3xl text-gray-100 font-semibold text-xl
              bg-gradient-to-r from-purple-700 via-pink-700 to-red-950
              hover:outline hover:outline-4 hover:outline-black hover:outline-offset-4
              transition-all duration-100 hover:scale-90 hover:text-white"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>

          <TimelineSection />


        </div>
      </div>


      {/* ---------section 4 --------------- */}
      <div className="relative h-screen w-full bg-black overflow-hidden">
        <BeamsBackground intensity="strong" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h2 className="text-5xl font-bold mb-4">Categories</h2>
          <p className="text-center max-w-2xl text-white/80 text-lg">
            Explore our curated set of categories designed to help you navigate through the content with ease. 
          </p>
          <Category />
        </div>
      </div>

      {/* ----------- section 5 communnity ----------- */}
      <div className="bg-black h-screen w-full relative overflow-hidden ">
        <div className='mx-auto  flex items-center max-w-maxContent'>
          <AnimationCommunity />
          <div className='mx-auto w-full absolute bottom-0 h-14 bg-black' />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
