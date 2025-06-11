import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/courseApi"
import IconButton from "../../common/IconButton"
import InstructorCourses from "./InstructorDashboard/InstructorCourses"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  My Courses
                </h1>
                <p className="text-gray-400 text-lg">
                  Manage and track your course content
                </p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-300">
                      {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <IconButton
                  text="Add Course"
                  onclick={() => navigate("/dashboard/add-course")}
                  className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-2 group"
                >
                  <VscAdd className="text-xl group-hover:rotate-90 transition-transform duration-300" />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Content */}
        <div className="space-y-6">
          {courses && courses.length > 0 ? (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Table Header Decoration */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

              <div className="p-6">
                <InstructorCourses courses={courses} setCourses={setCourses} />
              </div>
            </div>
          ) : (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center shadow-2xl">
              <div className="space-y-6">
                {/* Empty State Icon */}
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                  <VscAdd className="text-4xl text-blue-400" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-100">
                    No courses yet
                  </h3>
                  <p className="text-gray-400 max-w-md mx-auto">
                    Start building your course library by creating your first course.
                    Share your knowledge with students around the world.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/dashboard/add-course")}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <VscAdd className="text-xl group-hover:rotate-90 transition-transform duration-300" />
                  <span>Create Your First Course</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        {courses && courses.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Courses</p>
                  <p className="text-2xl font-bold text-white">{courses.length}</p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Active</p>
                  <p className="text-2xl font-bold text-white">
                    {courses.filter(course => course.status === 'Published').length || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Draft</p>
                  <p className="text-2xl font-bold text-white">
                    {courses.filter(course => course.status === 'Draft').length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}