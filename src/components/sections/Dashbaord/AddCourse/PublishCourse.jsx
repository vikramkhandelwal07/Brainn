import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast";
import { editCourseDetails } from "../../../../services/courseApi"
import { resetCourseState, setStep } from "../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../utils/Constants"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      public: false
    }
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  // Watch the public field to trigger re-renders when it changes
  const isPublic = watch("public")

  useEffect(() => {
    console.log("🔍 Course data loaded:", course)
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    } else {
      setValue("public", false)
    }
  }, [course?.status, setValue, course])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    console.log("🚀 handleCoursePublish called")
    console.log("📊 Current form values:", getValues())
    console.log("📚 Current course status:", course?.status)
    console.log("🔄 Public checkbox value:", getValues("public"))
    console.log("🆔 Course ID:", course?._id)

    // Add validation for required data
    if (!course?._id) {
      console.error("❌ Course ID is missing")
      toast.error("Error: Course ID is missing. Please try refreshing the page.")
      return
    }

    if (!token) {
      console.error("❌ Authentication token is missing")
      toast.error("Error: Please log in again.")
      return
    }

    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      console.log("ℹ️ No changes detected, navigating to courses")
      goToCourses()
      return
    }

    console.log("🔄 Changes detected, updating course...")

    // FIX: Send as JSON object instead of FormData
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    const updateData = {
      courseId: course._id,
      status: courseStatus
    }

    console.log("📤 Sending request with status:", courseStatus)
    console.log("📤 Update data:", updateData)

    setLoading(true)
    try {
      const result = await editCourseDetails(updateData, token)
      console.log("✅ Course update result:", result)

      if (result) {
        console.log("✅ Success! Navigating to courses...")
        goToCourses()
      } else {
        console.error("❌ No result returned from editCourseDetails")
        toast.error("Failed to update course. Please try again.")
      }
    } catch (error) {
      console.error("💥 Error updating course:", error)
      toast.error("An error occurred while updating the course.")
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (data) => {
    console.log("📝 Form submitted with data:", data)
    handleCoursePublish()
  }

  
  const handleToggleChange = (e) => {
    console.log("🔄 Toggle changed to:", e.target.checked)
    setValue("public", e.target.checked)
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm shadow-2xl">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-2xl"></div>

      <div className="relative p-8">
        

        {/* Header section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
              Publish Settings
            </h2>
          </div>
          <p className="text-slate-400 font-medium">Configure your course visibility and publication status</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Enhanced Checkbox Section */}
          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/30">
            <div className="flex items-start space-x-4">
              <div className="relative">
                <input
                  type="checkbox"
                  id="public"
                  {...register("public")}
                  onChange={handleToggleChange}
                  className="peer sr-only"
                />
                <label
                  htmlFor="public"
                  className={`relative flex h-6 w-11 cursor-pointer items-center rounded-full px-0.5 transition-all duration-300 ${isPublic
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25'
                    : 'bg-slate-600 hover:bg-slate-500'
                    } peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green-500`}
                >
                  <span className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${isPublic ? 'translate-x-5' : 'translate-x-0'
                    }`}></span>
                </label>
              </div>

              <div className="flex-1">
                <label htmlFor="public" className="cursor-pointer">
                  <h3 className="text-lg font-semibold text-slate-200 mb-1">
                    Make Course Public
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    When enabled, your course will be visible to all users and can be enrolled by students.
                    Disable to keep it as a draft.
                  </p>
                </label>
              </div>

              {/* Status indicator */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isPublic
                  ? 'bg-green-500 animate-pulse'
                  : 'bg-yellow-500'
                  }`}></div>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                  {isPublic ? 'Will be Published' : 'Will be Draft'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6">
            <button
              disabled={loading}
              type="button"
              onClick={goBack}
              className="group flex items-center space-x-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>

            <div className="flex items-center space-x-3">
              {loading && (
                <div className="flex items-center space-x-2 text-slate-400">
                  <div className="w-4 h-4 border-2 border-slate-400/30 border-t-slate-400 rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">Saving...</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}