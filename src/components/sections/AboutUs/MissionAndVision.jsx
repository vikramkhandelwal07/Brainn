import React, { useState } from "react";
import { FaBullseye, FaEye, FaRocket, FaStar } from "react-icons/fa";

const MissionVision = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-black to-violet-900 py-24 px-6 overflow-hidden font-poppins">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
            <FaStar className="text-yellow-400 text-sm animate-spin" />
            <span className="text-white/80 text-sm font-medium">Driving Innovation Forward</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 text-transparent bg-clip-text mb-6 leading-tight">
            Our Purpose
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Defining our core values and aspirations that guide every decision we make
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

          {/* Mission Card */}
          <div
            className={`group relative overflow-hidden transition-all duration-700 transform hover:scale-105 ${hoveredCard === 'mission' ? 'z-20' : 'z-10'
              }`}
            onMouseEnter={() => setHoveredCard('mission')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Glassmorphism Container */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-indigo-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-indigo-500/50 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-full h-full bg-slate-900/90 rounded-3xl"></div>
              </div>

              <div className="relative z-10">
                {/* Icon & Title */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700"></div>
                    <div className="relative bg-gradient-to-br from-blue-400 to-cyan-400 p-4 rounded-2xl shadow-lg">
                      <FaBullseye className="text-3xl text-white transform group-hover:rotate-12 transition-transform duration-500" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 text-transparent bg-clip-text group-hover:scale-105 transition-transform duration-500">
                      Mission
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-2 group-hover:w-24 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-white/80 text-lg leading-relaxed group-hover:text-white transition-colors duration-500 mb-6">
                  Our mission is to empower individuals with knowledge and skills through innovative learning
                  experiences. We aim to inspire curiosity, foster creativity, and build a foundation for
                  lifelong success in a dynamic world.
                </p>

                {/* CTA Button */}
                <div className="flex items-center gap-3 text-blue-400 group-hover:text-cyan-300 transition-colors duration-500 cursor-pointer">
                  <span className="font-semibold">Learn More</span>
                  <FaRocket className="text-sm transform group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div
            className={`group relative overflow-hidden transition-all duration-700 transform hover:scale-105 ${hoveredCard === 'vision' ? 'z-20' : 'z-10'
              }`}
            onMouseEnter={() => setHoveredCard('vision')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Glassmorphism Container */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-green-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-green-500/50 p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-full h-full bg-slate-900/90 rounded-3xl"></div>
              </div>

              <div className="relative z-10">
                {/* Icon & Title */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-700"></div>
                    <div className="relative bg-gradient-to-br from-emerald-400 to-teal-400 p-4 rounded-2xl shadow-lg">
                      <FaEye className="text-3xl text-white transform group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 text-transparent bg-clip-text group-hover:scale-105 transition-transform duration-500">
                      Vision
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mt-2 group-hover:w-24 transition-all duration-500"></div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-white/80 text-lg leading-relaxed group-hover:text-white transition-colors duration-500 mb-6">
                  Our vision is to become a globally recognized hub of excellence, cultivating an inclusive
                  environment where learners can thrive and contribute meaningfully to society through
                  transformative education.
                </p>

                {/* CTA Button */}
                <div className="flex items-center gap-3 text-emerald-400 group-hover:text-teal-300 transition-colors duration-500 cursor-pointer">
                  <span className="font-semibold">Discover More</span>
                  <FaRocket className="text-sm transform group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-500" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Stats/Metrics */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "10K+", label: "Lives Transformed", color: "from-blue-400 to-cyan-400" },
            { number: "95%", label: "Success Rate", color: "from-purple-400 to-pink-400" },
            { number: "50+", label: "Global Partners", color: "from-emerald-400 to-teal-400" }
          ].map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} text-transparent bg-clip-text group-hover:scale-110 transition-transform duration-500`}>
                {stat.number}
              </div>
              <div className="text-white/60 text-sm font-medium mt-2 group-hover:text-white/80 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;