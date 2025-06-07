import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName, className = "" }) {
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
      className={({ isActive: navLinkActive }) => {
        const baseClasses = "relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group"
        const activeClasses = (isActive || navLinkActive)
          ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
          : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"

        return `${baseClasses} ${activeClasses} ${className}`
      }}
    >
      {/* Active indicator */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full transition-all duration-200 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
      />

      {/* Icon with enhanced styling */}
      <div className={`flex items-center justify-center w-5 h-5 transition-all duration-200 ${isActive ? 'text-blue-700' : 'text-gray-200 group-hover:text-blue-600'
        }`}>
        <Icon className="w-full h-full" />
      </div>

      {/* Link text */}
      <span className={`font-medium text-base transition-all duration-200 ${isActive ? 'text-blue-700' : 'text-gray-200 group-hover:text-blue-700'
        }`}>
        {link.name}
      </span>

      {/* Subtle hover effect */}
      <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 ${isActive ? 'opacity-100' : ''
        }`} />
    </NavLink>
  )
}