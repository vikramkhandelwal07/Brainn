import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline, IoBookOutline, IoCheckmarkCircle } from "react-icons/io5"
import { MdNavigateNext, MdArrowBack } from "react-icons/md"
import { HiOutlineAcademicCap } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/courseApi"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"
import NestedView from "./NestedView"

export default function CourseForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch()

  // handle form submission
  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data)
    console.log("Current course before API call:", course)

    setLoading(true)

    let result

    try {
      if (editSectionName) {
        result = await updateSection(
          {
            sectionName: data.sectionName,
            sectionId: editSectionName,
            courseId: course._id,
          },
          token
        )
        console.log("Update section result:", result)
      } else {
        result = await createSection(
          {
            sectionName: data.sectionName,
            courseId: course._id,
          },
          token
        )
        console.log("Create section result:", result)
      }

      if (result) {
        console.log("API call successful, updating Redux state")
        console.log("Result data structure:", JSON.stringify(result, null, 2))

        // The result should be the updated course object directly
        dispatch(setCourse(result))
        console.log("Redux state updated with:", result)

        setEditSectionName(null)
        setValue("sectionName", "")
        // Don't show success toast here since API already shows it
      } else {
        console.error("No result returned from API")
        toast.error("Failed to create section. Please try again.")
      }
    } catch (error) {
      console.error("Error in onSubmit:", error)
      toast.error("An error occurred. Please try again.")
    }

    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goToNext = () => {

    if (!course) {
      console.log("❌ No course object found")
      toast.error("Course data not found. Please refresh the page.")
      return
    }

    if (!course.courseContent || !Array.isArray(course.courseContent) || course.courseContent.length === 0) {
      console.log("❌ No sections found")
      toast.error("Please add atleast one section")
      return
    }

    // Check if any section has no subsections - Updated to match backend field name
    const sectionsWithoutLectures = course.courseContent.filter(
      (section) => !section.subSections || section.subSections.length === 0
    )

    console.log("Sections without lectures:", sectionsWithoutLectures)

    if (sectionsWithoutLectures.length > 0) {
      console.log("❌ Some sections don't have lectures")
      toast.error("Please add atleast one lecture in each section")
      return
    }

    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-4 shadow-lg">
              <HiOutlineAcademicCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-4xl font-bold text-transparent">
            Course Builder
          </h1>
          <p className="mt-2 text-gray-400">Structure your course with sections and lectures</p>
        </div>


        {/* Main Content Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/80 shadow-2xl backdrop-blur-sm">
          {/* Progress Indicator */}
          <div className="border-b border-gray-700/50 bg-gradient-to-r from-gray-800 to-gray-750 px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IoBookOutline className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">Step 2 of 3</span>
              </div>
              <div className="flex space-x-2">
                <div className="h-2 w-8 rounded-full bg-green-500"></div>
                <div className="h-2 w-8 rounded-full bg-blue-500"></div>
                <div className="h-2 w-8 rounded-full bg-gray-600"></div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-3">
                <label
                  className="flex items-center text-sm font-medium text-gray-200"
                  htmlFor="sectionName"
                >
                  Section Name
                  <sup className="ml-1 text-red-400">*</sup>
                </label>
                <div className="relative">
                  <input
                    id="sectionName"
                    disabled={loading}
                    placeholder="Enter section name (e.g., Introduction, Advanced Topics)"
                    {...register("sectionName", { required: true })}
                    className={`w-full rounded-xl border-2 bg-gray-700/50 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-blue-500 focus:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${errors.sectionName
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-600 hover:border-gray-500"
                      } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
                  />
                  {loading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                    </div>
                  )}
                </div>
                {errors.sectionName && (
                  <div className="flex items-center space-x-2 text-sm text-red-400">
                    <div className="h-1 w-1 rounded-full bg-red-400"></div>
                    <span>Section name is required</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${loading ? "cursor-not-allowed opacity-50" : ""
                    }`}
                >
                  <div className="flex items-center space-x-2">
                    {editSectionName ? (
                      <IoCheckmarkCircle className="h-5 w-5" />
                    ) : (
                      <IoAddCircleOutline className="h-5 w-5" />
                    )}
                    <span>{editSectionName ? "Update Section" : "Create Section"}</span>
                  </div>
                  <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full"></div>
                </button>


                {editSectionName && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded-xl border border-gray-600 bg-gray-700/50 px-4 py-3 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all duration-300 hover:bg-gray-600/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500/50"
                  >
                    Cancel Edit
                  </button>
                )}

              </div>
            </form>

            {/* Course Content */}
            {course?.courseContent?.length > 0 && (
              <div className="mt-8">
                <div className="mb-4 flex items-center space-x-2">
                  <div className="h-1 w-6 rounded bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <h3 className="text-lg font-semibold text-gray-200">Course Sections</h3>
                </div>
                <div className="rounded-xl border border-gray-700/50 bg-gray-750/30 p-4">
                  <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
                </div>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="border-t border-gray-700/50 bg-gray-800/50 px-8 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={goBack}
                className="group flex items-center space-x-2 rounded-xl border border-gray-600 bg-gray-700/50 px-6 py-3 font-semibold text-gray-300 backdrop-blur-sm transition-all duration-300 hover:bg-gray-600/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500/50"
              >
                <MdArrowBack className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span>Back</span>
              </button>

              <button
                onClick={goToNext}
                disabled={loading}
                className={`group flex items-center space-x-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${loading ? "cursor-not-allowed opacity-50" : ""
                  }`}
              >
                <span>Next Step</span>
                <MdNavigateNext className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            💡 Tip: Organize your course content into logical sections for better learning experience
          </p>
        </div>
      </div>
    </div>
  )
}