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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            My Profile
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>

        {/* Profile Card */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-800/60 backdrop-blur-sm shadow-2xl">
          <div className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="h-20 w-20 rounded-2xl object-cover ring-4 ring-slate-600/50 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-500 border-2 border-slate-800"></div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white">
                    {user?.firstName + " " + user?.lastName}
                  </h2>
                  <p className="text-slate-300 font-medium">{user?.email}</p>
                </div>
              </div>
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

        {/* About Section */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-800/60 backdrop-blur-sm shadow-xl">
          <div className="p-8">
            <div className="flex w-full items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-white">About</h3>
              </div>
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
            <div className="rounded-xl bg-slate-900/50 p-6 border border-slate-700/30">
              <p
                className={`${user?.additionalInfo?.about
                  ? "text-slate-200"
                  : "text-slate-400 italic"
                  } text-base leading-relaxed`}
              >
                {user?.additionalInfo?.about ?? "Write Something About Yourself"}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-800/60 backdrop-blur-sm shadow-xl">
          <div className="p-8">
            <div className="flex w-full items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-white">Personal Details</h3>
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                    First Name
                  </label>
                  <div className="rounded-xl bg-slate-900/50 p-4 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
                    <p className="text-base font-medium text-white">
                      {user?.firstName}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                    Email
                  </label>
                  <div className="rounded-xl bg-slate-900/50 p-4 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
                    <p className="text-base font-medium text-white break-all">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                    Gender
                  </label>
                  <div className="rounded-xl bg-slate-900/50 p-4 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
                    <p className={`text-base font-medium ${user?.additionalInfo?.gender ? "text-white" : "text-slate-400 italic"
                      }`}>
                      {user?.additionalInfo?.gender ?? "Add Gender"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                    Last Name
                  </label>
                  <div className="rounded-xl bg-slate-900/50 p-4 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
                    <p className="text-base font-medium text-white">
                      {user?.lastName}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <div className="rounded-xl bg-slate-900/50 p-4 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
                    <p className={`text-base font-medium ${user?.additionalInfo?.contactNumber ? "text-white" : "text-slate-400 italic"
                      }`}>
                      {user?.additionalInfo?.contactNumber ?? "Add Contact Number"}
                    </p>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                    Date Of Birth
                  </label>
                  <div className="rounded-xl bg-slate-900/50 p-4 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
                    <p className={`text-base font-medium ${user?.additionalInfo?.dateOfBirth ? "text-white" : "text-slate-400 italic"
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

        {/* Social Links Section */}
        <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-800/60 backdrop-blur-sm shadow-xl">
          <div className="p-8">
            <div className="flex w-full items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-white">Social Links</h3>
              </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {/* GitHub */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                  <Github className="w-4 h-4 text-gray-400" />
                  GitHub Profile
                </label>
                <div className="rounded-xl bg-slate-900/50 p-4 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
                  {user?.additionalInfo?.socialLinks?.github ? (
                    <a
                      href={user.additionalInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-white hover:text-gray-300 transition-colors break-all"
                    >
                      {user.additionalInfo.socialLinks.github}
                    </a>
                  ) : (
                    <p className="text-base font-medium text-slate-400 italic">
                      Add GitHub Profile
                    </p>
                  )}
                </div>
              </div>

              {/* LinkedIn */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                  <Linkedin className="w-4 h-4 text-blue-500" />
                  LinkedIn Profile
                </label>
                <div className="rounded-xl bg-slate-900/50 p-4 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
                  {user?.additionalInfo?.socialLinks?.linkedin ? (
                    <a
                      href={user.additionalInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-white hover:text-blue-300 transition-colors break-all"
                    >
                      {user.additionalInfo.socialLinks.linkedin}
                    </a>
                  ) : (
                    <p className="text-base font-medium text-slate-400 italic">
                      Add LinkedIn Profile
                    </p>
                  )}
                </div>
              </div>

              {/* Twitter */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                  <Twitter className="w-4 h-4 text-sky-400" />
                  Twitter Profile
                </label>
                <div className="rounded-xl bg-slate-900/50 p-4 border border-slate-700/30 group-hover:border-slate-600/50 transition-colors">
                  {user?.additionalInfo?.socialLinks?.twitter ? (
                    <a
                      href={user.additionalInfo.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-white hover:text-sky-300 transition-colors break-all"
                    >
                      {user.additionalInfo.socialLinks.twitter}
                    </a>
                  ) : (
                    <p className="text-base font-medium text-slate-400 italic">
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
  )
}