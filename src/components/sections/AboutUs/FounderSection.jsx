import React, { useState } from "react";
import { FaQuoteLeft, FaStar, FaLinkedin, FaTwitter, FaInstagram, FaHeart } from "react-icons/fa";
import founder from "../../../assets/founder.jpg"
const FounderSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);



  return (
    <section className="relative min-h-screen bg-gradient-to-b from-violet-900 via-black to-gray-900 py-24 px-6 overflow-hidden font-poppins">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-red-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
            <FaStar className="text-yellow-400 text-sm animate-spin" />
            <span className="text-white/80 text-sm font-medium">Visionary Leadership</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Founder Image Section */}
          <div className="w-full lg:w-2/5 relative group">
            {/* Image Container with Advanced Effects */}
            <div className="relative">
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 via-pink-500/30 to-red-500/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 animate-pulse"></div>

              {/* Main Image Frame */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/20 shadow-2xl group-hover:scale-105 transition-all duration-700">
                <div className="relative overflow-hidden rounded-2xl">
                  {/* Loading Shimmer */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse rounded-2xl"></div>
                  )}

                  <img
                    src={founder}
                    alt="Founder Vikram"
                    className={`w-full h-[32rem] object-cover rounded-2xl transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                      } group-hover:scale-105`}
                    onLoad={() => setImageLoaded(true)}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
                </div>
              </div>

              {/* Floating Social Links */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
                {[
                  { icon: FaLinkedin, color: "from-blue-500 to-blue-600", name: "linkedin" },
                  { icon: FaTwitter, color: "from-sky-400 to-sky-500", name: "twitter" },
                  { icon: FaInstagram, color: "from-pink-500 to-purple-500", name: "instagram" }
                ].map((social, index) => (
                  <div
                    key={index}
                    className={`relative group/social cursor-pointer transform transition-all duration-300 ${hoveredSocial === social.name ? 'scale-125 -translate-y-2' : 'hover:scale-110'
                      }`}
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-full blur-md opacity-70 group-hover/social:opacity-100 transition-opacity duration-300`}></div>
                    <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20">
                      <social.icon className="text-white text-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-3/5 space-y-8">
            {/* Title with Animation */}
            <div className="space-y-4">
              <h2 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-transparent bg-clip-text leading-tight">
                Meet the 
                
                <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                   {" "}Founder
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full animate-pulse"></div>
            </div>

            {/* Story Content */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                <p className="text-xl leading-relaxed text-gray-300 group-hover:text-white transition-colors duration-300">
                  Hello, I'm <span className="font-bold bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">Vikram</span> - a builder, dreamer, and the
                  founder of this vision. My journey wasn't easy, but it shaped the mission we're on today.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 group">
                <p className="text-xl leading-relaxed text-gray-300 group-hover:text-white transition-colors duration-300">
                  From humble beginnings to building a platform that reaches thousands, I've experienced both struggle
                  and success. I created this space to empower others with accessible, future-ready education.
                </p>
              </div>

             
            </div>

            {/* Quote Section */}
            <div className="relative mt-12">
              <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-pink-500 p-3 rounded-full flex-shrink-0">
                    <FaQuoteLeft className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-lg italic text-white/90 leading-relaxed mb-4">
                      "The people who are crazy enough to think they can change the world are the ones who do."
                    </p>
                    <p className="text-sm text-gray-400 font-medium">— Steve Jobs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats/Achievements */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { number: "10K+", label: "Students Impacted", icon: FaHeart },
                { number: "2+", label: "Years Building", icon: FaStar },
                { number: "100%", label: "Passion Driven", icon: FaHeart }
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:bg-white/10 transition-all duration-300">
                    <stat.icon className="text-2xl text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400 mt-2 group-hover:text-gray-300 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;