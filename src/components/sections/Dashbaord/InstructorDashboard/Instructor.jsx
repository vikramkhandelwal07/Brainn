import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/courseApi';
import { getInstructorData } from '../../../../services/ProfileApi';
import InstructorPanel from './InstructorPanel';
import { Link } from 'react-router-dom';

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.userProfile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      console.log(instructorApiData)
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-800/50 to-slate-700/30 rounded-2xl border border-slate-700/50 p-8 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-2xl"></div>

        <div className="relative">
          <div className="flex items-center space-x-3 mb-2">
            <div className="text-4xl">👋</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
              Hi {user?.firstName}
            </h1>
          </div>
          <p className="text-slate-400 text-lg font-medium">
            Welcome to your instructor dashboard - let's create something amazing
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
            <div className="relative w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-2 border-blue-400/20 border-r-blue-400 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <div className="ml-4 text-slate-300 font-medium">Loading dashboard...</div>
        </div>
      ) : courses.length > 0 ? (
        <div className="space-y-8">
          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[450px]">
            {/* Chart Section */}
            <div className="lg:col-span-2">
              {totalAmount > 0 || totalStudents > 0 ? (
                <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-slate-200">Analytics Overview</h2>
                  </div>
                  <InstructorPanel courses={instructorData} />
                </div>
              ) : (
                <div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 shadow-2xl flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-600/30 to-slate-700/30 rounded-full flex items-center justify-center mb-6 border border-slate-600/50">
                    <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-300 mb-2">Visualize</h3>
                  <p className="text-slate-400 text-center">
                    Not enough data to visualize analytics yet
                  </p>
                </div>
              )}
            </div>

            {/* Statistics Panel */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-200">Statistics</h2>
              </div>

              <div className="space-y-6">
                {/* Total Courses */}
                <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-400 font-medium">Total Courses</p>
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    {courses.length}
                  </p>
                </div>

                {/* Total Students */}
                <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-400 font-medium">Total Students</p>
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                    {totalStudents}
                  </p>
                </div>

                {/* Total Income */}
                <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-400 font-medium">Total Income</p>
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                    ₹{totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-200">Your Courses</h2>
              </div>
              <Link
                to="/dashboard/my-courses"
                className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/30 hover:to-yellow-600/30 text-yellow-400 hover:text-yellow-300 font-semibold rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-200"
              >
                <span>View All</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="group bg-slate-700/30 rounded-xl overflow-hidden border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-slate-200 mb-2 line-clamp-2">
                      {course.courseName}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        <span>{course.studentsEnrolled?.length || 0} students</span>
                      </div>
                      <div className="flex items-center space-x-1 text-green-400 font-semibold">
                        <span>₹{course.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-20">
          <div className="text-center bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-12 shadow-2xl max-w-md">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-600/30 to-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-600/50">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-200 mb-3">
              No Courses Yet
            </h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              You haven't created any courses yet. Start your teaching journey today!
            </p>
            <Link
              to="/dashboard/add-course"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create Your First Course</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}