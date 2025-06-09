/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { MdAdd, MdClose, MdList } from "react-icons/md"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
  }, [requirementsList])

  const handleAddRequirement = () => {
    const trimmedRequirement = requirement.trim()
    if (trimmedRequirement && !requirementsList.includes(trimmedRequirement)) {
      setRequirementsList([...requirementsList, trimmedRequirement])
      setRequirement("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddRequirement()
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  return (
    <div className="flex flex-col space-y-3">
      {/* Label */}
      <label className="text-sm font-medium text-gray-100" htmlFor={name}>
        {label} <sup className="text-red-400">*</sup>
      </label>

      {/* Input container */}
      <div className="relative">
        <div className={`min-h-[48px] w-full rounded-lg border-2 transition-all duration-200 ${errors[name]
            ? 'border-red-400 bg-red-50/5'
            : 'border-gray-600 hover:border-gray-500 focus-within:border-blue-400 bg-gray-800/50'
          } p-3`}>

          {/* Requirements list */}
          {requirementsList.length > 0 && (
            <div className="mb-3 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wide">
                <MdList className="h-4 w-4" />
                Requirements ({requirementsList.length})
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {requirementsList.map((req, index) => (
                  <div
                    key={index}
                    className="group flex items-start justify-between gap-3 p-2 rounded-md bg-gray-700/50 hover:bg-gray-700/70 transition-colors duration-200"
                  >
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-200 leading-relaxed break-words">
                        {req}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(index)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-full hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                      aria-label={`Remove requirement: ${req}`}
                    >
                      <MdClose className="h-4 w-4 text-red-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Input field with add button */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              id={name}
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={requirementsList.length === 0 ? "Enter course requirements..." : "Add another requirement..."}
              className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 outline-none text-sm"
            />
            {requirement.trim() && (
              <button
                type="button"
                onClick={handleAddRequirement}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-label="Add requirement"
              >
                <MdAdd className="h-4 w-4 text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Helper text */}
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-gray-400">
            Press Enter to add requirements
          </div>
          {requirementsList.length > 0 && (
            <div className="text-xs text-gray-500">
              {requirementsList.length} requirement{requirementsList.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Error message */}
      {errors[name] && (
        <div className="flex items-center gap-2 text-red-400">
          <div className="w-1 h-1 rounded-full bg-red-400"></div>
          <span className="text-xs font-medium">
            {label} is required
          </span>
        </div>
      )}
    </div>
  )
}