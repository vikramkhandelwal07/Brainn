import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/courseApi"
import IconButton from "../../common/IconButton"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.userProfile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ratingChanged = (newRating) => {
    // console.log(newRating)
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-2xl border border-gray-600 bg-gray-900 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-gray-700 p-6 border-b border-gray-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm">★</span>
            </div>
            <p className="text-xl font-bold text-white">Share Your Experience</p>
          </div>
          <button
            onClick={() => setReviewModal(false)}
            className="p-2 rounded-full hover:bg-gray-600 transition-colors duration-200"
          >
            <RxCross2 className="text-2xl text-gray-300 hover:text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8">
          {/* User Info Section */}
          <div className="flex items-center gap-4 mb-8 p-4 rounded-xl bg-gray-800 border border-gray-700">
            <div className="relative">
              <img
                src={user?.image}
                alt={user?.firstName + " profile"}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-yellow-500"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                <span className="text-xs text-white font-bold">✓</span>
              </div>
            </div>
            <div>
              <p className="font-bold text-white text-lg">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Posting Publicly
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* Rating Section */}
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                How would you rate this course?
              </h3>
              <div className="flex justify-center p-4 rounded-xl bg-gray-800 border border-gray-700">
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={32}
                  activeColor="#ffd700"
                  color="#374151"
                />
              </div>
            </div>

            {/* Review Text Section */}
            <div className="space-y-3">
              <label
                className="block text-sm font-medium text-gray-300"
                htmlFor="courseExperience"
              >
                Share your detailed experience
                <sup className="text-red-400 ml-1">*</sup>
              </label>
              <div className="relative">
                <textarea
                  id="courseExperience"
                  placeholder="Tell others about your learning journey, what you liked, and what could be improved..."
                  {...register("courseExperience", { required: true })}
                  className="w-full min-h-[140px] p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-all duration-200 resize-none"
                />
              </div>
              {errors.courseExperience && (
                <div className="flex items-center gap-2 text-sm text-red-400">
                  <span className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center text-white text-xs">!</span>
                  Please share your experience to help others
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-xl transition-colors duration-200 border border-gray-600"
              >
                Cancel
              </button>
              <IconButton text="Publish Review" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}