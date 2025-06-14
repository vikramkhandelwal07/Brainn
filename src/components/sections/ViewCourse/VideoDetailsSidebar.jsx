import { useEffect, useState } from "react"
import { ChevronDown, ArrowLeft, Star, BookOpen, CheckCircle, Clock, Play } from "lucide-react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const [isDataLoading, setIsDataLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    if (courseSectionData && courseSectionData.length > 0) {
      setIsDataLoading(false)
    } else {
      setIsDataLoading(true)
    }
  }, [courseSectionData])

  useEffect(() => {
    if (isDataLoading || !courseSectionData || courseSectionData.length === 0) {
      return
    }

    const setActiveStates = () => {
      try {
        const currentSectionIndx = courseSectionData.findIndex(
          (data) => data._id === sectionId
        )

        if (currentSectionIndx === -1) {
          console.warn("Section not found:", sectionId)
          return
        }

        const subSections = courseSectionData[currentSectionIndx]?.subSections ||
          courseSectionData[currentSectionIndx]?.subSections || []

        if (subSections.length === 0) {
          console.warn("No subsections found for section:", sectionId)
          return
        }

        const currentSubSectionIndx = subSections.findIndex((data) => data._id === subSectionId)

        if (currentSubSectionIndx === -1) {
          console.warn("SubSection not found:", subSectionId)
          return
        }

        const activeSubSectionId = subSections[currentSubSectionIndx]?._id

        setActiveStatus(courseSectionData[currentSectionIndx]?._id)
        setVideoBarActive(activeSubSectionId)

        console.log("Active states set:", {
          activeSection: courseSectionData[currentSectionIndx]?._id,
          activeSubSection: activeSubSectionId
        })
      } catch (error) {
        console.error("Error setting active states:", error)
      }
    }

    setActiveStates()
  }, [courseSectionData, courseEntireData, location.pathname, sectionId, subSectionId, isDataLoading])

  const calculateProgress = () => {
    if (!totalNoOfLectures || totalNoOfLectures === 0) return 0
    if (!completedLectures || completedLectures.length === 0) return 0
    return Math.round((completedLectures.length / totalNoOfLectures) * 100)
  }

  const getSectionProgress = (section) => {
    try {
      const subSections = section.subSections || section.subSection || []

      if (subSections.length === 0) return 0

      if (!completedLectures || completedLectures.length === 0) return 0

      const completedInSection = subSections.filter(sub =>
        completedLectures.includes(sub._id)
      ).length

      return Math.round((completedInSection / subSections.length) * 100)
    } catch (error) {
      console.error("Error calculating section progress:", error)
      return 0
    }
  }

  const handleVideoClick = (courseId, sectionId, subSectionId) => {
    try {
      setVideoBarActive(subSectionId)
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${subSectionId}`)
    } catch (error) {
      console.error("Error navigating to video:", error)
    }
  }

  const handleSectionToggle = (sectionId) => {
    setActiveStatus(activeStatus === sectionId ? "" : sectionId)
  }

  // Show loading state if course data is not loaded yet
  if (isDataLoading || !courseSectionData || courseSectionData.length === 0) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col bg-gray-900 border-r border-gray-700 shadow-xl">
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading sidebar...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col bg-gray-900 border-r border-gray-700 shadow-xl">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-6 border-b border-gray-600">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500 text-gray-200 hover:text-white transition-all duration-200 hover:scale-95"
            title="Back to courses"
          >
            <ArrowLeft size={20} />
          </button>
          {setReviewModal && (
            <button
              onClick={() => setReviewModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm"
            >
              <Star size={16} />
              Add Review
            </button>
          )}
        </div>

        {/* Course Info */}
        <div className="space-y-3">
          <h2 className="text-white font-bold text-lg leading-tight line-clamp-2">
            {courseEntireData?.courseName || "Course Name"}
          </h2>

          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300 flex items-center gap-1">
                <BookOpen size={14} />
                Progress
              </span>
              <span className="text-yellow-400 font-semibold">
                {completedLectures?.length || 0} / {totalNoOfLectures || 0}
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 text-center">
              {calculateProgress()}% Complete
            </p>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <div className="p-2">
          {courseSectionData.map((course, index) => {
            const sectionProgress = getSectionProgress(course)
            const isActive = activeStatus === course?._id
            const subSections = course.subSections || course.subSection || []

            return (
              <div
                key={course?._id || index}
                className="mb-2 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors duration-200"
              >
                {/* Section Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-750 transition-colors duration-200"
                  onClick={() => handleSectionToggle(course?._id)}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm mb-1 truncate">
                      {course?.sectionName}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Play size={12} />
                        {subSections.length} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle size={12} />
                        {sectionProgress}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    {sectionProgress === 100 && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle size={12} className="text-white" />
                      </div>
                    )}
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform duration-300 ${isActive ? "rotate-180" : "rotate-0"
                        }`}
                    />
                  </div>
                </div>

                {/* Section Progress Bar */}
                <div className="px-4 pb-2">
                  <div className="w-full bg-gray-700 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-400 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${sectionProgress}%` }}
                    />
                  </div>
                </div>

                {/* Sub Sections */}
                {isActive && (
                  <div className="border-t border-gray-700 bg-gray-850">
                    {subSections.map((topic, i) => {
                      const isCompleted = completedLectures?.includes(topic?._id)
                      const isCurrentVideo = videoBarActive === topic._id

                      return (
                        <div
                          key={topic?._id || i}
                          className={`flex items-center gap-3 p-3 mx-2 my-1 rounded-lg cursor-pointer transition-all duration-200 ${isCurrentVideo
                              ? "bg-yellow-500 text-gray-900 shadow-lg"
                              : "hover:bg-gray-700 text-gray-200"
                            }`}
                          onClick={() => handleVideoClick(
                            courseEntireData?._id,
                            course?._id,
                            topic?._id
                          )}
                        >
                          {/* Completion Checkbox */}
                          <div className={`flex-shrink-0 ${isCurrentVideo ? 'text-gray-900' : ''}`}>
                            {isCompleted ? (
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isCurrentVideo ? 'bg-gray-900' : 'bg-green-500'
                                }`}>
                                <CheckCircle size={12} className="text-white" />
                              </div>
                            ) : (
                              <div className={`w-5 h-5 rounded-full border-2 ${isCurrentVideo
                                  ? 'border-gray-900'
                                  : 'border-gray-500'
                                }`} />
                            )}
                          </div>

                          {/* Lesson Title */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${isCurrentVideo ? 'text-gray-900' : 'text-gray-200'
                              }`}>
                              {topic.title}
                            </p>
                            {topic.timeDuration && (
                              <div className="flex items-center gap-1 mt-1">
                                <Clock size={10} className={isCurrentVideo ? 'text-gray-900' : 'text-gray-500'} />
                                <span className={`text-xs ${isCurrentVideo ? 'text-gray-900' : 'text-gray-500'
                                  }`}>
                                  {topic.timeDuration}
                                </span>
                              </div>
                            )}
                            {isCurrentVideo && (
                              <div className="flex items-center gap-1 mt-1">
                                <div className="w-2 h-2 bg-gray-900 rounded-full animate-pulse" />
                                <span className="text-xs font-medium text-gray-900">
                                  Now Playing
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Play Icon for Current Video */}
                          {isCurrentVideo && (
                            <Play size={16} className="text-gray-900 flex-shrink-0" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="border-t border-gray-700 bg-gray-800 p-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-yellow-400">
              {completedLectures?.length || 0}
            </div>
            <div className="text-xs text-gray-400">Completed</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-blue-400">
              {(totalNoOfLectures || 0) - (completedLectures?.length || 0)}
            </div>
            <div className="text-xs text-gray-400">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  )
}