import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../services/courseApi"
import { resetCourseState, setStep } from "../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../utils/Constants"
import IconButton from "../../../common/IconButton"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    console.log(data)
    handleCoursePublish()
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
                  className="peer sr-only"
                />
                <label
                  htmlFor="public"
                  className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-slate-600 px-0.5 transition-colors peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green-500"
                >
                  <span className="h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5"></span>
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
                <div className={`w-2 h-2 rounded-full ${course?.status === COURSE_STATUS.PUBLISHED
                    ? 'bg-green-500 animate-pulse'
                    : 'bg-yellow-500'
                  }`}></div>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                  {course?.status === COURSE_STATUS.PUBLISHED ? 'Published' : 'Draft'}
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

              <IconButton
                disabled={loading}
                text={
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Save Changes</span>
                  </div>
                }
                customClasses="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}