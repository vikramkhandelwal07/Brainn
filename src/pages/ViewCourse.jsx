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

  useEffect(() => {
    ; (async () => {
      try {
        setIsLoading(true)
        const courseData = await getCompleteCourseDetails(courseId, token)
        console.log("Course Data here... ", courseData.courseDetails)
        dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
        dispatch(setEntireCourseData(courseData.courseDetails))
        dispatch(setCompletedLectures(courseData.completedVideos))
        let lectures = 0
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec.subSection.length
        })
        dispatch(setTotalNoOfLectures(lectures))
      } catch (error) {
        console.error("Error loading course data:", error)
      } finally {
        setIsLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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