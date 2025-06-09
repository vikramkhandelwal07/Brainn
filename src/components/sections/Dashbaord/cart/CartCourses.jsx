import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BookOpen, Clock, Users, Tag } from "lucide-react"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"

export default function CartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-1 flex-col space-y-6">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/95 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/3 to-pink-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative p-8">
            <div className="flex w-full flex-wrap items-start justify-between gap-8">
              {/* Course Content */}
              <div className="flex flex-1 flex-col gap-6 xl:flex-row min-w-0">
                {/* Course Image */}
                <div className="relative group/image flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="relative h-[160px] w-[240px] rounded-2xl object-cover shadow-lg ring-2 ring-slate-700/50 group-hover/image:ring-slate-600/70 transition-all duration-300 transform group-hover/image:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>

                  {/* Course Type Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-sm border border-white/20">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3 text-white" />
                      <span className="text-xs font-semibold text-white">Course</span>
                    </div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="flex flex-col justify-between flex-1 min-w-0 space-y-4">
                  {/* Course Title & Category */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white leading-tight line-clamp-2 group-hover:text-blue-200 transition-colors duration-300">
                      {course?.courseName}
                    </h3>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/50 border border-slate-700/30">
                        <Tag className="w-3 h-3 text-purple-400" />
                        <span className="text-sm font-medium text-slate-300">
                          {course?.category?.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Section */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-700/30">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-yellow-400">4.5</span>
                        <div className="flex">
                          <ReactStars
                            count={5}
                            value={4.5}
                            size={18}
                            edit={false}
                            activeColor="#fbbf24"
                            emptyIcon={<FaStar />}
                            fullIcon={<FaStar />}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-px h-6 bg-slate-600"></div>

                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {course?.ratingAndReviews?.length || 0} Reviews
                      </span>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>Self-paced</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>Lifetime Access</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex flex-col items-end space-y-6 flex-shrink-0">
                {/* Remove Button */}
                <button
                  onClick={() => dispatch(removeFromCart(course._id))}
                  className="group/btn flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 text-red-400 hover:text-red-300 transition-all duration-300 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20"
                >
                  <RiDeleteBin6Line className="w-4 h-4 group-hover/btn:animate-pulse" />
                  <span className="font-medium">Remove</span>
                </button>

                {/* Price */}
                <div className="text-right space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400 line-through">
                      ₹{Math.round(course?.price * 1.3).toLocaleString('en-IN')}
                    </span>
                    <div className="px-2 py-1 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                      <span className="text-xs font-semibold text-green-400">
                        23% OFF
                      </span>
                    </div>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                    ₹{course?.price?.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-slate-400">
                    Best Price Guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Border for separation */}
          {indx !== cart.length - 1 && (
            <div className="mx-8 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"></div>
          )}
        </div>
      ))}
    </div>
  )
}