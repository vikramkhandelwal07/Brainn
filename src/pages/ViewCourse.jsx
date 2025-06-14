import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/sections/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/sections/ViewCourse/VideoDetailsSidebar"
import { getCompleteCourseDetails } from "../services/courseApi"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load course data on component mount and whenever courseId or token changes
  useEffect(() => {
    const loadCourseData = async () => {
      if (!courseId || !token) {
        setError("Missing course ID or authentication token")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        console.log("Fetching course data for courseId:", courseId)
        const response = await getCompleteCourseDetails(courseId, token)

        console.log("Full API Response:", response)

        // Try different possible response structures
        let courseDetails = null
        let completedVideos = []

        if (response?.data?.courseDetails) {
          courseDetails = response.data.courseDetails
          completedVideos = response.data.completedVideos || []
        } else if (response?.courseDetails) {
          courseDetails = response.courseDetails
          completedVideos = response.completedVideos || []
        } else if (response?.data) {
          courseDetails = response.data
          completedVideos = response.completedVideos || []
        } else {
          courseDetails = response
          completedVideos = response?.completedVideos || []
        }

        console.log("Processed courseDetails:", courseDetails)
        console.log("Completed videos:", completedVideos)

        if (!courseDetails) {
          throw new Error("Course details not found in API response")
        }

        // Handle different possible courseContent structures
        let courseContent = []
        if (courseDetails.courseContent) {
          courseContent = courseDetails.courseContent
        } else if (courseDetails.sections) {
          courseContent = courseDetails.sections
        } else if (Array.isArray(courseDetails)) {
          courseContent = courseDetails
        }

        console.log("Course content:", courseContent)

        // Dispatch actions to update Redux state
        dispatch(setCourseSectionData(courseContent))
        dispatch(setEntireCourseData(courseDetails))
        dispatch(setCompletedLectures(completedVideos))

        // Calculate total lectures
        let lectures = 0
        if (Array.isArray(courseContent)) {
          courseContent.forEach((section) => {
            if (section.subSections && Array.isArray(section.subSections)) {
              lectures += section.subSections.length
            } else if (section.subSection && Array.isArray(section.subSection)) {
              lectures += section.subSection.length
            }
          })
        }

        console.log("Total lectures calculated:", lectures)
        dispatch(setTotalNoOfLectures(lectures))

        // Store the course data in localStorage as backup
        const courseData = {
          courseContent,
          courseDetails,
          completedVideos,
          totalLectures: lectures,
          timestamp: Date.now()
        }
        localStorage.setItem(`course_${courseId}`, JSON.stringify(courseData))

      } catch (error) {
        console.error("Error loading course data:", error)
        setError(error.message || "Failed to load course data")

        // Try to load from localStorage as fallback
        try {
          const cachedData = localStorage.getItem(`course_${courseId}`)
          if (cachedData) {
            const parsedData = JSON.parse(cachedData)
            // Only use cached data if it's less than 1 hour old
            if (Date.now() - parsedData.timestamp < 3600000) {
              console.log("Loading course data from cache")
              dispatch(setCourseSectionData(parsedData.courseContent))
              dispatch(setEntireCourseData(parsedData.courseDetails))
              dispatch(setCompletedLectures(parsedData.completedVideos))
              dispatch(setTotalNoOfLectures(parsedData.totalLectures))
              setError(null)
            }
          }
        } catch (cacheError) {
          console.error("Error loading from cache:", cacheError)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadCourseData()
  }, [courseId, token, dispatch])

  // Clear localStorage when component unmounts or courseId changes
  useEffect(() => {
    return () => {
      // Clean up old course data when navigating away
      const allKeys = Object.keys(localStorage)
      allKeys.forEach(key => {
        if (key.startsWith('course_') && key !== `course_${courseId}`) {
          localStorage.removeItem(key)
        }
      })
    }
  }, [courseId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative">
            {/* Modern loading spinner */}
            <div className="w-16 h-16 border-4 border-blue-200 dark:border-slate-600 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin-reverse border-t-purple-400 opacity-75"></div>
          </div>
          <span className="ml-4 text-lg font-medium font-poppins text-slate-700 dark:text-slate-300 animate-pulse-slow">
            Loading course content...
          </span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Failed to Load Course
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Modern gradient background */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">

        {/* Subtle animated background pattern */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-delay"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-delay-long"></div>
        </div>

        {/* Main content container with glass morphism effect */}
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">

          {/* Enhanced sidebar with backdrop blur */}
          <div className="relative z-10">
            <div className="backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-r border-white/20 dark:border-slate-700/50 shadow-xl">
              <VideoDetailsSidebar setReviewModal={setReviewModal} />
            </div>
          </div>

          {/* Main content area with modern styling */}
          <div className="relative flex-1 z-10">
            <div className="h-[calc(100vh-3.5rem)] overflow-auto">

              {/* Content wrapper with glass effect */}
              <div className="mx-6 my-6">
                <div className="backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-blue-500/10 dark:shadow-purple-500/10 min-h-[calc(100vh-7rem)]">

                  {/* Content area with subtle inner glow */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-white/50 to-transparent dark:from-slate-800/50 dark:to-transparent">
                    <Outlet />
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Floating elements for visual interest */}
        <div className="fixed bottom-8 right-8 pointer-events-none">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-0 left-0 w-2 h-2 bg-blue-600 rounded-full"></div>
        </div>

        <div className="fixed top-1/4 right-12 pointer-events-none">
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="fixed bottom-1/3 left-12 pointer-events-none">
          <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse-delay"></div>
        </div>

      </div>

      {/* Enhanced modal with backdrop blur */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/20 dark:bg-black/40">
          <CourseReviewModal setReviewModal={setReviewModal} />
        </div>
      )}

    </>
  )
}