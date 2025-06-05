import React from "react";
import ContactUsForm from "./ContactForm";
import ContactInfoSection from "./ContactInfoSection";

const ContactPageSection = () => {
  return (
    <div className="relative border border-gray-700/50 bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-2xl p-8 lg:p-12 flex gap-6 flex-col overflow-hidden">

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/50 to-pink-500/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/50 to-purple-500/50 rounded-full blur-2xl"></div>
      

      {/* Header Section */}
      <div className="relative z-10 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 mb-6">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-300">Let's Build Something Amazing</span>
        </div>

        <h1 className="text-4xl lg:text-5xl xl:text-6xl 
              leading-tight 
              font-bold 
              mb-4
              bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
          Got an <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Idea</span>?
          <br />
          We've got the <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-normal">Skills</span>
        </h1>

        <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 max-w-20"></div>
          <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Team Up!
          </span>
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent flex-1 max-w-20"></div>
        </div>

        <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
          Share your vision with us and let's transform your ideas into reality.
          <span className="text-purple-400 font-medium"> We're here to listen, innovate, and deliver exceptional results.</span>
        </p>

        {/* Feature highlights */}
        <div className="flex flex-wrap gap-4 mt-6 justify-center lg:justify-start">
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-800/50 rounded-full border border-gray-700/30">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-300">Quick Response</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-800/50 rounded-full border border-gray-700/30">
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-gray-300">Expert Team</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-800/50 rounded-full border border-gray-700/30">
            <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-gray-300">Proven Results</span>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative z-10 mt-8 flex justify-center">
        <ContactInfoSection />
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactPageSection;