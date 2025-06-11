/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react"

import { MdClose, MdAdd } from "react-icons/md"
import { useSelector } from "react-redux"

export default function Input({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)

  const [tags, setTags] = useState([])
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    if (editCourse && course?.tags) {
      // Fixed: Changed from course?.tag to course?.tags
      // Also added safety check to ensure tags exists and is an array
      const courseTags = Array.isArray(course.tags) ? course.tags : []
      setTags(courseTags)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })

  }, [])

  useEffect(() => {
    setValue(name, tags)

  }, [tags])

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      const tagValue = event.target.value.trim()
      if (tagValue && !tags.includes(tagValue)) {
        const newTags = [...tags, tagValue]
        setTags(newTags)
        event.target.value = ""
        setInputValue("")
      }
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleDeleteTag = (tagIndex) => {
    const newTags = tags.filter((_, index) => index !== tagIndex)
    setTags(newTags)
  }

  const handleAddTag = () => {
    const tagValue = inputValue.trim()
    if (tagValue && !tags.includes(tagValue)) {
      const newTags = [...tags, tagValue]
      setTags(newTags)
      setInputValue("")
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Label */}
      <label className="text-sm font-semibold text-slate-200 tracking-wide" htmlFor={name}>
        {label}
        <span className="text-rose-400 ml-1 text-base">*</span>
      </label>

      {/* Main Input Container */}
      <div className="relative group">
        <div className={`
          min-h-[56px] w-full rounded-2xl border-2 transition-all duration-300 ease-out
          backdrop-blur-sm relative overflow-hidden bg-black
          ${errors[name]
            ? 'border-rose-400/60 bg-rose-500/5 shadow-lg shadow-rose-500/10'
            : 'border-slate-600/50 hover:border-slate-500/70 focus-within:border-blue-400/80 bg-slate-800/40 hover:bg-slate-800/60 focus-within:bg-slate-800/70'
          } 
          p-4 shadow-xl hover:shadow-2xl focus-within:shadow-2xl
        `}>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

          {/* Tags Container */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mb-3">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="group/tag flex items-center rounded-xl bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-indigo-500/90 px-3.5 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-blue-400 hover:via-purple-400 hover:to-indigo-400 backdrop-blur-sm border border-white/10"
                >
                  <span className="max-w-[180px] truncate tracking-wide">{tag}</span>
                  <button
                    type="button"
                    className="ml-2.5 rounded-full p-1 opacity-75 transition-all duration-200 hover:opacity-100 hover:bg-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/40 active:scale-95"
                    onClick={() => handleDeleteTag(index)}
                    aria-label={`Remove ${tag} tag`}
                  >
                    <MdClose className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input Row */}
          <div className="flex items-center gap-3 relative">
            <input
              id={name}
              name={name}
              type="text"
              value={inputValue}
              placeholder={tags.length === 0 ? placeholder : "Add another tag..."}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-400 outline-none text-sm font-medium tracking-wide selection:bg-blue-500/30"
            />

            {/* Add Button */}
            {inputValue.trim() && (
              <button
                type="button"
                onClick={handleAddTag}
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-slate-800/50 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-white/10"
                aria-label="Add tag"
              >
                <MdAdd className="h-4.5 w-4.5 text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Helper Text and Counter */}
        <div className="mt-3 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500/60"></div>
            <span className="text-xs text-slate-400 font-medium">
              Press <kbd className="px-1.5 py-0.5 bg-slate-700/50 rounded text-slate-300 border border-slate-600/50 text-[10px] font-mono">Enter</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-700/50 rounded text-slate-300 border border-slate-600/50 text-[10px] font-mono">,</kbd> to add tags
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-blue-500/60"></div>
            <span className="text-xs text-slate-500 font-medium tabular-nums">
              {tags.length} tag{tags.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {errors[name] && (
        <div className="flex items-center gap-2.5 px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></div>
          <span className="text-sm font-medium text-rose-400 tracking-wide">
            {label} is required
          </span>
        </div>
      )}
    </div>
  )
}