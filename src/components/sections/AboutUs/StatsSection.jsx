import React, { useState, useEffect, useRef } from "react";
import { FaGraduationCap, FaUsers, FaBookOpen, FaTrophy, FaStar, FaRocket } from "react-icons/fa";

const stats = [
  {
    number: "5K",
    label: "Active Students",
    icon: FaGraduationCap,
    color: "from-blue-400 to-cyan-400",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    count: 5000
  },
  {
    number: "10+",
    label: "Expert Mentors",
    icon: FaUsers,
    color: "from-purple-400 to-pink-400",
    bgColor: "from-purple-500/20 to-pink-500/20",
    count: 10
  },
  {
    number: "200+",
    label: "Premium Courses",
    icon: FaBookOpen,
    color: "from-emerald-400 to-teal-400",
    bgColor: "from-emerald-500/20 to-teal-500/20",
    count: 200
  },
  {
    number: "50+",
    label: "Industry Awards",
    icon: FaTrophy,
    color: "from-yellow-400 to-orange-400",
    bgColor: "from-yellow-500/20 to-orange-500/20",
    count: 50
  },
];

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatsSection = () => {
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-stale-900 py-20 overflow-hidden font-poppins">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <FaStar
            key={i}
            className="absolute text-white/10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 8 + 4}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
            <FaRocket className="text-yellow-400 text-sm animate-bounce" />
            <span className="text-white/80 text-sm font-medium">Our Impact in Numbers</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 text-transparent bg-clip-text mb-4">
            Transforming Lives
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Every number tells a story of growth, achievement, and dreams realized
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative transform transition-all duration-500 hover:scale-105 ${hoveredStat === index ? 'z-20' : 'z-10'
                }`}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              {/* Card Container */}
              <div className="relative overflow-hidden">
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700`}></div>

                {/* Glowing Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} p-[2px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}>
                  <div className="w-full h-full bg-gray-900/90 rounded-3xl"></div>
                </div>

                {/* Main Content */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl group-hover:bg-white/10 transition-all duration-500">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      <div className={`relative bg-gradient-to-br ${stat.color} p-4 rounded-2xl shadow-lg`}>
                        <stat.icon className="text-3xl text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                      </div>
                    </div>
                  </div>

                  {/* Number */}
                  <div className="text-center mb-4">
                    <h3 className={`text-5xl font-black bg-gradient-to-r ${stat.color} text-transparent bg-clip-text group-hover:scale-110 transition-transform duration-500`}>
                      {stat.count >= 1000 ? (
                        <AnimatedCounter end={stat.count} suffix="+" />
                      ) : stat.count >= 100 ? (
                        <AnimatedCounter end={stat.count} suffix="+" />
                      ) : (
                        <AnimatedCounter end={stat.count} suffix="+" />
                      )}
                    </h3>
                    <div className={`w-16 h-1 bg-gradient-to-r ${stat.color} rounded-full mx-auto mt-3 group-hover:w-24 transition-all duration-500`}></div>
                  </div>

                  {/* Label */}
                  <p className="text-white/70 text-lg font-medium text-center group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </p>

                  {/* Floating Animation Indicator */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`w-3 h-3 bg-gradient-to-r ${stat.color} rounded-full animate-ping`}></div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Particles */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 bg-gradient-to-r ${stat.color} rounded-full animate-bounce`}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 20}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '1s'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/20 cursor-pointer group hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-500">
            <span className="text-white font-semibold group-hover:text-blue-200 transition-colors duration-300">
              Join Our Growing Community
            </span>
            <FaRocket className="text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;