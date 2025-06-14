import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Github, Linkedin, Twitter } from "lucide-react"

import { formattedDate } from "../../../utils/DateFormat"
import IconButton from "../../common/IconButton"

export default function MyProfile() {
  const { user } = useSelector((state) => state.userProfile)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-tl from-gray-700 via-gray-700 to-gray-600 p-3 sm:p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-violet-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="w-1.5 sm:w-2 h-20 sm:h-28 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/25"></div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-2 py-2 sm:py-4">
                My Profile
              </h1>
              <p className="text-slate-400 text-sm sm:text-base lg:text-lg">Manage your personal information and preferences</p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="mb-8 sm:mb-10 group">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/30 bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:border-slate-600/50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-6 sm:p-8 lg:p-10 relative">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 sm:justify-between">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full sm:w-auto">
                  <div className="relative group/avatar mx-auto sm:mx-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl blur opacity-75 group-hover/avatar:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={user?.image}
                      alt={`profile-${user?.firstName}`}
                      className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl sm:rounded-3xl object-cover ring-2 ring-white/20 shadow-2xl transform group-hover/avatar:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 border-2 sm:border-4 border-slate-800 shadow-lg animate-pulse"></div>
                  </div>
                  <div className="space-y-2 sm:space-y-3 text-center sm:text-left w-full sm:w-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                      {user?.firstName + " " + user?.lastName}
                    </h2>
                    <p className="text-slate-300 font-medium text-base sm:text-lg flex items-center justify-center sm:justify-start gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="break-all">{user?.email}</span>
                    </p>
                  </div>
                </div>
                <div className="transform hover:scale-105 transition-transform duration-200 w-full sm:w-auto">
                  <IconButton
                    text="Edit"
                    variant="secondary"
                    onclick={() => {
                      navigate("/dashboard/settings")
                    }}
                  >
                    <RiEditBoxLine />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8 sm:mb-10 group">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/30 bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-slate-600/50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 to-cyan-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-6 sm:p-8 lg:p-10 relative">
              <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-1 sm:w-1.5 h-8 sm:h-10 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/25"></div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">About</h3>
                </div>
                <div className="transform hover:scale-105 transition-transform duration-200 w-full sm:w-auto">
                  <IconButton
                    text="Edit"
                    variant="secondary"
                    onclick={() => {
                      navigate("/dashboard/settings")
                    }}
                  >
                    <RiEditBoxLine />
                  </IconButton>
                </div>
              </div>
              <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-6 sm:p-8 border border-slate-700/20 hover:border-slate-600/30 transition-colors duration-300 shadow-inner">
                <p
                  className={`${user?.additionalInfo?.about
                    ? "text-slate-200"
                    : "text-slate-400 italic"
                    } text-base sm:text-lg leading-relaxed`}
                >
                  {user?.additionalInfo?.about ?? "Write Something About Yourself"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="mb-8 sm:mb-10 group">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/30 bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl shadow-xl hover:shadow-purple-500/10 transition-all duration-500 hover:border-slate-600/50">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/3 to-pink-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-6 sm:p-8 lg:p-10 relative">
              <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-10">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-1 sm:w-1.5 h-8 sm:h-10 bg-gradient-to-b from-purple-400 via-pink-500 to-rose-500 rounded-full shadow-lg shadow-purple-500/25"></div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">Personal Details</h3>
                </div>
                <div className="transform hover:scale-105 transition-transform duration-200 w-full sm:w-auto">
                  <IconButton
                    variant="secondary"
                    text="Edit"
                    onclick={() => {
                      navigate("/dashboard/settings")
                    }}
                  >
                    <RiEditBoxLine />
                  </IconButton>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-4xl">
                {/* Left Column */}
                <div className="space-y-6 sm:space-y-8">
                  <div className="group/field">
                    <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-3 sm:h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                      First Name
                    </label>
                    <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-4 sm:p-6 border border-slate-700/20 group-hover/field:border-slate-600/40 transition-all duration-300 shadow-inner hover:shadow-blue-500/5">
                      <p className="text-base sm:text-lg font-semibold text-white">
                        {user?.firstName}
                      </p>
                    </div>
                  </div>

                  <div className="group/field">
                    <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-3 sm:h-4 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                      Email
                    </label>
                    <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-4 sm:p-6 border border-slate-700/20 group-hover/field:border-slate-600/40 transition-all duration-300 shadow-inner hover:shadow-green-500/5">
                      <p className="text-base sm:text-lg font-semibold text-white break-all">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="group/field">
                    <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-3 sm:h-4 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
                      Gender
                    </label>
                    <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-4 sm:p-6 border border-slate-700/20 group-hover/field:border-slate-600/40 transition-all duration-300 shadow-inner hover:shadow-purple-500/5">
                      <p className={`text-base sm:text-lg font-semibold ${user?.additionalInfo?.gender ? "text-white" : "text-slate-400 italic"
                        }`}>
                        {user?.additionalInfo?.gender ?? "Add Gender"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 sm:space-y-8">
                  <div className="group/field">
                    <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-3 sm:h-4 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-full"></div>
                      Last Name
                    </label>
                    <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-4 sm:p-6 border border-slate-700/20 group-hover/field:border-slate-600/40 transition-all duration-300 shadow-inner hover:shadow-cyan-500/5">
                      <p className="text-base sm:text-lg font-semibold text-white">
                        {user?.lastName}
                      </p>
                    </div>
                  </div>

                  <div className="group/field">
                    <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-3 sm:h-4 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
                      Phone Number
                    </label>
                    <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-4 sm:p-6 border border-slate-700/20 group-hover/field:border-slate-600/40 transition-all duration-300 shadow-inner hover:shadow-orange-500/5">
                      <p className={`text-base sm:text-lg font-semibold ${user?.additionalInfo?.contactNumber ? "text-white" : "text-slate-400 italic"
                        }`}>
                        {user?.additionalInfo?.contactNumber ?? "Add Contact Number"}
                      </p>
                    </div>
                  </div>

                  <div className="group/field">
                    <label className="block text-xs sm:text-sm font-bold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wider flex items-center gap-2">
                      <div className="w-1 h-3 sm:h-4 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full"></div>
                      Date Of Birth
                    </label>
                    <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-4 sm:p-6 border border-slate-700/20 group-hover/field:border-slate-600/40 transition-all duration-300 shadow-inner hover:shadow-pink-500/5">
                      <p className={`text-base sm:text-lg font-semibold ${user?.additionalInfo?.dateOfBirth ? "text-white" : "text-slate-400 italic"
                        }`}>
                        {formattedDate(user?.additionalInfo?.dateOfBirth) ??
                          "Add Date Of Birth"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="group">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-700/30 bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/90 backdrop-blur-xl shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 hover:border-slate-600/50">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/3 to-blue-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="p-6 sm:p-8 lg:p-10 relative">
              <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-10">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-1 sm:w-1.5 h-8 sm:h-10 bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500 rounded-full shadow-lg shadow-cyan-500/25"></div>
                  <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">Social Links</h3>
                </div>
                <div className="transform hover:scale-105 transition-transform duration-200 w-full sm:w-auto">
                  <IconButton
                    variant="secondary"
                    text="Edit"
                    onclick={() => {
                      navigate("/dashboard/settings")
                    }}
                  >
                    <RiEditBoxLine />
                  </IconButton>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-4xl">
                {/* GitHub */}
                <div className="group/social">
                  <label className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wider">
                    <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg">
                      <Github className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    GitHub Profile
                  </label>
                  <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-4 sm:p-6 border border-slate-700/20 group-hover/social:border-slate-600/40 transition-all duration-300 shadow-inner hover:shadow-gray-500/5">
                    {user?.additionalInfo?.socialLinks?.github ? (
                      <a
                        href={user.additionalInfo.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base sm:text-lg font-semibold text-white hover:text-gray-300 transition-colors break-all hover:underline"
                      >
                        {user.additionalInfo.socialLinks.github}
                      </a>
                    ) : (
                      <p className="text-base sm:text-lg font-semibold text-slate-400 italic">
                        Add GitHub Profile
                      </p>
                    )}
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="group/social">
                  <label className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wider">
                    <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg">
                      <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    LinkedIn Profile
                  </label>
                  <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-4 sm:p-6 border border-slate-700/20 group-hover/social:border-slate-600/40 transition-all duration-300 shadow-inner hover:shadow-blue-500/5">
                    {user?.additionalInfo?.socialLinks?.linkedin ? (
                      <a
                        href={user.additionalInfo.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base sm:text-lg font-semibold text-white hover:text-blue-300 transition-colors break-all hover:underline"
                      >
                        {user.additionalInfo.socialLinks.linkedin}
                      </a>
                    ) : (
                      <p className="text-base sm:text-lg font-semibold text-slate-400 italic">
                        Add LinkedIn Profile
                      </p>
                    )}
                  </div>
                </div>

                {/* Twitter */}
                <div className="group/social lg:col-span-2">
                  <label className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-300 mb-3 sm:mb-4 uppercase tracking-wider">
                    <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 shadow-lg">
                      <Twitter className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    Twitter Profile
                  </label>
                  <div className="rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 p-4 sm:p-6 border border-slate-700/20 group-hover/social:border-slate-600/40 transition-all duration-300 shadow-inner hover:shadow-sky-500/5">
                    {user?.additionalInfo?.socialLinks?.twitter ? (
                      <a
                        href={user.additionalInfo.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base sm:text-lg font-semibold text-white hover:text-sky-300 transition-colors break-all hover:underline"
                      >
                        {user.additionalInfo.socialLinks.twitter}
                      </a>
                    ) : (
                      <p className="text-base sm:text-lg font-semibold text-slate-400 italic">
                        Add Twitter Profile
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}