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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Function to restore state from localStorage
  const restoreFromLocalStorage = () => {
    try {
      const cachedData = localStorage.getItem(`course_${courseId}`)
      if (cachedData) {
        const parsedData = JSON.parse(cachedData)
        console.log("Restoring from localStorage:", parsedData)

        // Restore all the state from localStorage
        if (parsedData.courseContent) {
          dispatch(setCourseSectionData(parsedData.courseContent))
        }
        if (parsedData.courseDetails) {
          dispatch(setEntireCourseData(parsedData.courseDetails))
        }
        if (parsedData.completedVideos) {
          dispatch(setCompletedLectures(parsedData.completedVideos))
        }
        if (parsedData.totalLectures) {
          dispatch(setTotalNoOfLectures(parsedData.totalLectures))
        }

        return true // Successfully restored
      }
    } catch (error) {
      console.error("Error restoring from localStorage:", error)
    }
    return false
  }

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

        // First, try to restore from localStorage for immediate UI feedback
        const restoredFromCache = restoreFromLocalStorage()
        if (restoredFromCache) {
          setIsLoading(false) // Show cached data immediately
        }

        console.log("Fetching fresh course data for courseId:", courseId)
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
        console.log("Completed videos from API:", completedVideos)

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

        // Get existing completed videos from localStorage and merge with API data
        let finalCompletedVideos = completedVideos
        try {
          const cachedData = localStorage.getItem(`course_${courseId}`)
          if (cachedData) {
            const parsedData = JSON.parse(cachedData)
            const localCompletedVideos = parsedData.completedVideos || []

            // Merge local and API completed videos (remove duplicates)
            const mergedCompleted = [...new Set([...completedVideos, ...localCompletedVideos])]
            finalCompletedVideos = mergedCompleted
            console.log("Merged completed videos:", finalCompletedVideos)
          }
        } catch (mergeError) {
          console.error("Error merging completed videos:", mergeError)
        }

        // Dispatch actions to update Redux state with fresh data
        dispatch(setCourseSectionData(courseContent))
        dispatch(setEntireCourseData(courseDetails))
        dispatch(setCompletedLectures(finalCompletedVideos))

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

        // Update localStorage with fresh data
        const courseData = {
          courseContent,
          courseDetails,
          completedVideos: finalCompletedVideos,
          totalLectures: lectures,
          timestamp: Date.now()
        }
        localStorage.setItem(`course_${courseId}`, JSON.stringify(courseData))

      } catch (error) {
        console.error("Error loading course data:", error)
        setError(error.message || "Failed to load course data")

        // If API fails and we haven't already restored from cache, try now
        if (!restoreFromLocalStorage()) {
          setError("Failed to load course data and no cached data available")
        } else {
          setError(null) // Clear error if we successfully restored from cache
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
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="relative">
            {/* Modern loading spinner */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 dark:border-slate-600 rounded-full animate-spin border-t-blue-600 dark:border-t-blue-400"></div>
            <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent rounded-full animate-spin-reverse border-t-purple-400 opacity-75"></div>
          </div>
          <span className="ml-3 sm:ml-4 text-base sm:text-lg font-medium font-poppins text-slate-700 dark:text-slate-300 animate-pulse-slow">
            Loading course...
          </span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center p-6 sm:p-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl max-w-md w-full">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Failed to Load Course
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base rounded-lg transition-colors duration-200"
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

        {/* Subtle animated background pattern - hidden on small screens for performance */}
        <div className="absolute inset-0 opacity-20 sm:opacity-30 dark:opacity-10 dark:sm:opacity-20 hidden sm:block">
          <div className="absolute top-0 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
          <div className="absolute top-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-delay"></div>
          <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-delay-long"></div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-black hover:bg-gray-700 backdrop-blur-sm rounded-full shadow-lg transition-colors duration-200"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Main content container */}
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div className={`
            fixed lg:relative z-40 lg:z-10
            w-80 sm:w-96 lg:w-auto
            h-full lg:h-auto
            transform transition-transform duration-300 ease-in-out lg:transform-none
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="backdrop-blur-md bg-white/80 dark:bg-slate-900/80 lg:bg-white/70 lg:dark:bg-slate-900/70 border-r border-white/20 dark:border-slate-700/50 shadow-xl h-full overflow-y-auto">
              <VideoDetailsSidebar setReviewModal={setReviewModal} />
            </div>
          </div>

          {/* Main content area */}
          <div className="relative flex-1 z-10 w-full lg:w-auto">
            <div className="h-[calc(100vh-3.5rem)] overflow-auto">

              {/* Content wrapper with responsive padding */}
              <div className="mx-3 sm:mx-4 lg:mx-6 my-3 sm:my-4 lg:my-6">
                <div className="backdrop-blur-sm bg-white/60 dark:bg-slate-800/60 rounded-xl lg:rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl lg:shadow-2xl shadow-blue-500/5 lg:shadow-blue-500/10 dark:shadow-purple-500/5 dark:lg:shadow-purple-500/10 min-h-[calc(100vh-4.5rem)] sm:min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-7rem)]">

                  {/* Content area with responsive padding */}
                  <div className="p-3 sm:p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-gradient-to-br from-white/50 to-transparent dark:from-slate-800/50 dark:to-transparent">
                    <Outlet />
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Floating elements - adjusted to avoid hamburger button */}
        <div className="fixed bottom-16 sm:bottom-8 right-4 sm:right-8 pointer-events-none lg:bottom-8">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute top-0 left-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full"></div>
        </div>

        <div className="fixed top-1/4 right-6 sm:right-12 pointer-events-none hidden sm:block">
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse-slow"></div>
        </div>

        <div className="fixed bottom-1/3 left-6 sm:left-12 pointer-events-none hidden sm:block">
          <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse-delay"></div>
        </div>

      </div>

      {/* Enhanced modal with backdrop blur */}
      {reviewModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/20 dark:bg-black/40 p-4">
          <div className="flex items-center justify-center min-h-full">
            <div className="w-full max-w-2xl">
              <CourseReviewModal setReviewModal={setReviewModal} />
            </div>
          </div>
        </div>
      )}

    </>
  )
}