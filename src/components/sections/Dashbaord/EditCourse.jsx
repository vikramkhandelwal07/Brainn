/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  fetchCourseDetails,
  getFullDetailsOfCourse,
} from "../../../services/courseApi";
import { setCourse, setEditCourse } from "../../../slices/courseSlice";
import RenderFlow from "./AddCourse/RenderFlow";

export default function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);
      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="relative">
          {/* Enhanced loading spinner with pulsing background */}
          <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
          <div className="relative w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-2 border-blue-400/20 border-r-blue-400 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <div className="ml-4 text-slate-300 font-medium">Loading course details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with enhanced styling */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-800/50 to-slate-700/30 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative px-6 py-8 sm:px-8 lg:px-12">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
              Edit Course
            </h1>
          </div>
          <p className="mt-2 text-slate-400 font-medium">
            Modify and update your course content
          </p>
        </div>
      </div>

      {/* Main content area */}
      <div className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          {course ? (
            <div className="relative">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-slate-700/10 rounded-2xl"></div>
              <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-8">
                <RenderFlow />
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              {/* Enhanced "not found" state */}
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl"></div>
                <div className="relative w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-red-500/30">
                  <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-200 mb-3">Course Not Found</h2>
              <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
                The course you're looking for doesn't exist or may have been removed.
              </p>
              <div className="mt-8">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
                  Go Back to Courses
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}