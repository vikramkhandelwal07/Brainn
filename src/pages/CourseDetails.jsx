/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback, useMemo } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import Confirmation from "../components/common/Confirmation"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/sections/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/sections/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/courseApi"
import { buyCourse } from "../services/studentApi"
import GetAverageRating from "../utils/AverageRating"
import Error from "./Error404"

function CourseDetails() {
  const { user } = useSelector((state) => state.userProfile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.userProfile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()

  // State management
  const [response, setResponse] = useState(null)
  const [Confirmation, setConfirmation] = useState(null)
  const [isActive, setIsActive] = useState([])
  const [fetchError, setFetchError] = useState(null)

  // Fetch course details with error handling
  useEffect(() => {
    const fetchDetails = async () => {
      if (!courseId) return

      try {
        setFetchError(null)
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.error("Could not fetch Course Details:", error)
        setFetchError("Failed to load course details. Please try again.")
      }
    }

    fetchDetails()
  }, [courseId])

  // Memoized calculations for performance
  const avgReviewCount = useMemo(() => {
    if (!response?.data?.courseDetails?.ratingAndReviews) return 0
    return GetAverageRating(response.data.courseDetails.ratingAndReviews)
  }, [response?.data?.courseDetails?.ratingAndReviews])

  const totalNoOfLectures = useMemo(() => {
    if (!response?.data?.courseDetails?.courseContent) return 0

    return response.data.courseDetails.courseContent.reduce((total, section) => {
      return total + (section.subSection?.length || 0)
    }, 0)
  }, [response?.data?.courseDetails?.courseContent])

  // Optimized accordion handler
  const handleActive = useCallback((id) => {
    setIsActive(prev =>
      prev.includes(id)
        ? prev.filter(activeId => activeId !== id)
        : [...prev, id]
    )
  }, [])

  // Collapse all sections handler
  const handleCollapseAll = useCallback(() => {
    setIsActive([])
  }, [])

  // Enhanced buy course handler
  const handleBuyCourse = useCallback(() => {
    if (token && user) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }

    setConfirmation({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => {
        setConfirmation(null)
        navigate("/login")
      },
      btn2Handler: () => setConfirmation(null),
    })
  }, [token, user, courseId, navigate, dispatch])

  // Enhanced modal close handler
  const handleCloseModal = useCallback(() => {
    setConfirmation(null)
  }, [])

  // Loading states
  if (loading || paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  // Error states
  if (fetchError) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{fetchError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }
  
  if (!response || !response.success) {
    return <Error />
  }

  // Destructure course details with fallbacks
  const courseDetails = response.data?.courseDetails
  if (!courseDetails) {
    return <Error />
  }

  const {
    _id: course_id,
    courseName = "Course Name Not Available",
    courseDescription = "No description available",
    thumbnail,
    price = 0,
    whatYouWillLearn = "Learning objectives not specified",
    courseContent = [],
    ratingAndReviews = [],
    instructor = {},
    studentsEnrolled = [],
    createdAt,
  } = courseDetails

  const instructorName = `${instructor.firstName || ''} ${instructor.lastName || ''}`.trim() || "Unknown Instructor"

  return (
    <>
      <div className="relative w-full bg-gray-800">
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">

            {/* Mobile Thumbnail */}
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="course thumbnail"
                  className="aspect-auto w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-video w-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">No thumbnail available</span>
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-gray-100">
              <div>
                <h1 className="text-4xl font-bold text-gray-100 sm:text-[42px] leading-tight">
                  {courseName}
                </h1>
              </div>

              <p className="text-gray-300 leading-relaxed">{courseDescription}</p>

              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25 font-semibold">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span className="text-gray-300">({ratingAndReviews.length} reviews)</span>
                <span className="text-gray-300">{studentsEnrolled.length} students enrolled</span>
              </div>

              <div>
                <p className="text-gray-300">Created By {instructorName}</p>
              </div>

              <div className="flex flex-wrap gap-5 text-lg text-gray-300">
                <p className="flex items-center gap-2">
                  <BiInfoCircle className="text-blue-400" />
                  Created at {createdAt ? formatDate(createdAt) : "Date not available"}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt className="text-green-400" />
                  English
                </p>
              </div>
            </div>

            {/* Mobile Buy Section */}
            <div className="flex w-full flex-col gap-4 border-y border-y-gray-700 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-gray-100">
                Rs. {price.toLocaleString()}
              </p>
              <button
                className="yellowButton transition-all duration-200 hover:scale-105"
                onClick={handleBuyCourse}
                disabled={paymentLoading}
              >
                {paymentLoading ? "Processing..." : "Buy Now"}
              </button>
              <button className="blackButton transition-all duration-200 hover:scale-105">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Desktop Course Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailsCard
              course={courseDetails}
              setConfirmation={setConfirmation}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto box-content px-4 text-start text-gray-100 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">

          {/* What will you learn section */}
          <section className="my-8 border border-gray-700 p-8 rounded-lg bg-gray-900/50">
            <h2 className="text-3xl font-semibold mb-5">What you'll learn</h2>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </section>

          {/* Course Content Section */}
          <section className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <h2 className="text-[28px] font-semibold">Course Content</h2>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-4 text-gray-300">
                  <span>{courseContent.length} section{courseContent.length !== 1 ? 's' : ''}</span>
                  <span>{totalNoOfLectures} lecture{totalNoOfLectures !== 1 ? 's' : ''}</span>
                  <span>{response.data?.totalDuration || "Duration not available"} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25 hover:text-yellow-50 transition-colors duration-200"
                    onClick={handleCollapseAll}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>
          </section>

            {/* Course Details Accordion */}
            <div className="py-4">
              {courseContent.length > 0 ? (
                courseContent.map((course, index) => (
                  <CourseAccordionBar
                    course={course}
                    key={course._id || index}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No course content available
                </div>
              )}
            </div>

            {/* Author Details */}
            <section className="mb-12 py-4">
              <h2 className="text-[28px] font-semibold mb-4">Author</h2>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image ||
                    `https://api.dicebear.com/5.x/initials/svg?seed=${instructorName}`
                  }
                  alt={`${instructorName} profile`}
                  className="h-14 w-14 rounded-full object-cover border-2 border-gray-600"
                  loading="lazy"
                />
                <p className="text-lg font-medium">{instructorName}</p>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {instructor?.additionalDetails?.about || "No additional information available about the instructor."}
              </p>
            </section>
        </div>
      </div>

      <Footer />

  {
    Confirmation && (
      <Confirmation
        modalData={Confirmation}
        isOpen={!!Confirmation}
        onClose={handleCloseModal}
      />
    )
  }
    </>
  )
}

export default CourseDetails