import React from 'react'

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-sky-400/50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Number with Glitch Effect */}
        <div className="relative mb-8">
          <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-500 to-red-500 animate-pulse select-none">
            404
          </h1>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-red-500 opacity-20 animate-ping">
            404
          </div>
        </div>

        {/* Funny Error Messages */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-bounce">
            Oops! 🤷‍♂️
          </h2>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <p className="text-xl md:text-2xl text-gray-300 mb-4 leading-relaxed">
              Looks like this page went on vacation without telling us! 🏖️
            </p>
            <p className="text-lg text-gray-400 mb-4">
              Either you've found a secret portal to nowhere, or our developer had too much coffee again ☕
            </p>
            <div className="text-sm text-gray-500 italic">
              Error Code: PAGES_GONE_ROGUE_AGAIN
            </div>
          </div>
        </div>

        {/* Fun ASCII Art */}
        <div className="hidden md:block mb-8 font-mono text-gray-500 text-xs leading-tight">
          <pre>{`
    ¯\\_(ツ)_/¯
   Here we are...
  In the void...
 Together... awkward...
          `}</pre>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.history.back()}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            <span className="relative z-10">← Go Back</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => window.location.href = '/'}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
          >
            <span className="relative z-10">🏠 Go Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Sarcastic Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-2">
            Don't worry, it happens to the best of us... and apparently to you too 😏
          </p>
          <div className="flex justify-center items-center space-x-4 text-xs text-gray-600">
            <span>Powered by confusion</span>
            <span>•</span>
            <span>Sponsored by broken links</span>
            <span>•</span>
            <span>Made with 💔</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Error