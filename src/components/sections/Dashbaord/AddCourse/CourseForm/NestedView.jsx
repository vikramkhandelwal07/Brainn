import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/courseApi"
import { setCourse } from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../common/Confirmation"
import SubSectionModal from "./SubSectionModal"

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token })
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  return (
    <>
      <div
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-8 border border-slate-600"
        id="nestedViewContainer"
      >
        <div className="space-y-4">
          {course?.courseContent?.map((section) => (
            // Section Dropdown
            <details key={section._id} open>
              {/* Section Dropdown Content */}
              <summary className="group flex cursor-pointer items-center justify-between bg-slate-700/50 hover:bg-slate-700/70 rounded-lg p-4 border border-slate-600/50 transition-all duration-200 hover:shadow-lg">
                <div className="flex items-center gap-x-4">
                  <div className="p-2 bg-slate-600/50 rounded-lg group-hover:bg-slate-600/70 transition-colors">
                    <RxDropdownMenu className="text-xl text-slate-300" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-100 group-hover:text-white transition-colors">
                    {section.sectionName}
                  </h3>
                </div>
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={() =>
                      handleChangeEditSectionName(
                        section._id,
                        section.sectionName
                      )
                    }
                    className="p-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 rounded-lg transition-all duration-200 hover:scale-105"
                    title="Edit Section"
                  >
                    <MdEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this Section?",
                        text2: "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleleSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                    className="p-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 hover:scale-105"
                    title="Delete Section"
                  >
                    <RiDeleteBin6Line className="text-lg" />
                  </button>
                  <div className="w-px h-6 bg-slate-500 mx-2"></div>
                  <AiFillCaretDown className="text-lg text-slate-400 group-hover:text-slate-300 transition-colors" />
                </div>
              </summary>

              <div className="mt-3 ml-6 space-y-2">
                {/* Render All Sub Sections Within a Section */}
                {section.subSection.map((data) => (
                  <div
                    key={data?._id}
                    onClick={() => setViewSubSection(data)}
                    className="group flex cursor-pointer items-center justify-between bg-slate-800/30 hover:bg-slate-700/50 rounded-lg p-3 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-200 hover:shadow-md"
                  >
                    <div className="flex items-center gap-x-3">
                      <div className="p-1.5 bg-slate-600/30 rounded group-hover:bg-slate-600/50 transition-colors">
                        <RxDropdownMenu className="text-lg text-slate-400" />
                      </div>
                      <p className="font-medium text-slate-200 group-hover:text-white transition-colors">
                        {data.title}
                      </p>
                    </div>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <button
                        onClick={() =>
                          setEditSubSection({ ...data, sectionId: section._id })
                        }
                        className="p-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 rounded transition-all duration-200 hover:scale-105"
                        title="Edit Lecture"
                      >
                        <MdEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this Sub-Section?",
                            text2: "This lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () =>
                              handleDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                        className="p-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 rounded transition-all duration-200 hover:scale-105"
                        title="Delete Lecture"
                      >
                        <RiDeleteBin6Line className="text-sm" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add New Lecture to Section */}
                <button
                  onClick={() => setAddSubsection(section._id)}
                  className="group flex items-center gap-x-2 text-yellow-400 hover:text-yellow-300 bg-yellow-500/10 hover:bg-yellow-500/20 rounded-lg p-3 mt-4 w-full justify-center border-2 border-dashed border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-200"
                >
                  <FaPlus className="text-sm group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Add Lecture</span>
                </button>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Modal Display */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}

      {/* Confirmation Modal */}
      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <></>
      )}
    </>
  )
}