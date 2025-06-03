import React, { useState } from 'react'
import { categories } from '../../../data/Category'
import {
  FaBookOpen, FaCode, FaReact, FaNodeJs, FaPython, FaDatabase, FaTools,
  FaPaintBrush, FaUserTie, FaRobot, FaGithub, FaFigma, FaLaptopCode,
  FaKeyboard, FaHtml5, FaCss3Alt, FaJsSquare
} from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

const iconMap = {
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: FaJsSquare,
  react: FaReact,
  next: FaLaptopCode,
  vue: FaCode,
  node: FaNodeJs,
  express: FaNodeJs,
  django: FaPython,
  fastapi: FaRobot,
  python: FaPython,
  sql: FaDatabase,
  git: FaGithub,
  devops: FaTools,
  vscode: FaKeyboard,
  ui: FaPaintBrush,
  figma: FaFigma,
  accessibility: FaUserTie,
  interview: FaUserTie,
  resume: FaUserTie,
  communication: FaUserTie,
  p5: FaPaintBrush,
  three: FaReact,
  default: FaBookOpen,
}

const getIcon = (title) => {
  const key = title.toLowerCase()
  const match = Object.keys(iconMap).find(k => key.includes(k))
  return iconMap[match] || iconMap.default
}

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [visibleKey, setVisibleKey] = useState(0)

  const handleCategoryChange = (cat) => {
    if (cat.category !== selectedCategory.category) {
      setVisibleKey(prev => prev + 1)
      setSelectedCategory(cat)
    }
  }

  return (
    <div className="relative z-10 w-10/12 mx-auto py-12 text-white">
      {/* Category Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 bg-transparent backdrop-blur-md shadow-xl border border-white/20 py-8 px-8 rounded-3xl">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(cat)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200  ${selectedCategory.category === cat.category
              ? 'bg-white text-black'
              : 'border-white/40 text-white/70 hover:bg-white/10'
              }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Cards with Animation and Hover */}
      <AnimatePresence mode="wait">
        <motion.div
          key={visibleKey}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {selectedCategory.courses.slice(0, 3).map((course, index) => {
            const Icon = getIcon(course.title)
            return (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="z-10 w-full h-[16rem] rounded-2xl bg-white/5 backdrop-blur-xl shadow-xl border border-white/20 flex flex-col items-center justify-start text-white px-6 py-5 transition-all hover:scale-[1.03] duration-300"
              >
                <Icon className="text-4xl text-white mb-3 mt-1" />
                <h2 className="text-xl font-semibold text-center mb-2">{course.title}</h2>
                <p className="text-center text-sm mb-3 line-clamp-3">{course.description}</p>
                <div className="text-xs text-white/70 mb-2">
                  Level: <span className="font-medium">{course.level}</span> • Lessons: <span className="font-medium">{course.lessons}</span>
                </div>
                <button className="mt-auto text-sm text-white/80 border rounded-xl px-4 py-2 hover:text-white">
                  Browse Course →
                </button>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Category
