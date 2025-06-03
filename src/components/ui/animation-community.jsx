import React from 'react';
import Spline from '@splinetool/react-spline';
import { FaUserFriends, FaChalkboardTeacher, FaLaptopCode } from 'react-icons/fa';

const AnimationCommunity = () => {
  return (
    // Add group class here
    <div className="relative w-full h-[100vh] overflow-hidden group">
      {/* Background Animation */}
      <Spline
        scene="https://prod.spline.design/yjSVNWu3RPcMGAj9/scene.splinecode"
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Blur & Gradient Overlay */}
      {/* Remove blur on hover by using group-hover:backdrop-blur-0 */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm group-hover:backdrop-blur-0 transition-all duration-300 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-10" />

      {/* Left Top Corner: Heading + Button */}
      <div className="absolute top-10 left-20 z-20 text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-white mt-10">
          Learn Together. <br /> Grow Forever.
        </h1>
        <a
          href="/signup"
          className="mt-4 inline-block px-8 py-3 rounded-2xl text-white font-medium text-lg 
            border border-white hover:outline hover:outline-4 hover:outline-white 
            hover:outline-offset-4 transition-all duration-200 hover:scale-95 "
        >
          Join Now
        </a>
      </div>

      {/* Right Top Corner: Subheading */}
      <div className="absolute top-10 right-20 z-20 text-right max-w-xs md:max-w-md">
        <p className="text-white/80 text-xl md:text-lg mt-10">
          Join a vibrant community of learners, <br />
          creators, and mentors who build, grow, <br />
          and thrive together.
        </p>
      </div>

      {/* Bottom Center Overlay Cards */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex flex-col md:flex-row gap-6 items-center">
        {/* Card 1 */}
        <div className="w-[16rem] md:w-[18rem] h-[12rem] hover:bg-white/10 hover:backdrop-blur-lg rounded-xl border border-white/20 text-white p-5 shadow-lg hover:scale-[1.03] transition duration-300">
          <FaUserFriends className="text-3xl mb-3" />
          <h3 className="text-xl font-semibold mb-1">Peer Learning</h3>
          <p className="text-sm text-white/80">
            Collaborate, share ideas, and grow with learners from around the world.
          </p>
        </div>

        {/* Card 2 */}
        <div className="w-[16rem] md:w-[18rem] h-[12rem] hover:bg-white/10 hover:backdrop-blur-lg rounded-xl border border-white/20 text-white p-5 shadow-lg hover:scale-[1.03] transition duration-300">
          <FaChalkboardTeacher className="text-3xl mb-3" />
          <h3 className="text-xl font-semibold mb-1">Expert Sessions</h3>
          <p className="text-sm text-white/80">
            Learn directly from industry professionals and skilled educators.
          </p>
        </div>

        {/* Card 3 */}
        <div className="w-[16rem] md:w-[18rem] h-[12rem] hover:bg-white/10 hover:backdrop-blur-lg rounded-xl border border-white/20 text-white p-5 shadow-lg hover:scale-[1.03] transition duration-300">
          <FaLaptopCode className="text-3xl mb-3" />
          <h3 className="text-xl font-semibold mb-1">Real Projects</h3>
          <p className="text-sm text-white/80">
            Build real-world applications, contribute to open source, and grow your skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimationCommunity;
