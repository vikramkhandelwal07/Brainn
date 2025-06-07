import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/settingsApi"
import IconButton from "../../../common/IconButton"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitPasswordForm = async (data) => {
    // console.log("password Data - ", data)
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-600/50 bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl backdrop-blur-sm">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Update Password</h2>
          <p className="text-gray-400 text-sm">Keep your account secure with a strong password</p>
        </div>

        <form onSubmit={handleSubmit(submitPasswordForm)} className="space-y-8">
          {/* Password Fields Container */}
          <div className="space-y-6">
            {/* Current Password Field */}
            <div className="group">
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Enter your current password"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 group-hover:bg-gray-700/70 pr-12"
                  {...register("oldPassword", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showOldPassword ? (
                    <AiOutlineEyeInvisible fontSize={20} />
                  ) : (
                    <AiOutlineEye fontSize={20} />
                  )}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  Please enter your current password
                </p>
              )}
            </div>

            {/* New Password Field */}
            <div className="group">
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter your new password"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 group-hover:bg-gray-700/70 pr-12"
                  {...register("newPassword", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible fontSize={20} />
                  ) : (
                    <AiOutlineEye fontSize={20} />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                  Please enter your new password
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Password Requirements:</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li className="flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                  At least 8 characters long
                </li>
                <li className="flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                  Contains uppercase and lowercase letters
                </li>
                <li className="flex items-center">
                  <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
                  Includes numbers and special characters
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-600/50">
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-profile")}
              className="group relative overflow-hidden rounded-lg border-2 border-white bg-transparent hover:bg-gray-600 transition-all duration-300 py-3 px-6 font-medium text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="relative z-10 ">Cancel</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <div className="flex-1">
              <IconButton type="submit" text="Update Password" size="lg" />
            </div>
          </div>
        </form>

        {/* Security Tip */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            💡 Tip: Use a unique password that you don't use elsewhere
          </p>
        </div>
      </div>
    </div>
  )
}