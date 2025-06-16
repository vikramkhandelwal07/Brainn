import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { User, Calendar, Phone, FileText, Users, Github, Linkedin, Twitter, Link2 } from "lucide-react"
import { updateProfile } from "../../../../services/settingsApi"
import IconButton from "../../../common/IconButton"

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.userProfile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitProfileForm = async (data) => {
    const cleanData = (obj) => {
      const cleaned = {};
      Object.keys(obj).forEach(key => {
        if (obj[key] !== "" && obj[key] !== null && obj[key] !== undefined) {
          if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            const cleanedNested = cleanData(obj[key]);
            if (Object.keys(cleanedNested).length > 0) {
              cleaned[key] = cleanedNested;
            }
          } else {
            cleaned[key] = obj[key];
          }
        }
      });
      return cleaned;
    }

    console.log("User before update:", user);
    console.log("Form data received:", data);

    const updatedData = cleanData({
      firstName: data.firstName,
      lastName: data.lastName,
      about: data.about,
      contactNumber: data.contactNumber,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
      location: data.location,
      socialLinks: {
        github: data.github,
        linkedin: data.linkedin,
        twitter: data.twitter,
      },
    });

    console.log("Cleaned data to send:", updatedData);

    try {
      console.log("Dispatching updateProfile action...");
      await dispatch(updateProfile(token, updatedData))

      // Check user state after dispatch
      console.log("User after update dispatch:", user);

      // Add a small delay to ensure state update completes
      setTimeout(() => {
        console.log("Navigating to profile page...");
        navigate("/dashboard/my-profile")
      }, 200);

    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-6">
      <form onSubmit={handleSubmit(submitProfileForm)} className="space-y-6">
        {/* Profile Information Card */}
        <div className=" group relative overflow-hidden rounded-xl sm:rounded-2xl border border-purple-500/20 bg-gradient-to-br from-gray-800/90 via-gray-700/90 to-gray-800/90 backdrop-blur-sm shadow-lg sm:shadow-2xl transition-all duration-300 hover:border-purple-400/30 hover:shadow-purple-500/10">
          {/* Animated Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl"></div>

          {/* Card Content */}
          <div className="relative p-6 sm:p-8 space-y-6 sm:space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg sm:rounded-xl border border-purple-500/20">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Personal Information</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Update your basic details</p>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="firstName" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                    First Name
                  </label>
                  <div className="relative group/input">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter your first name"
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-gray-700/40 border border-gray-600/50 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-gray-700/60 hover:border-gray-500/70 group-hover/input:shadow-md sm:group-hover/input:shadow-lg"
                      {...register("firstName", { required: true })}
                      defaultValue={user?.firstName}
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.firstName && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-900/20 border border-red-500/20 px-2 py-1 sm:px-3 sm:py-2 rounded-md sm:rounded-lg">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                      Please enter your first name.
                    </div>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="lastName" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full"></div>
                    Last Name
                  </label>
                  <div className="relative group/input">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter your last name"
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-gray-700/40 border border-gray-600/50 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 hover:bg-gray-700/60 hover:border-gray-500/70 group-hover/input:shadow-md sm:group-hover/input:shadow-lg"
                      {...register("lastName", { required: true })}
                      defaultValue={user?.lastName}
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.lastName && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-900/20 border border-red-500/20 px-2 py-1 sm:px-3 sm:py-2 rounded-md sm:rounded-lg">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                      Please enter your last name.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200/30"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 py-1 text-xs sm:text-sm sm:px-4 sm:py-2 rounded-full bg-white/60 text-black">Additional Details</span>
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="space-y-6">
              {/* Date of Birth and Gender */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="dateOfBirth" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    Date of Birth
                  </label>
                  <div className="relative group/input">
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-gray-700/40 border border-gray-600/50 rounded-lg sm:rounded-xl text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 transition-all duration-300 hover:bg-gray-700/60 hover:border-gray-500/70 group-hover/input:shadow-md sm:group-hover/input:shadow-lg"
                      {...register("dateOfBirth", {
                        required: {
                          value: true,
                          message: "Please enter your Date of Birth.",
                        },
                        max: {
                          value: new Date().toISOString().split("T")[0],
                          message: "Date of Birth cannot be in the future.",
                        },
                      })}
                      defaultValue={user?.additionalInfo?.dateOfBirth}
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.dateOfBirth && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-900/20 border border-red-500/20 px-2 py-1 sm:px-3 sm:py-2 rounded-md sm:rounded-lg">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                      {errors.dateOfBirth.message}
                    </div>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="gender" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                    Gender
                  </label>
                  <div className="relative group/input">
                    <select
                      name="gender"
                      id="gender"
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-gray-700/40 border border-gray-600/50 rounded-lg sm:rounded-xl text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300 hover:bg-gray-700/60 hover:border-gray-500/70 appearance-none cursor-pointer group-hover/input:shadow-md sm:group-hover/input:shadow-lg"
                      {...register("gender", { required: true })}
                      defaultValue={user?.additionalInfo?.gender}
                    >
                      <option value="" className="bg-gray-800">Select Gender</option>
                      {genders.map((ele, i) => {
                        return (
                          <option key={i} value={ele} className="bg-gray-800">
                            {ele}
                          </option>
                        )
                      })}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover/input:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.gender && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-900/20 border border-red-500/20 px-2 py-1 sm:px-3 sm:py-2 rounded-md sm:rounded-lg">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                      Please select your gender.
                    </div>
                  )}
                </div>
              </div>

              {/* Contact and About */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="contactNumber" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                    Contact Number
                  </label>
                  <div className="relative group/input">
                    <input
                      type="tel"
                      name="contactNumber"
                      id="contactNumber"
                      placeholder="Enter your contact number"
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-gray-700/40 border border-gray-600/50 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-400/50 transition-all duration-300 hover:bg-gray-700/60 hover:border-gray-500/70 group-hover/input:shadow-md sm:group-hover/input:shadow-lg"
                      {...register("contactNumber", {
                        required: {
                          value: true,
                          message: "Please enter your Contact Number.",
                        },
                        maxLength: { value: 12, message: "Invalid Contact Number" },
                        minLength: { value: 10, message: "Invalid Contact Number" },
                      })}
                      defaultValue={user?.additionalInfo?.contactNumber}
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500/5 to-amber-500/5 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.contactNumber && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-900/20 border border-red-500/20 px-2 py-1 sm:px-3 sm:py-2 rounded-md sm:rounded-lg">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                      {errors.contactNumber.message}
                    </div>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="about" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-teal-400" />
                    About Yourself
                  </label>
                  <div className="relative group/input">
                    <textarea
                      name="about"
                      id="about"
                      placeholder="Tell us about yourself..."
                      rows="4"
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-gray-700/40 border border-gray-600/50 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400/50 transition-all duration-300 hover:bg-gray-700/60 hover:border-gray-500/70 resize-none group-hover/input:shadow-md sm:group-hover/input:shadow-lg"
                      {...register("about", { required: true })}
                      defaultValue={user?.additionalInfo?.about}
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-teal-500/5 to-cyan-500/5 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.about && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-900/20 border border-red-500/20 px-2 py-1 sm:px-3 sm:py-2 rounded-md sm:rounded-lg">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                      Please enter your about section.
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200/30"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 py-1 text-xs sm:text-sm sm:px-4 sm:py-2 rounded-full bg-white/60 text-black">Social Links</span>
                </div>
              </div>

              {/* Social Links Section */}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="github" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
                    <Github className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    GitHub Profile
                  </label>
                  <div className="relative group/input">
                    <input
                      type="url"
                      name="github"
                      id="github"
                      placeholder="https://github.com/username"
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-gray-700/40 border border-gray-600/50 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-400/50 transition-all duration-300 hover:bg-gray-700/60 hover:border-gray-500/70 group-hover/input:shadow-md sm:group-hover/input:shadow-lg"
                      {...register("github", {
                        pattern: {
                          value: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
                          message: "Please enter a valid GitHub URL"
                        }
                      })}
                      defaultValue={user?.additionalInfo?.socialLinks?.github}
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-500/5 to-slate-500/5 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.github && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-900/20 border border-red-500/20 px-2 py-1 sm:px-3 sm:py-2 rounded-md sm:rounded-lg">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                      {errors.github.message}
                    </div>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="linkedin" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
                    <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                    LinkedIn Profile
                  </label>
                  <div className="relative group/input">
                    <input
                      type="url"
                      name="linkedin"
                      id="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-gray-700/40 border border-gray-600/50 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300 hover:bg-gray-700/60 hover:border-gray-500/70 group-hover/input:shadow-md sm:group-hover/input:shadow-lg"
                      {...register("linkedin", {
                        pattern: {
                          value: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
                          message: "Please enter a valid LinkedIn URL"
                        }
                      })}
                      defaultValue={user?.additionalInfo?.socialLinks?.linkedin}
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/5 to-sky-500/5 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.linkedin && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-900/20 border border-red-500/20 px-2 py-1 sm:px-3 sm:py-2 rounded-md sm:rounded-lg">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                      {errors.linkedin.message}
                    </div>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="twitter" className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-300">
                    <Twitter className="w-3 h-3 sm:w-4 sm:h-4 text-sky-400" />
                    Twitter Profile
                  </label>
                  <div className="relative group/input">
                    <input
                      type="url"
                      name="twitter"
                      id="twitter"
                      placeholder="https://twitter.com/username"
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-gray-700/40 border border-gray-600/50 rounded-lg sm:rounded-xl text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-400/50 transition-all duration-300 hover:bg-gray-700/60 hover:border-gray-500/70 group-hover/input:shadow-md sm:group-hover/input:shadow-lg"
                      {...register("twitter", {
                        pattern: {
                          value: /^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/,
                          message: "Please enter a valid Twitter URL"
                        }
                      })}
                      defaultValue={user?.additionalInfo?.socialLinks?.twitter}
                    />
                    <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-sky-500/5 to-cyan-500/5 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.twitter && (
                    <div className="flex items-center gap-2 text-xs text-red-400 bg-red-900/20 border border-red-500/20 px-2 py-1 sm:px-3 sm:py-2 rounded-md sm:rounded-lg">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                      {errors.twitter.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
          <button
            type="button"
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="h-[2.8rem] sm:h-[3.2rem] group relative overflow-hidden rounded-lg border-2 border-white bg-transparent hover:bg-gray-600 transition-all duration-300 px-4 sm:px-6 text-sm sm:text-base font-medium text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative">Cancel</span>
          </button>
          <div className="transform hover:scale-105 transition-transform duration-300">
            <IconButton type="submit" text="Save Changes" size="md sm:lg" fullWidth />
          </div>
        </div>
      </form>

      {/* Floating Status Indicators */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex gap-1 sm:gap-2">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
      </div>
    </div>
  )
}