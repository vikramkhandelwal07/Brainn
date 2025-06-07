import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut, VscAccount } from "react-icons/vsc"
import { HiOutlineUser, HiOutlineCog } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/authApi"

export default function ProfileMenu() {
  const { user } = useSelector((state) => state.userProfile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  const handleLogout = () => {
    dispatch(logout(navigate))
    setOpen(false)
  }

  const menuItems = [
    {
      icon: VscDashboard,
      label: "Dashboard",
      to: "/dashboard/my-profile",
      description: "View your dashboard"
    },
    {
      icon: HiOutlineUser,
      label: "My Profile",
      to: "/dashboard/my-profile",
      description: "Manage your account"
    },
    {
      icon: HiOutlineCog,
      label: "Settings",
      to: "/dashboard/settings",
      description: "Account preferences"
    }
  ]

  return (
    <div className="relative">
      <button
        className="group flex items-center gap-x-2 rounded-full p-1 transition-all duration-200 hover:bg-gray-100/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <div className="relative">
          <img
            src={user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`}
            alt={`${user?.firstName || 'User'} profile`}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-transparent transition-all duration-200 group-hover:ring-blue-400/50"
          />
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></div>
        </div>
        <AiOutlineCaretDown
          className={`text-sm text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''
            }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div
            ref={ref}
            className="absolute right-0 top-full z-50 mt-2 w-64 origin-top-right animate-in slide-in-from-top-2 duration-200"
          >
            <div className="overflow-hidden rounded-xl border border-gray-200/20 bg-white/95 backdrop-blur-xl shadow-xl dark:bg-gray-900/95 dark:border-gray-700/50">

              {/* User Info Header */}
              <div className="border-b border-gray-200/20 p-4 dark:border-gray-700/50">
                <div className="flex items-center gap-3">
                  <img
                    src={user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`}
                    alt={`${user?.firstName || 'User'} profile`}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50 transition-colors duration-150"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-blue-100 dark:bg-gray-800 dark:group-hover:bg-blue-900/50 transition-colors duration-150">
                      <item.icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Logout Section */}
              <div className="border-t border-gray-200/20 dark:border-gray-700/50">
                <button
                  onClick={handleLogout}
                  className="group flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors duration-150"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 group-hover:bg-red-200 dark:bg-red-900/50 dark:group-hover:bg-red-900/70 transition-colors duration-150">
                    <VscSignOut className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">Sign out</div>
                    <div className="text-xs text-red-500/70 dark:text-red-400/70">
                      Sign out of your account
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}