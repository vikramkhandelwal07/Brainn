import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../../data/CountryCode.json"
import { apiConnector } from "../../../services/apiConnector"
import { contactusEndpoint } from "../../../services/api"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      // console.log("Email Res - ", res)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-black p-4 flex items-center justify-center rounded-r-2xl ">
      <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/30 p-8 max-w-2xl mx-auto w-[32rem] m-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Get In Touch
          </h2>
          <p className="text-gray-400">We'd love to hear from you. Send us a message!</p>
        </div>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(submitContactForm)}
        >
          {/* Name Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstname" className="block text-sm font-semibold text-gray-200">
                First Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter first name"
                className="w-full px-4 py-3 bg-gray-800/40 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-white placeholder-gray-400 backdrop-blur-sm hover:bg-gray-800/60"
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <span className="text-xs text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Please enter your first name.
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastname" className="block text-sm font-semibold text-gray-200">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter last name"
                className="w-full px-4 py-3 bg-gray-800/40 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-white placeholder-gray-400 backdrop-blur-sm hover:bg-gray-800/60"
                {...register("lastname")}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-200">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              className="w-full px-4 py-3 bg-gray-800/40 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-white placeholder-gray-400 backdrop-blur-sm hover:bg-gray-800/60"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-xs text-red-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Please enter your email address.
              </span>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="space-y-2">
            <label htmlFor="phonenumber" className="block text-sm font-semibold text-gray-200">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-3">
              <div className="w-32">
                <select
                  name="countrycode"
                  className="w-full px-3 py-3 bg-gray-800/40 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-white text-sm backdrop-blur-sm hover:bg-gray-800/60"
                  {...register("countrycode", { required: true })}
                >
                  {CountryCode.map((ele, i) => {
                    return (
                      <option key={i} value={ele.code} className="bg-gray-800 text-white">
                        {ele.code} - {ele.country}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="tel"
                  name="phonenumber"
                  id="phonenumber"
                  placeholder="12345 67890"
                  className="w-full px-4 py-3 bg-gray-800/40 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-white placeholder-gray-400 backdrop-blur-sm hover:bg-gray-800/60"
                  {...register("phoneNo", {
                    required: {
                      value: true,
                      message: "Please enter your phone number.",
                    },
                    maxLength: { value: 10, message: "Invalid phone number" },
                    minLength: { value: 10, message: "Invalid phone number" },
                  })}
                />
              </div>
            </div>
            {errors.phoneNo && (
              <span className="text-xs text-red-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.phoneNo.message}
              </span>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-200">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="6"
              placeholder="Enter your message here"
              className="w-full px-4 py-3 bg-gray-800/40 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-white placeholder-gray-400 resize-none backdrop-blur-sm hover:bg-gray-800/60"
              {...register("message", { required: true })}
            />
            {errors.message && (
              <span className="text-xs text-red-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Please enter your message.
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              disabled={loading}
              type="submit"
              className={`w-full bg-gradient-to-r from-yellow-600 via-pink-600 to-pruple-900 hover:from-yellow-700 hover:via-pink-700 hover:to-black text-white font-semibold py-3 px-6 rounded-lg shadow-2xl transition-all duration-300 transform ${!loading && "hover:scale-[1.02] hover:shadow-purple-500/25"
                } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 border border-purple-500/30`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message

                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactUsForm