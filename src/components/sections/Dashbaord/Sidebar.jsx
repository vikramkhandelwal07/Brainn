import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import SidebarLink from "./SidebarLink"
import { ACCOUNT_TYPE } from "../../../utils/Constants"

const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/instructor",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Your Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscHistory",
  },
]
import { logout } from "../../../services/authApi"
import ConfirmationModal from "../../common/Confirmation"


export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.userProfile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[280px] items-center justify-center border-r border-gray-800/50 bg-gradient-to-b from-gray-900 to-gray-950 backdrop-blur-xl">
        <div className="relative">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500/20 border-t-blue-500"></div>
          <div className="absolute inset-0 h-8 w-8 animate-pulse rounded-full bg-blue-500/10"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex h-screen min-w-[280px] flex-col border-r border-gray-800/50 bg-gradient-to-b from-black to-indigo-950 via-black backdrop-blur-xl shadow-2xl md:sticky md:top-0">
        {/* Header Section */}
        <div className="px-6 py-8">
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-4 backdrop-blur-sm border border-gray-700/50">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-md shadow-lg">
              {user?.firstName?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-white truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2">
          <div className="mb-6">
            <h3 className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Navigation
            </h3>
            <div className="space-y-1">
              {sidebarLinks.map((link) => {
                if (link.type && user?.accountType !== link.type) return null
                return (
                  <SidebarLink
                    key={link.id}
                    link={link}
                    iconName={link.icon}
                    className="group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 hover:shadow-md hover:shadow-blue-500/5 text-gray-300 hover:text-white border border-transparent hover:border-gray-700/50"
                  />
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="relative py-4">
            <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
          </div>

          {/* Settings Section */}
          <div className="space-y-1">
            <h3 className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Account
            </h3>
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
              className="group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 hover:shadow-md hover:shadow-blue-500/5 text-gray-300 hover:text-white border border-transparent hover:border-gray-700/50"
            />
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-800/50 mb-24">
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="group relative w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-red-600/10 hover:to-pink-600/10 hover:shadow-md hover:shadow-red-500/5 text-gray-300 hover:text-red-400 border border-transparent hover:border-red-700/30 bg-gray-800/30"
          >
            <VscSignOut className="text-lg transition-transform duration-200 group-hover:scale-110" />
            <span className="font-medium">Logout</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-pink-600/0 group-hover:from-red-600/5 group-hover:to-pink-600/5 transition-all duration-200"></div>
          </button>
        </div>

        {/* Bottom Accent */}
        
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}