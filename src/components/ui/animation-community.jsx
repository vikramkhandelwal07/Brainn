import React from 'react';
import Spline from '@splinetool/react-spline';
import { FaUserFriends, FaChalkboardTeacher, FaLaptopCode } from 'react-icons/fa';

const AnimationCommunity = () => {
  return (
    <div className="relative w-full h-[100vh] overflow-hidden group">
      {/* Desktop Background Animation (Hidden on Mobile) */}
      <div className="hidden lg:block absolute inset-0 w-full h-full z-0">
        <Spline
          scene="https://prod.spline.design/yjSVNWu3RPcMGAj9/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Mobile Background (No Spline) */}
      <div className="block lg:hidden absolute inset-0 w-full h-full z-0 bg-gradient-to-br from-gray-900 via-black to-purple-900"></div>

      {/* Desktop Blur & Gradient Overlay */}
      <div className="hidden lg:block absolute inset-0 bg-black/30 backdrop-blur-sm group-hover:backdrop-blur-0 transition-all duration-300 z-10" />
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-10" />

      {/* Mobile Gradient Overlay */}
      <div className="block lg:hidden absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 z-10" />

      {/* Content Container */}
      <div className="relative z-20 h-full flex flex-col justify-between p-4 sm:p-6 lg:p-0">

        {/* Top Section - Heading and Subheading */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start pt-6 lg:pt-10">
          {/* Left: Main Heading + Button */}
          <div className="text-center lg:text-left lg:absolute lg:top-10 lg:left-20 mb-6 lg:mb-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white lg:mt-10 leading-tight">
              Learn Together. <br /> Grow Forever.
            </h1>
            <a
              href="/signup"
              className="mt-4 inline-block px-6 sm:px-8 py-3 rounded-2xl text-white font-medium text-base sm:text-lg 
                border border-white hover:outline hover:outline-4 hover:outline-white 
                hover:outline-offset-4 transition-all duration-200 hover:scale-95"
            >
              Join Now
            </a>
          </div>

          {/* Right: Subheading */}
          <div className="text-center lg:text-right lg:absolute lg:top-10 lg:right-20 max-w-full lg:max-w-xs xl:max-w-md">
            <p className="text-white/80 text-base sm:text-lg md:text-xl lg:mt-10 leading-relaxed">
              Join a vibrant community of learners, <br className="hidden lg:block" />
              creators, and mentors who build, grow, <br className="hidden lg:block" />
              and thrive together.
            </p>
          </div>
        </div>

        {/* Bottom Section - Cards */}
        <div className="flex-1 flex items-end justify-center pb-6 lg:pb-20">
          <div className="w-full max-w-6xl">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
              {/* Card 1 */}
              <div className="w-full max-w-sm sm:w-[16rem] lg:w-[18rem] h-[10rem] sm:h-[12rem] hover:bg-white/10 hover:backdrop-blur-lg rounded-xl border border-white/20 text-white p-4 sm:p-5 shadow-lg hover:scale-[1.03] transition duration-300">
                <FaUserFriends className="text-2xl sm:text-3xl mb-2 sm:mb-3" />
                <h3 className="text-lg sm:text-xl font-semibold mb-1">Peer Learning</h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Collaborate, share ideas, and grow with learners from around the world.
                </p>
              </div>

              {/* Card 2 */}
              <div className="w-full max-w-sm sm:w-[16rem] lg:w-[18rem] h-[10rem] sm:h-[12rem] hover:bg-white/10 hover:backdrop-blur-lg rounded-xl border border-white/20 text-white p-4 sm:p-5 shadow-lg hover:scale-[1.03] transition duration-300">
                <FaChalkboardTeacher className="text-2xl sm:text-3xl mb-2 sm:mb-3" />
                <h3 className="text-lg sm:text-xl font-semibold mb-1">Expert Sessions</h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Learn directly from industry professionals and skilled educators.
                </p>
              </div>

              {/* Card 3 */}
              <div className="w-full max-w-sm sm:w-[16rem] lg:w-[18rem] h-[10rem] sm:h-[12rem] hover:bg-white/10 hover:backdrop-blur-lg rounded-xl border border-white/20 text-white p-4 sm:p-5 shadow-lg hover:scale-[1.03] transition duration-300">
                <FaLaptopCode className="text-2xl sm:text-3xl mb-2 sm:mb-3" />
                <h3 className="text-lg sm:text-xl font-semibold mb-1">Real Projects</h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Build real-world applications, contribute to open source, and grow your skills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationCommunity;