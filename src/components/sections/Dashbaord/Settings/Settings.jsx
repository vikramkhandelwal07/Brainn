import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto bg-black">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="relative">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3">
              Account Settings
            </h1>
            <p className="text-gray-400 text-lg">
              Manage your profile and account preferences
            </p>
            <div className="mt-6 h-1 w-32 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Settings Cards Container */}
        <div className="space-y-8">
          {/* Profile Picture Section */}
          <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 backdrop-blur-sm rounded-2xl border border-gray-600/50 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 px-6 py-4 border-b border-gray-600/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">Profile Picture</h2>
              </div>
            </div>
            <div className="p-6">
              <ChangeProfilePicture />
            </div>
          </div>

          {/* Edit Profile Section */}
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl border border-gray-600/50 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 px-6 py-4 border-b border-gray-600/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">Personal Information</h2>
              </div>
            </div>
            <div className="p-6">
              <EditProfile />
            </div>
          </div>

          {/* Update Password Section */}
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl border border-gray-600/50 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 px-6 py-4 border-b border-gray-600/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">Security Settings</h2>
              </div>
            </div>
            <div className="p-6">
              <UpdatePassword />
            </div>
          </div>

          {/* Delete Account Section */}
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl border border-red-600/30 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-900/30 to-rose-900/30 px-6 py-4 border-b border-red-600/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">Danger Zone</h2>
              </div>
            </div>
            <div className="p-6">
              <DeleteAccount />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Changes are automatically saved. If you need help, contact our support team.
          </p>
        </div>
      </div>
    </div>
  )
}