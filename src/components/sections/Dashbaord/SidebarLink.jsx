
import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName, className = "", isCollapsed = false }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const isActive = matchRoute(link.path)

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      title={isCollapsed ? link.name : ""} 
      className={({ isActive: navLinkActive }) => {
        const baseClasses = "relative flex items-center transition-all duration-200 group"
        const activeClasses = (isActive || navLinkActive)
          ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border-blue-500/30 shadow-lg shadow-blue-500/10"
          : "text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-purple-600/10"

        return `${baseClasses} ${activeClasses} ${className}`
      }}
    >
      {/* Active indicator - adjust for collapsed state */}
      <span
        className={`absolute bg-blue-600 rounded-full transition-all duration-200 ${isCollapsed
          ? 'right-0 top-1/2 -translate-y-1/2 w-1 h-6 md:block hidden'
          : 'left-0 top-1/2 -translate-y-1/2 w-1 h-6'
          } ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
      />

      {/* Icon with enhanced styling */}
      <div className={`flex items-center justify-center transition-all duration-200 flex-shrink-0 ${isCollapsed ? 'w-5 h-5' : 'w-5 h-5'
        } ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
        <Icon className="w-full h-full" />
      </div>

      {/* Link text - hide when collapsed on desktop */}
      <span className={`font-medium transition-all duration-200 truncate ${isCollapsed ? 'md:hidden' : ''
        } ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
        {link.name}
      </span>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:to-purple-600/5 transition-all duration-200 -z-10" />
    </NavLink>
  )
}