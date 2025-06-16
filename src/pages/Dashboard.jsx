import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/sections/Dashbaord/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.userProfile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-black ">
        <div className="text-center">
          {/* Enhanced Loading Spinner */}
          <div className="relative mb-6">
            <div className="h-16 w-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-purple-500 animate-spin animation-delay-150"></div>
              <div className="absolute inset-4 rounded-full border border-transparent border-t-pink-500 animate-spin animation-delay-300"></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">Loading Dashboard</h3>
            <p className="text-sm text-gray-400">Please wait while we prepare your workspace...</p>
          </div>

          {/* Loading Progress Dots */}
          <div className="flex justify-center gap-1 mt-4">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="h-2 w-2 bg-purple-500 rounded-full animate-bounce animation-delay-150"></div>
            <div className="h-2 w-2 bg-pink-500 rounded-full animate-bounce animation-delay-300"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.15) 2px, transparent 0), 
                           radial-gradient(circle at 75px 75px, rgba(255,255,255,0.1) 2px, transparent 0)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-auto">
        {/* Content Background Overlay */}
        <div className="absolute inset-0 bg-black"></div>

        {/* Scrollable Content Container */}
        <div className="relative z-10 min-h-full">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Content Wrapper with Glass Effect */}
            <div className="relative">
              {/* Subtle Background Card */}
              <div className="absolute inset-0 rounded-2xl bg-black backdrop-blur-sm shadow-2xl"></div>

              {/* Main Content */}
              <div className="relative rounded-2xl p-6 sm:p-8 lg:p-10">
                <Outlet />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Background Elements */}
        <div className="fixed bottom-8 right-8 pointer-events-none">
          <div className="h-32 w-32 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-2xl"></div>
        </div>
        <div className="fixed top-1/4 right-1/4 pointer-events-none">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-600/5 to-pink-600/5 blur-xl"></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard