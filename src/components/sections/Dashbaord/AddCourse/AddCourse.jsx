import RenderFlow from "./RenderFlow"

export default function AddCourse() {
  return (
    <>
      <div className="flex w-full items-start gap-x-8">
        <div className="flex flex-1 flex-col">
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-gray-50 tracking-tight">
              Add Course
            </h1>
            <p className="mt-3 text-gray-400 text-lg">
              Create and publish your course content
            </p>
          </div>
          <div className="flex-1">
            <RenderFlow />
          </div>
        </div>

        {/* Course Upload Tips */}
        <div className="sticky top-10 hidden max-w-[420px] flex-1 xl:block">
          <div className="rounded-xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-7 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">⚡</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-50">
                Course Upload Tips
              </h2>
            </div>

            <div className="space-y-5">
              <div className="group hover:bg-gray-700/30 rounded-lg p-3 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Set the Course Price option or make it free.
                  </p>
                </div>
              </div>

              <div className="group hover:bg-gray-700/30 rounded-lg p-3 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Standard size for the course thumbnail is 1024x576.
                  </p>
                </div>
              </div>

              <div className="group hover:bg-gray-700/30 rounded-lg p-3 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Video section controls the course overview video.
                  </p>
                </div>
              </div>

              <div className="group hover:bg-gray-700/30 rounded-lg p-3 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Course Builder is where you create & organize a course.
                  </p>
                </div>
              </div>

              <div className="group hover:bg-gray-700/30 rounded-lg p-3 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Add Topics in the Course Builder section to create lessons, quizzes, and assignments.
                  </p>
                </div>
              </div>

              <div className="group hover:bg-gray-700/30 rounded-lg p-3 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Information from the Additional Data section shows up on the course single page.
                  </p>
                </div>
              </div>

              <div className="group hover:bg-gray-700/30 rounded-lg p-3 transition-all duration-200">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Make Announcements to notify any important notes to all enrolled students at once.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}