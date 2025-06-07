/* eslint-disable react-hooks/exhaustive-deps */
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

  const { courseId } = useParams()

  const [response, setResponse] = useState(null)
  const [courseLoading, setCourseLoading] = useState(true)
  const [confirmationModal, setConfirmationModal] = useState(null) // Fixed naming conflict
  const [isActive, setIsActive] = useState([])
  const [fetchError, setFetchError] = useState(null)

  // Generate gradient color based on thumbnail or random
  const [adaptiveGradientColor, setAdaptiveGradientColor] = useState("via-pink-800")

  // Function to extract dominant color from image
  const extractDominantColor = useCallback((imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data

          // Color frequency map
          const colorMap = {}

          // Sample pixels (every 10th pixel for performance)
          for (let i = 0; i < data.length; i += 40) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]
            const alpha = data[i + 3]

            // Skip transparent pixels and very dark/light pixels
            if (alpha < 128 || (r + g + b) < 50 || (r + g + b) > 650) continue

            // Group similar colors (reduce precision)
            const key = `${Math.floor(r / 30)}-${Math.floor(g / 30)}-${Math.floor(b / 30)}`
            colorMap[key] = (colorMap[key] || 0) + 1
          }

          // Find most frequent color
          let dominantColor = null
          let maxCount = 0

          for (const [colorKey, count] of Object.entries(colorMap)) {
            if (count > maxCount) {
              maxCount = count
              const [r, g, b] = colorKey.split('-').map(x => parseInt(x) * 30)
              dominantColor = { r, g, b }
            }
          }

          resolve(dominantColor)
        } catch (error) {
          console.log('Color extraction failed:', error)
          resolve(null)
        }
      }

      img.onerror = () => resolve(null)
      img.src = imageUrl
    })
  }, [])

  // Function to map RGB to closest Tailwind color
  const mapToTailwindColor = useCallback((rgb) => {
    if (!rgb) return 'via-pink-800'

    const { r, g, b } = rgb

    // Color mapping based on dominant channel and saturation
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const saturation = max === 0 ? 0 : (max - min) / max

    // If very low saturation, use neutral colors
    if (saturation < 0.3) {
      return 'via-gray-800'
    }

    // Determine dominant color channel
    if (r > g && r > b) {
      // Red dominant
      if (g > b * 1.2) return 'via-orange-800'
      if (b > g * 1.2) return 'via-pink-800'
      return 'via-red-800'
    } else if (g > b) {
      // Green dominant
      if (r > b * 1.2) return 'via-yellow-800'
      if (b > r * 1.1) return 'via-teal-800'
      return 'via-green-800'
    } else {
      // Blue dominant
      if (r > g * 1.2) return 'via-purple-800'
      if (g > r * 1.1) return 'via-cyan-800'
      return 'via-blue-800'
    }
  }, [])

  // Effect to extract color from thumbnail when available
  useEffect(() => {
    const processImage = async () => {
      if (response?.data?.thumbnail) {
        try {
          const dominantColor = await extractDominantColor(response.data.thumbnail)
          const tailwindColor = mapToTailwindColor(dominantColor)
          setAdaptiveGradientColor(tailwindColor)
        } catch (error) {
          console.log('Failed to extract color from thumbnail:', error)
          // Fallback to random color
          const fallbackColors = [
            'via-pink-800', 'via-purple-800', 'via-blue-800', 'via-indigo-800',
            'via-red-800', 'via-orange-800', 'via-green-800', 'via-teal-800'
          ]
          const randomColor = fallbackColors[Math.floor(Math.random() * fallbackColors.length)]
          setAdaptiveGradientColor(randomColor)
        }
      } else {
        // No thumbnail, use random color
        const fallbackColors = [
          'via-pink-800', 'via-purple-800', 'via-blue-800', 'via-indigo-800',
          'via-red-800', 'via-orange-800', 'via-green-800', 'via-teal-800'
        ]
        const randomColor = fallbackColors[Math.floor(Math.random() * fallbackColors.length)]
        setAdaptiveGradientColor(randomColor)
      }
    }

    if (response?.data) {
      processImage()
    }
  }, [response?.data?.thumbnail, extractDominantColor, mapToTailwindColor])

  // Fetch course details with error handling
  useEffect(() => {
    const fetchDetails = async () => {
      if (!courseId) return
      try {
        setFetchError(null)
        setCourseLoading(true)
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.error("Could not fetch Course Details:", error)
        setFetchError("Failed to load course details. Please try again.")
      } finally {
        setCourseLoading(false)
      }
    }

    fetchDetails()
  }, [courseId])

  console.log("response", response)

  const avgReviewCount = useMemo(() => {
    const reviews = response?.data?.ratingAndReviews || []; // Corrected path
    return GetAverageRating(reviews);
  }, [response?.data?.ratingAndReviews]);

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  const totalNoOfLectures = useMemo(() => {
    const content = response?.data?.courseContent || []; // Corrected path
    return content.reduce((total, section) => {
      return total + (section.subSection?.length || 0);
    }, 0);
  }, [response?.data?.courseContent]);

  const handleCollapseAll = () => {
    setIsActive([])
  }

  // Loading states
  if (loading || courseLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (fetchError) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="text-center text-red-500">
          <p>{fetchError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!response || !response.data || !response.success) {
    return <Error />
  }

  // Safe destructuring after all checks
  const courseDetails = response.data
  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price = 0,
    whatWillYouLearn,
    courseContent = [],
    ratingAndReviews = [],
    instructor = {},
    studentsEnrolled = [],
    createdAt,
  } = courseDetails

  const instructorName = `${instructor?.firstName || ""} ${instructor?.lastName || ""}`.trim()

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => {
        setConfirmationModal(null)
        navigate("/login")
      },
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  console.log("CourseDetails response", response)

  return (
    <>
      <div className={`relative w-full bg-gradient-to-br from-gray-950 ${adaptiveGradientColor} to-black text-gray-100`}>
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
                <h1 className="text-6xl font-bold text-white sm:text-[42px] leading-tight">
                  {courseName}
                </h1>
              </div>

              <p className="text-gray-200 leading-relaxed">{courseDescription}</p>

              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25 font-semibold">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span className="text-gray-300">({ratingAndReviews.length} reviews)</span>
                <span className="text-gray-300">{studentsEnrolled.length} students enrolled</span>
              </div>

              <div className="flex flex-row gap-2 items-center">
                <p className="text-gray-300">Created By : </p>
                <p className="font-semibold text-white font-poppins mt-1 ">{instructorName}</p>
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
              setConfirmation={setConfirmationModal}
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
              <ReactMarkdown>{whatWillYouLearn}</ReactMarkdown>
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

      {confirmationModal && (
        <Confirmation
          modalData={confirmationModal}
        />
      )}
    </>
  )
}

export default CourseDetails