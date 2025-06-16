import { useState, useEffect } from "react"
import { VscSignOut, VscMenu, VscClose } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import SidebarLink from "./SidebarLink"
import { ACCOUNT_TYPE } from "../../../utils/Constants"
import { logout } from "../../../services/authApi"
import ConfirmationModal from "../../common/Confirmation"

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

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.userProfile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false)
      }
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen)
  }

  if (profileLoading || authLoading) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[280px] sm:min-w-[220px] items-center justify-center border-r border-gray-800/50 bg-gradient-to-b from-gray-900 to-gray-950 backdrop-blur-xl">
        <div className="relative">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500/20 border-t-blue-500"></div>
          <div className="absolute inset-0 h-8 w-8 animate-pulse rounded-full bg-blue-500/10"></div>
        </div>
      </div>
    )
  }

  // Mobile toggle button (only visible on mobile)
  const MobileToggleButton = () => (
    <button
      onClick={toggleMobileSidebar}
      className="md:hidden fixed bottom-4 right-4 z-40 p-3 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all duration-200"
    >
      {isMobileSidebarOpen ? (
        <VscClose className="text-white text-xl" />
      ) : (
        <VscMenu className="text-white text-xl" />
      )}
    </button>
  )

  // Sidebar content component
  const SidebarContent = () => (
    <div className="flex h-screen w-full min-w-[280px] sm:min-w-[220px] md:min-w-[200px] lg:min-w-[280px] flex-col border-r border-gray-800/50 bg-gradient-to-b from-black to-indigo-950 via-black backdrop-blur-xl shadow-2xl md:sticky md:top-0">
      {/* Header Section */}
      <div className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="flex items-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-3 sm:p-4 backdrop-blur-sm border border-gray-700/50">
          <div className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm sm:text-base shadow-lg flex-shrink-0">
            {user?.firstName?.charAt(0) || user?.email?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm sm:text-base font-semibold text-white truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 sm:px-3 lg:px-4 space-y-2 overflow-y-auto">
        <div className="mb-4 sm:mb-6">
          <h3 className="px-2 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
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
                  onClick={() => isMobileView && setIsMobileSidebarOpen(false)}
                  className="group relative flex items-center gap-2 sm:gap-3 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 hover:shadow-md hover:shadow-blue-500/5 text-gray-300 hover:text-white border border-transparent hover:border-gray-700/50"
                />
              )
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="relative py-3 sm:py-4">
          <div className="h-0.5 sm:h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        </div>

        {/* Settings Section */}
        <div className="space-y-1">
          <h3 className="px-2 sm:px-4 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
            Account
          </h3>
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
            onClick={() => isMobileView && setIsMobileSidebarOpen(false)}
            className="group relative flex items-center gap-2 sm:gap-3 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10 hover:shadow-md hover:shadow-blue-500/5 text-gray-300 hover:text-white border border-transparent hover:border-gray-700/50"
          />
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-3 sm:p-4 border-t border-gray-800/50 mb-16 sm:mb-20 lg:mb-24">
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
          className="group relative w-full flex items-center gap-2 sm:gap-3 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-red-600/10 hover:to-pink-600/10 hover:shadow-md hover:shadow-red-500/5 text-gray-300 hover:text-red-400 border border-transparent hover:border-red-700/30 bg-gray-800/30"
        >
          <VscSignOut className="text-base sm:text-lg transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
          <span className="font-medium">Logout</span>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-pink-600/0 group-hover:from-red-600/5 group-hover:to-pink-600/5 transition-all duration-200"></div>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar (always visible) */}
      <div className="hidden md:block">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar (conditionally rendered) */}
      {isMobileView && (
        <>
          {/* Overlay when sidebar is open */}
          {isMobileSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={toggleMobileSidebar}
            />
          )}

          {/* Mobile sidebar */}
          <div
            className={`fixed inset-y-0 left-0 z-30 transform ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out md:hidden`}
          >
            <SidebarContent />
          </div>

          {/* Mobile toggle button */}
          <MobileToggleButton />
        </>
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}