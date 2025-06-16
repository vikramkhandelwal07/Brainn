/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback, useMemo } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/Confirmation"
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
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isActive, setIsActive] = useState([])
  const [fetchError, setFetchError] = useState(null)

  // Generate gradient color based on thumbnail or random
  const [adaptiveGradientColor, setAdaptiveGradientColor] = useState("via-black")

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
    const reviews = response?.data?.ratingAndReviews || [];
    return GetAverageRating(reviews);
  }, [response?.data?.ratingAndReviews]);

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  const formatDuration = (seconds) => {
    if (seconds <= 0) return "Duration not available";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${Math.floor(seconds)}s`;
    }
  };

  const totalNoOfLectures = useMemo(() => {
    const content = response?.data?.courseContent || [];
    return content.reduce((total, section) => {
      return total + (section.subSections?.length || 0);
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

  const totalDuration = courseContent.reduce((total, section) => {
    const sectionDuration = (section.subSections || []).reduce((subTotal, sub) => {
      return subTotal + parseFloat(sub.timeDuration || 0);
    }, 0);
    return total + sectionDuration;
  }, 0);

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
      {/* Hero Section with improved responsive design */}
      <div className={`relative w-full bg-gradient-to-br from-gray-950 ${adaptiveGradientColor} to-black text-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 py-8 lg:py-16 min-h-[500px] lg:min-h-[600px]">

            {/* Course Info - Better spacing and typography scaling */}
            <div className="flex flex-col justify-center space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  {courseName}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed max-w-2xl">
                  {courseDescription}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base">
                <span className="text-yellow-25 font-semibold">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                <span className="text-gray-300">({ratingAndReviews.length} reviews)</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">{studentsEnrolled.length} students</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
                <span className="text-gray-300">Created by:</span>
                <span className="font-semibold text-white">{instructorName}</span>
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base text-gray-300">
                <div className="flex items-center gap-2">
                  <BiInfoCircle className="text-blue-400 flex-shrink-0" />
                  <span>{createdAt ? formatDate(createdAt) : "Date not available"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineGlobeAlt className="text-green-400 flex-shrink-0" />
                  <span>English</span>
                </div>
              </div>
            </div>

            {/* Course Card - Better positioning and sizing */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl lg:sticky lg:top-8">
                <CourseDetailsCard
                  course={courseDetails}
                  setConfirmation={setConfirmationModal}
                  handleBuyCourse={handleBuyCourse}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with improved layout */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8 lg:space-y-12">

              {/* What will you learn section */}
              <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">What you'll learn</h2>
                <div className="prose prose-gray max-w-none text-sm sm:text-base lg:text-lg">
                  <ReactMarkdown>{whatWillYouLearn}</ReactMarkdown>
                </div>
              </section>

              {/* Course Content Section */}
              <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Course Content</h2>
                    <button
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base transition-colors duration-200"
                      onClick={handleCollapseAll}
                    >
                      Collapse all sections
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-4 text-sm sm:text-base text-gray-600">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {courseContent.length} section{courseContent.length !== 1 ? 's' : ''}
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {totalNoOfLectures} lecture{totalNoOfLectures !== 1 ? 's' : ''}
                    </span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {formatDuration(totalDuration)} total
                    </span>
                  </div>
                </div>

                {/* Course Details Accordion */}
                <div className="mt-6 space-y-2">
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
                    <div className="text-center py-12 text-gray-500">
                      <p>No course content available</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Author Details */}
              <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Instructor</h2>
                <div className="flex items-start gap-4 sm:gap-6">
                  <img
                    src={
                      instructor.image ||
                      `https://api.dicebear.com/5.x/initials/svg?seed=${instructorName}`
                    }
                    alt={`${instructorName} profile`}
                    className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full object-cover border-4 border-gray-100 flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{instructorName}</h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                      {instructor?.additionalInfo?.about || "No additional information available about the instructor."}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar for larger screens */}
            <div className="lg:col-span-1 hidden lg:block">
              <div className="sticky top-8 space-y-6">
                {/* Mobile course card shown here on larger screens as sidebar */}
                <div className="lg:hidden">
                  <CourseDetailsCard
                    course={courseDetails}
                    setConfirmation={setConfirmationModal}
                    handleBuyCourse={handleBuyCourse}
                  />
                </div>

                {/* Additional sidebar content can go here */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Highlights</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Mobile and TV access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {confirmationModal && (
        <ConfirmationModal
          modalData={confirmationModal}
        />
      )}
    </>
  )
}

export default CourseDetails