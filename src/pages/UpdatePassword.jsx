import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { resetPassword } from "../services/authApi"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const { loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  // Password strength indicator
  const getPasswordStrength = (password) => {
    if (password.length === 0) return { strength: 0, label: '', color: '' }
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' }
    if (password.length < 8) return { strength: 50, label: 'Fair', color: 'bg-yellow-500' }
    if (password.length < 12) return { strength: 75, label: 'Good', color: 'bg-blue-500' }
    return { strength: 100, label: 'Strong', color: 'bg-green-500' }
  }

  const passwordStrength = getPasswordStrength(password)
  const passwordsMatch = password && confirmPassword && password === confirmPassword

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-gradient-to-tl from-black via-black to-pink-700/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-600 border-t-yellow-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animate-reverse animation-delay-150"></div>
          </div>
          <p className="text-gray-300 text-lg font-medium animate-pulse">Updating your password...</p>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-lg mx-auto p-4">
          {/* Main card with glassmorphism */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Header section */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6-7V7a6 6 0 10-12 0v3H4a2 2 0 00-2 2v8a2 2 0 002 2h16a2 2 0 002-2v-8a2 2 0 00-2-2h-2zm-8 0V7a4 4 0 118 0v3H10z" />
                  </svg>
                </div>

              <h1 className="text-white font-bold text-3xl mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Choose New Password
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                Almost done. Enter your new password and you're all set.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleOnSubmit} className="space-y-6">
              {/* New Password Field */}
              <div className="space-y-2">
                <label className="relative">
                  <p className="mb-3 text-sm font-medium text-gray-300">
                    New Password <sup className="text-pink-400">*</sup>
                  </p>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      placeholder="Enter your new password"
                      className="w-full px-4 py-4 bg-gray-800/50 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-400 transition-all duration-200 focus:border-yellow-400 focus:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 hover:border-gray-500 hover:bg-gray-700/30 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={20} />
                      ) : (
                        <AiOutlineEye fontSize={20} />
                      )}
                    </button>
                  </div>
                </label>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Password Strength</span>
                      <span className={`text-xs font-medium ${passwordStrength.strength >= 75 ? 'text-green-400' : passwordStrength.strength >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="relative">
                  <p className="mb-3 text-sm font-medium text-gray-300">
                    Confirm New Password <sup className="text-pink-400">*</sup>
                  </p>
                  <div className="relative">
                    <input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleOnChange}
                      placeholder="Confirm your new password"
                      className={`w-full px-4 py-4 bg-gray-800/50 backdrop-blur-sm border-2 rounded-xl text-white placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 hover:bg-gray-700/30 pr-12 ${confirmPassword
                          ? passwordsMatch
                            ? 'border-green-500/50 focus:border-green-400 focus:ring-green-400/20'
                            : 'border-red-500/50 focus:border-red-400 focus:ring-red-400/20'
                          : 'border-gray-600/50 focus:border-yellow-400 focus:ring-yellow-400/20 hover:border-gray-500'
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible fontSize={20} />
                      ) : (
                        <AiOutlineEye fontSize={20} />
                      )}
                    </button>
                  </div>
                </label>

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div className="flex items-center space-x-2">
                    {passwordsMatch ? (
                      <>
                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-green-400">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs text-red-400">Passwords don't match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!password || !confirmPassword || !passwordsMatch || passwordStrength.strength < 50}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {password && confirmPassword && passwordsMatch && passwordStrength.strength >= 50
                  ? "Reset Password"
                  : "Please complete all fields"}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-700/50">
              <Link to="/login" className="group inline-flex">
                <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200">
                  <BiArrowBack className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                  <span className="font-medium">Back to Login</span>
                </div>
              </Link>
            </div>

            {/* Security Tips */}
            <div className="mt-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700/50">
              <h3 className="text-sm font-medium text-gray-300 mb-2">Password Security Tips:</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Use at least 8 characters</li>
                <li>• Include uppercase and lowercase letters</li>
                <li>• Add numbers and special characters</li>
                <li>• Avoid personal information</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <style >{`
        .animation-delay-150 {
          animation-delay: 150ms;
        }
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        .animate-reverse {
          animation-direction: reverse;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  )
}

export default UpdatePassword