/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/courseApi"
import { COURSE_STATUS } from "../../../../utils/Constants"
import ConfirmationModal from "../../../common/Confirmation"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  // console.log("All Course ", courses)

  return (
    <>
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
        <Table className="w-full">
          <Thead>
            <Tr className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm">
              <Th className="px-8 py-6 text-left">
                <div className="flex items-center space-x-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  <span className="text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                    Courses
                  </span>
                </div>
              </Th>
              <Th className="px-6 py-6 text-left">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Duration
                </span>
              </Th>
              <Th className="px-6 py-6 text-left">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Price
                </span>
              </Th>
              <Th className="px-6 py-6 text-center">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-300">
                  Actions
                </span>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses?.length === 0 ? (
              <Tr>
                <Td colSpan="4" className="px-8 py-16 text-center">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-slate-200 mb-2">No courses found</h3>
                      <p className="text-slate-400">Create your first course to get started</p>
                    </div>
                  </div>
                </Td>
              </Tr>
            ) : (
              courses?.map((course, index) => (
                <Tr
                  key={course._id}
                  className={`border-b border-slate-700/30 hover:bg-slate-800/30 transition-all duration-300 group ${index % 2 === 0 ? 'bg-slate-800/10' : 'bg-slate-900/10'
                    }`}
                >
                  <Td className="px-8 py-6">
                    <div className="flex gap-6 items-start">
                      <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        <img
                          src={course?.thumbnail}
                          alt={course?.courseName}
                          className="h-32 w-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="flex flex-col justify-between space-y-3 flex-1 min-w-0">
                        <div>
                          <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-blue-300 transition-colors duration-300">
                            {course.courseName}
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {course.courseDescription.split(" ").length > TRUNCATE_LENGTH
                              ? course.courseDescription
                                .split(" ")
                                .slice(0, TRUNCATE_LENGTH)
                                .join(" ") + "..."
                              : course.courseDescription}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Created: {formatDate(course.createdAt)}</span>
                          </div>
                          {course.status === COURSE_STATUS.DRAFT ? (
                            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-3 py-1">
                              <HiClock size={14} className="text-amber-400" />
                              <span className="text-xs font-medium text-amber-300">Drafted</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-full px-3 py-1">
                              <div className="flex h-3 w-3 items-center justify-center rounded-full bg-emerald-400">
                                <FaCheck size={8} className="text-emerald-900" />
                              </div>
                              <span className="text-xs font-medium text-emerald-300">Published</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Td>
                  <Td className="px-6 py-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm font-medium text-slate-300">2hr 30min</span>
                    </div>
                  </Td>
                  <Td className="px-6 py-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="text-lg font-bold text-slate-100">₹{course.price}</span>
                    </div>
                  </Td>
                  <Td className="px-6 py-6">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        disabled={loading}
                        onClick={() => {
                          navigate(`/dashboard/edit-course/${course._id}`)
                        }}
                        title="Edit Course"
                        className="group/btn relative p-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-500/30 hover:border-blue-400/50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiEdit2 size={18} className="text-blue-300 group-hover/btn:text-blue-200 transition-colors duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Do you want to delete this course?",
                            text2: "All the data related to this course will be deleted",
                            btn1Text: !loading ? "Delete" : "Loading...  ",
                            btn2Text: "Cancel",
                            btn1Handler: !loading
                              ? () => handleCourseDelete(course._id)
                              : () => { },
                            btn2Handler: !loading
                              ? () => setConfirmationModal(null)
                              : () => { },
                          })
                        }}
                        title="Delete Course"
                        className="group/btn relative p-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 border border-red-500/30 hover:border-red-400/50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <RiDeleteBin6Line size={18} className="text-red-300 group-hover/btn:text-red-200 transition-colors duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}