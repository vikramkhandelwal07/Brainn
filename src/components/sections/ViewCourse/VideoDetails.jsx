import React, { useEffect, useRef, useState } from "react"
import IconButton from "../../common/IconButton"
import { useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import ReactPlayer from "react-player"
import { Play, SkipBack, SkipForward, RotateCcw, CheckCircle, Clock, Eye } from "lucide-react"

import { markLectureAsComplete } from "../../../services/courseApi"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState(null)
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [watched, setWatched] = useState(0)
  const [isDataLoading, setIsDataLoading] = useState(true)

  // Function to update localStorage with completed lectures
  const updateLocalStorage = (newCompletedLectures) => {
    try {
      const existingData = localStorage.getItem(`course_${courseId}`)
      if (existingData) {
        const courseData = JSON.parse(existingData)
        courseData.completedVideos = newCompletedLectures
        courseData.timestamp = Date.now()
        localStorage.setItem(`course_${courseId}`, JSON.stringify(courseData))
        console.log("Updated localStorage with completed lectures:", newCompletedLectures)
      } else {
        // Create new localStorage entry if it doesn't exist
        const courseData = {
          completedVideos: newCompletedLectures,
          timestamp: Date.now()
        }
        localStorage.setItem(`course_${courseId}`, JSON.stringify(courseData))
        console.log("Created new localStorage entry with completed lectures:", newCompletedLectures)
      }
    } catch (storageError) {
      console.error("Error updating localStorage:", storageError)
    }
  }

  // Wait for course data to be loaded before proceeding
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

    const loadVideoData = async () => {
      if (!courseId || !sectionId || !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
        return
      }

      try {
        // Find the section
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )

        if (filteredData.length > 0) {
          // Handle both subSections and subSection property names
          const subSections = filteredData[0].subSections || filteredData[0].subSection || []

          if (subSections.length > 0) {
            const filteredVideoData = subSections.filter(
              (data) => data._id === subSectionId
            )

            if (filteredVideoData.length > 0) {
              setVideoData(filteredVideoData[0])
              console.log("Video data loaded:", filteredVideoData[0])
            } else {
              console.error("Video data not found for subSectionId:", subSectionId)
              setVideoData(null)
            }
          } else {
            console.error("No subsections found for sectionId:", sectionId)
            setVideoData(null)
          }
        } else {
          console.error("Section data not found for sectionId:", sectionId)
          setVideoData(null)
        }

        setPreviewSource(courseEntireData?.thumbnail || "")
        setVideoEnded(false)
        setProgress(0)
        setWatched(0)
      } catch (error) {
        console.error("Error loading video data:", error)
        setVideoData(null)
      }
    }

    loadVideoData()
  }, [courseSectionData, courseEntireData, location.pathname, courseId, sectionId, subSectionId, navigate, isDataLoading])

  const isFirstVideo = () => {
    if (!courseSectionData || !Array.isArray(courseSectionData) || courseSectionData.length === 0) {
      return false
    }

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndx === -1) {
      return false
    }

    const subSections = courseSectionData[currentSectionIndx]?.subSections ||
      courseSectionData[currentSectionIndx]?.subSection || []

    if (subSections.length === 0) {
      return false
    }

    const currentSubSectionIndx = subSections.findIndex(
      (data) => data._id === subSectionId
    )

    return currentSectionIndx === 0 && currentSubSectionIndx === 0
  }

  const goToNextVideo = () => {
    if (!courseSectionData || !Array.isArray(courseSectionData)) return

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndx === -1) return

    const subSections = courseSectionData[currentSectionIndx]?.subSections ||
      courseSectionData[currentSectionIndx]?.subSection || []

    if (subSections.length === 0) return

    const noOfSubsections = subSections.length
    const currentSubSectionIndx = subSections.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      // Move to next video in same section
      const nextSubSectionId = subSections[currentSubSectionIndx + 1]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      // Move to first video of next section
      if (currentSectionIndx + 1 < courseSectionData.length) {
        const nextSection = courseSectionData[currentSectionIndx + 1]
        const nextSectionSubSections = nextSection?.subSections || nextSection?.subSection || []

        if (nextSectionSubSections.length > 0) {
          const nextSectionId = nextSection._id
          const nextSubSectionId = nextSectionSubSections[0]._id
          navigate(
            `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
          )
        }
      }
    }
  }

  const isLastVideo = () => {
    if (!courseSectionData || !Array.isArray(courseSectionData) || courseSectionData.length === 0) {
      return false
    }

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndx === -1) {
      return false
    }

    const subSections = courseSectionData[currentSectionIndx]?.subSections ||
      courseSectionData[currentSectionIndx]?.subSection || []

    if (subSections.length === 0) {
      return false
    }

    const noOfSubsections = subSections.length
    const currentSubSectionIndx = subSections.findIndex(
      (data) => data._id === subSectionId
    )

    return (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    )
  }

  const goToPrevVideo = () => {
    if (!courseSectionData || !Array.isArray(courseSectionData)) return

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    if (currentSectionIndx === -1) return

    const subSections = courseSectionData[currentSectionIndx]?.subSections ||
      courseSectionData[currentSectionIndx]?.subSection || []

    if (subSections.length === 0) return

    const currentSubSectionIndx = subSections.findIndex(
      (data) => data._id === subSectionId
    )

    if (currentSubSectionIndx !== 0) {
      // Move to previous video in same section
      const prevSubSectionId = subSections[currentSubSectionIndx - 1]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      // Move to last video of previous section
      if (currentSectionIndx - 1 >= 0) {
        const prevSection = courseSectionData[currentSectionIndx - 1]
        const prevSectionSubSections = prevSection?.subSections || prevSection?.subSection || []

        if (prevSectionSubSections.length > 0) {
          const prevSectionId = prevSection._id
          const prevSubSectionLength = prevSectionSubSections.length
          const prevSubSectionId = prevSectionSubSections[prevSubSectionLength - 1]._id
          navigate(
            `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
          )
        }
      }
    }
  }

  const handleLectureCompletion = async () => {
    console.log("Token from Redux:", token);
    setLoading(true)

    try {
      // Optimistically update the UI first
      const newCompletedLectures = [...(completedLectures || []), subSectionId]
      const uniqueCompletedLectures = [...new Set(newCompletedLectures)]

      // Update Redux state immediately
      dispatch(updateCompletedLectures(subSectionId))

      // Update localStorage immediately
      updateLocalStorage(uniqueCompletedLectures)

      // Then make the API call
      const res = await markLectureAsComplete(
        { courseId: courseId, subSectionId: subSectionId },
        token
      )

      if (!res) {
        // If API call fails, we still keep the local update
        // but you might want to show a warning that it will sync later
        console.warn("API call failed, but lecture marked as complete locally")
      } else {
        console.log("Lecture marked as complete successfully in API")
      }

    } catch (error) {
      console.error("Error marking lecture as complete:", error)
      // Even if API fails, we keep the local update
      // You could implement a retry mechanism here
    } finally {
      setLoading(false)
    }
  }

  const handleProgress = (progressData) => {
    setProgress(progressData.played * 100)
    setWatched(progressData.playedSeconds)
  }

  const handleDuration = (duration) => {
    setDuration(duration)
  }

  const handleEnded = () => {
    setVideoEnded(true)
    setPlaying(false)
  }

  const handleRewatch = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0)
      setProgress(0)
      setWatched(0)
      setVideoEnded(false)
      setPlaying(true)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Check if current video is completed
  const isCompleted = completedLectures && completedLectures.includes(subSectionId)

  // Show loading state if course data is not loaded yet
  if (isDataLoading || !courseSectionData || courseSectionData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading course data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 text-white min-h-screen">
      {/* Video Player Container */}
      <div className="relative">
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
          {!videoData ? (
            <div className="relative aspect-video">
              <img
                src={previewSource}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <p className="text-lg font-medium">Video not found</p>
                  <p className="text-sm text-gray-400 mt-2">Please select a valid video from the sidebar</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative aspect-video">
              <ReactPlayer
                ref={playerRef}
                url={videoData?.videoUrl}
                width="100%"
                height="100%"
                playing={playing}
                controls={true}
                onProgress={handleProgress}
                onDuration={handleDuration}
                onEnded={handleEnded}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload'
                    }
                  }
                }}
              />

              {/* Video End Overlay */}
              {videoEnded && (
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-center z-50">
                  <div className="text-center p-8 max-w-md">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Video Completed!</h3>
                    <p className="text-gray-300 mb-8">Great job finishing this lesson.</p>

                    <div className="space-y-4">
                      {!isCompleted && (
                        <button
                          disabled={loading}
                          onClick={handleLectureCompletion}
                          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Marking Complete...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              Mark as Completed
                            </>
                          )}
                        </button>
                      )}

                      <button
                        disabled={loading}
                        onClick={handleRewatch}
                        className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700/50 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-5 h-5" />
                        Rewatch
                      </button>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mt-8">
                      {!isFirstVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToPrevVideo}
                          className="flex-1 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <SkipBack className="w-4 h-4" />
                          Previous
                        </button>
                      )}
                      {!isLastVideo() && (
                        <button
                          disabled={loading}
                          onClick={goToNextVideo}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          Next
                          <SkipForward className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {videoData && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-300">{formatTime(watched)}</span>
                <div className="flex-1 bg-gray-600 rounded-full h-1">
                  <div
                    className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-gray-300">{formatTime(duration)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Information */}
      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              {isCompleted && (
                <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Completed
                </div>
              )}
              <div className="flex items-center gap-2 bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                <Eye className="w-4 h-4" />
                {Math.round(progress)}% watched
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white leading-tight mb-3">
              {videoData?.title || "Select a video"}
            </h1>
            {duration > 0 && (
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <Clock className="w-4 h-4" />
                <span>{formatTime(duration)} duration</span>
              </div>
            )}
          </div>
        </div>

        {videoData?.description && (
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed text-lg">
              {videoData.description}
            </p>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-800">
          {!isFirstVideo() && (
            <button
              disabled={loading}
              onClick={goToPrevVideo}
              className="bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center gap-2"
            >
              <SkipBack className="w-4 h-4" />
              Previous Lesson
            </button>
          )}
          {!isLastVideo() && (
            <button
              disabled={loading}
              onClick={goToNextVideo}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200 flex items-center gap-2 ml-auto"
            >
              Next Lesson
              <SkipForward className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoDetails