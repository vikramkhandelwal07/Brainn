import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../services/authApi"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-gradient-to-bl from-black via-black to-white/30 px-4 py-8 ">
      {loading ? (
        <div className="flex flex-col items-center ">
          <div className="spinner mb-4"></div>
          <p className="text-gray-300 text-sm">Processing your request...</p>
        </div>
      ) : (
        <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-md shadow-lg border-2 border-white/30  text-white rounded-2xl">
            <div className="px-8 py-10">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2v6m0 0V9a2 2 0 00-2-2M9 7a2 2 0 00-2 2v6a2 2 0 002 2h6M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7h6" />
                  </svg>
                </div>

                <h1 className="text-2xl font-bold text-white mb-2">
                  {!emailSent ? "Reset Your Password" : "Check Your Email"}
                </h1>

                <p className="text-gray-300 leading-relaxed">
                  {!emailSent
                    ? "Don't worry! Enter your email address and we'll send you instructions to reset your password."
                    : (
                      <>
                        We've sent password reset instructions to{" "}
                        <span className="font-medium text-white">{email}</span>
                      </>
                    )}
                </p>
              </div>

              <form onSubmit={handleOnSubmit} className="space-y-6">
                {!emailSent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-700 focus:bg-gray-600 text-white placeholder-gray-400"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-pink-800 hover:outline-white hover:outline-offset-2 hover:outline text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
                >
                  {!emailSent ? "Send Reset Instructions" : "Resend Email"}
                </button>
              </form>

              {emailSent && (
                <div className="mt-6 p-4 bg-green-900/30 border border-green-700 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-green-300">
                      Email sent successfully! Check your inbox and spam folder.
                    </p>
                  </div>
                </div>
              )}
            </div>

              <div className="px-8 py-6 bg-white/10 backdrop-blur-md shadow-lg   text-white rounded-2xl m-4 border-2 border-white/30">
              <Link to="/login" className="group">
                <div className="flex items-center justify-center text-gray-300 hover:text-white transition-colors duration-200">
                  <BiArrowBack className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                  <span className="font-medium">Back to Login</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Need help? <a href="#" className="text-white text-base hover:text-blue-300 font-medium">Contact Support</a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword