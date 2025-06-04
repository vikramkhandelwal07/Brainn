import React from 'react'
import BentoGrid from '../components/sections/AboutUs/BentoGrid'
import Footer from "../components/common/Footer";
import StatsSection from '../components/sections/AboutUs/StatsSection';
import MissionVisionSection from '../components/sections/AboutUs/MissionAndVision';
import FounderSection from '../components/sections/AboutUs/FounderSection';
import ContactUsForm from "../components/sections/ContactUs/ContactForm"

const About = () => {
  return (
    <div className='w-full h-screen bg-black'>
      <div className='w-full h-screen bg-gradient-to-tr from-violet-800  via-black to-black '>
        {/* section1 */}
        <BentoGrid />
        <StatsSection />
        <MissionVisionSection />
        <FounderSection />

        {/* Contact Section */}
        <div className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left Side - Contact Form */}
              <div className="w-full">
                <ContactUsForm />
              </div>

              {/* Right Side - Complementary UI */}
              <div className="space-y-8">

                {/* Contact Info Cards */}
                <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/30">
                  <h3 className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Get in Touch
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Email</h4>
                        <p className="text-gray-400">hello@company.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Phone</h4>
                        <p className="text-gray-400">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Office</h4>
                        <p className="text-gray-400">123 Business St, City, State 12345</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats or Features */}
                <div className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20">
                  <h3 className="text-xl font-bold text-white mb-6">Why Choose Us?</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">24/7</div>
                      <p className="text-gray-300 text-sm">Support</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">100+</div>
                      <p className="text-gray-300 text-sm">Happy Clients</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">5★</div>
                      <p className="text-gray-300 text-sm">Rating</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Fast</div>
                      <p className="text-gray-300 text-sm">Response</p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="relative">
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-bounce"></div>

                  <div className="bg-gradient-to-br from-gray-800/20 to-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-gray-300 text-sm font-medium">We're online now!</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Our team typically responds within 2 hours during business hours.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}

export default About