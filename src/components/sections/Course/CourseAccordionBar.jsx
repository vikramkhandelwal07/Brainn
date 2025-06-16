import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"
import CourseSubSectionAccordion from "./CourseSubSectionAccordion"

export default function CourseAccordionBar({ course, isActive = [], handleActive }) {
  const contentEl = useRef(null)

  // Accordion state
  const [active, setActive] = useState(false)
  useEffect(() => {
    setActive(isActive?.includes(course._id))
  }, [isActive])
  const [sectionHeight, setSectionHeight] = useState(0)
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0)
  }, [active])

  return (
    <div className="overflow-hidden border border-solid border-black bg-black text-gray-100 last:mb-0">
      <div>
        <div
          className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-4 py-4 transition-[0.3s] sm:px-7 sm:py-6`}
          onClick={() => {
            handleActive(course._id)
          }}
        >
          <div className="flex items-center gap-2">
            <i
              className={
                isActive?.includes(course._id) ? "rotate-180" : "rotate-0"
              }
            >
              <AiOutlineDown />
            </i>
            <p className="text-sm sm:text-base">{course?.sectionName}</p>
          </div>
          <div className="space-x-2 sm:space-x-4">
            <span className="text-xs text-yellow-25 sm:text-sm">
              {`${course?.subSections?.length || 0} lecture(s)`}
            </span>
          </div>
        </div>
      </div>
      <div
        ref={contentEl}
        className={`relative h-0 overflow-hidden bg-gray-800 transition-[height] duration-[0.35s] ease-[ease]`}
        style={{
          height: sectionHeight,
        }}
      >
        <div className="text-textHead flex flex-col gap-2 px-4 py-4 font-semibold sm:px-7 sm:py-6">
          {course?.subSections?.map((subSec, i) => {
            return <CourseSubSectionAccordion subSec={subSec} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}