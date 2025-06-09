/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { IoPlayCircleOutline, IoSaveOutline, IoEyeOutline, IoCreateOutline, IoAddCircleOutline } from "react-icons/io5"
import { HiOutlineVideoCamera } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/courseApi"
import { setCourse } from "../../../../../slices/courseSlice"

import Upload from "../Upload"

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  // console.log("view", view)
  // console.log("edit", edit)
  // console.log("add", add)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (view || edit) {
      // console.log("modalData", modalData)
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [])

  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true
    }
    return false
  }

  // handle the editing of subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    const formData = new FormData()
    // console.log("Values After Editing form values:", currentValues)
    formData.append("sectionId", modalData.sectionId)
    formData.append("subSectionId", modalData._id)
    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo)
    }
    setLoading(true)
    const result = await updateSubSection(formData, token)
    if (result) {
      // console.log("result", result)
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    // console.log(data)
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }
      return
    }

    const formData = new FormData()
    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("video", data.lectureVideo)
    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }

  // Get modal configuration based on mode
  const getModalConfig = () => {
    if (view) return {
      title: "Viewing Lecture",
      icon: IoEyeOutline,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-500/10"
    }
    if (edit) return {
      title: "Editing Lecture",
      icon: IoCreateOutline,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-500/10"
    }
    if (add) return {
      title: "Adding New Lecture",
      icon: IoAddCircleOutline,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10"
    }
    return { title: "Lecture", icon: IoPlayCircleOutline, color: "from-gray-500 to-gray-600" }
  }

  const modalConfig = getModalConfig()

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-auto bg-black/60 backdrop-blur-md p-4">
      <div
        className="relative w-full max-w-4xl transform transition-all duration-300 ease-out"
        style={{ animation: 'modalSlideIn 0.3s ease-out' }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl"></div>
        <div className={`absolute inset-0 rounded-2xl ${modalConfig.bgColor} opacity-20`}></div>

        {/* Modal Content */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/95 shadow-2xl backdrop-blur-xl">
          {/* Enhanced Header */}
          <div className={`relative overflow-hidden bg-gradient-to-r ${modalConfig.color} p-6`}>
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                  <modalConfig.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{modalConfig.title}</h2>
                  <p className="text-sm text-white/80">
                    {view ? "Review lecture content" : edit ? "Modify lecture details" : "Create new lecture content"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => (!loading ? setModalData(null) : {})}
                className="group rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-white/50"
                disabled={loading}
              >
                <RxCross2 className="h-6 w-6 text-white transition-transform duration-300" />
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5"></div>
            <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-white/5"></div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Video Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="rounded-lg bg-purple-500/20 p-2">
                    <HiOutlineVideoCamera className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-200">Lecture Video</h3>
                </div>
                <div className="rounded-xl border border-gray-700/50 bg-gray-750/30 p-6">
                  <Upload
                    name="lectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null}
                  />
                </div>
              </div>

              {/* Lecture Details */}
              <div className="grid gap-6 md:grid-cols-1">
                {/* Lecture Title */}
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-medium text-gray-200" htmlFor="lectureTitle">
                    Lecture Title
                    {!view && <sup className="ml-1 text-red-400">*</sup>}
                  </label>
                  <div className="relative">
                    <input
                      disabled={view || loading}
                      id="lectureTitle"
                      placeholder="Enter an engaging lecture title..."
                      {...register("lectureTitle", { required: true })}
                      className={`w-full rounded-xl border-2 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${errors.lectureTitle
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-600 hover:border-gray-500"
                        } ${view ? "cursor-not-allowed opacity-70" : ""} ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                    />
                    {loading && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                      </div>
                    )}
                  </div>
                  {errors.lectureTitle && (
                    <div className="flex items-center space-x-2 text-sm text-red-400">
                      <div className="h-1 w-1 rounded-full bg-red-400"></div>
                      <span>Lecture title is required</span>
                    </div>
                  )}
                </div>

                {/* Lecture Description */}
                <div className="space-y-3">
                  <label className="flex items-center text-sm font-medium text-gray-200" htmlFor="lectureDesc">
                    Lecture Description
                    {!view && <sup className="ml-1 text-red-400">*</sup>}
                  </label>
                  <div className="relative">
                    <textarea
                      disabled={view || loading}
                      id="lectureDesc"
                      placeholder="Describe what students will learn in this lecture..."
                      {...register("lectureDesc", { required: true })}
                      rows={5}
                      className={`w-full resize-none rounded-xl border-2 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${errors.lectureDesc
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "border-gray-600 hover:border-gray-500"
                        } ${view ? "cursor-not-allowed opacity-70" : ""} ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                    />
                  </div>
                  {errors.lectureDesc && (
                    <div className="flex items-center space-x-2 text-sm text-red-400">
                      <div className="h-1 w-1 rounded-full bg-red-400"></div>
                      <span>Lecture description is required</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {!view && (
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setModalData(null)}
                    disabled={loading}
                    className="rounded-xl border border-gray-600 bg-gray-700/50 px-6 py-3 font-medium text-gray-300 backdrop-blur-sm transition-all duration-300 hover:bg-gray-600/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${modalConfig.color} px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    <div className="flex items-center space-x-2">
                      {loading ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <IoSaveOutline className="h-5 w-5" />
                          <span>{edit ? "Save Changes" : "Create Lecture"}</span>
                        </>
                      )}
                    </div>
                    <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full"></div>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}