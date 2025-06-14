/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/ProfileApi"

export default function MyEnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [])

  // Refetch courses when the page becomes visible/focused
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        getEnrolledCourses();
      }
    };

    const handleFocus = () => {
      getEnrolledCourses();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl py-10">
            My Learning Journey
          </h1>
          <p className="text-lg text-gray-600">Track your progress and continue learning</p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        {!enrolledCourses ? (
          // Loading State
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
              <p className="text-lg text-gray-600">Loading your courses...</p>
            </div>
          </div>
        ) : !enrolledCourses.length ? (
          // Empty State
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                <svg className="h-12 w-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-800">No courses yet</h3>
              <p className="mb-6 text-gray-600">Start your learning journey by enrolling in a course</p>
              <button className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl">
                Browse Courses
              </button>
            </div>
          </div>
        ) : (
          // Courses List
          <div className="space-y-6">
            {/* Refresh Button */}
            <div className="flex justify-end">
              <button
                onClick={getEnrolledCourses}
                className="flex items-center gap-2 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200/50 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{enrolledCourses.length}</p>
                    <p className="text-sm text-gray-600">Total Courses</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {enrolledCourses.filter(course => (course.progressPercentage || 0) === 100).length}
                    </p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                    <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {enrolledCourses.filter(course => (course.progressPercentage || 0) > 0 && (course.progressPercentage || 0) < 100).length}
                    </p>
                    <p className="text-sm text-gray-600">In Progress</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {enrolledCourses.map((course, i) => (
                <div
                  key={i}
                  className="group cursor-pointer rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  {/* Course Image and Badge */}
                  <div className="relative mb-4">
                    <img
                      src={course.thumbnail}
                      alt="course_img"
                      className="h-48 w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute right-3 top-3">
                      <div className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${(course.progressPercentage || 0) === 100
                        ? 'bg-green-500'
                        : (course.progressPercentage || 0) > 0
                          ? 'bg-orange-500'
                          : 'bg-gray-500'
                        }`}>
                        {(course.progressPercentage || 0) === 100
                          ? 'Completed'
                          : (course.progressPercentage || 0) > 0
                            ? 'In Progress'
                            : 'Not Started'}
                      </div>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {course.courseName}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      {course.courseDescription.length > 100
                        ? `${course.courseDescription.slice(0, 100)}...`
                        : course.courseDescription}
                    </p>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{course?.totalDuration || 'Duration not specified'}</span>
                    </div>

                    {/* Progress Section */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-bold text-blue-600">
                          {course.progressPercentage || 0}%
                        </span>
                      </div>
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height="8px"
                        isLabelVisible={false}
                        bgColor="linear-gradient(to right, #3b82f6, #8b5cf6)"
                        baseBgColor="#e5e7eb"
                        borderRadius="4px"
                      />
                    </div>

                    {/* Continue Learning Button */}
                    <div className="pt-2">
                      <div className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Continue Learning
                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}