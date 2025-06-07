import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import { deleteProfile } from "../../../../services/settingsApi"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDeleteAccount() {
    try {
      setIsDeleting(true)
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setIsDeleting(false)
    }
  }

  return (
    <div className="relative">
      {/* Main Delete Account Card */}
      <div className="group relative overflow-hidden rounded-2xl border-2 border-red-500/30 bg-gradient-to-br from-red-950/50 via-red-900/30 to-red-950/50 backdrop-blur-sm shadow-2xl transition-all duration-300 hover:border-red-400/50 hover:shadow-red-500/20">
        {/* Animated Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Warning Banner */}
        <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 px-6 py-2 border-b border-red-500/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-red-300 uppercase tracking-wider">
              Danger Zone
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Icon Section */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-600/20 to-red-700/20 border border-red-500/30 shadow-lg">
                  <FiTrash2 className="text-2xl text-red-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  Delete Account
                  <span className="text-red-400 text-lg">⚠️</span>
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
              </div>

              <div className="space-y-3 text-gray-300">
                <p className="text-lg font-medium text-red-200">
                  Are you sure you want to delete your account?
                </p>
                <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-4 space-y-2">
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold text-red-300">⚠️ Warning:</span> This action is permanent and cannot be undone.
                  </p>
                  <p className="text-sm leading-relaxed">
                    Your account may contain paid courses and personal data. Deleting your account will permanently remove:
                  </p>
                  <ul className="text-sm space-y-1 ml-4 text-gray-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      All purchased courses and progress
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      Personal profile information
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      Account settings and preferences
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                      All associated content and data
                    </li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4">
                {!showConfirmation ? (
                  <button
                    type="button"
                    onClick={() => setShowConfirmation(true)}
                    className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    <FiTrash2 className="group-hover/btn:rotate-12 transition-transform duration-200" />
                    I want to delete my account
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-red-900/40 border border-red-500/30 rounded-xl p-4">
                      <p className="text-red-200 font-medium mb-3 flex items-center gap-2">
                        <span className="text-xl">🚨</span>
                        Final Confirmation Required
                      </p>
                      <p className="text-sm text-gray-300 mb-4">
                        This action cannot be reversed. Are you absolutely sure?
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-red-800 disabled:to-red-900 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                          {isDeleting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Deleting...
                            </>
                          ) : (
                            <>
                              <FiTrash2 />
                              Yes, Delete Forever
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowConfirmation(false)}
                          disabled={isDeleting}
                          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle warning indicators */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-red-400 rounded-full animate-pulse delay-500"></div>
    </div>
  )
}