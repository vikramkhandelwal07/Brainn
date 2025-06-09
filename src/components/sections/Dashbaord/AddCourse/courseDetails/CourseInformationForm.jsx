import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import {
  addCourseDetails,
  editCourseDetails,
} from "../../../../../services/courseApi"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/Constants"
import Upload from "../Upload"
import Input from "./Input"
import RequirementsField from "./RequirementField"
import { apiConnector } from '../../../../../services/apiConnector';
import { categories } from '../../../../../services/api';

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);

        if (result?.data?.data?.length > 0) {
          console.log("Fetched categories:", result);
          setCourseCategories(result.data.data);
        } else {
          console.log("No categories found");
          setCourseCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
        setCourseCategories([]);
      }
      setLoading(false)
    }

    if (editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tags) // Fixed: was course.tag
      setValue("courseBenefits", course.whatWillYouLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tags.toString() || // Fixed: was course.tag
      currentValues.courseBenefits !== course.whatWillYouLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
      course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true
    }
    return false
  }

  const onSubmit = async (data) => {
    // Debug: Log the form data
    console.log("Form data being submitted:", data);

    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tags.toString()) { // Fixed: was course.tag
          formData.append("tags", JSON.stringify(data.courseTags)) // Fixed: was "tag"
        }
        if (currentValues.courseBenefits !== course.whatWillYouLearn) {
          formData.append("whatWillYouLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    // Validate required fields before creating FormData
    if (!data.courseTitle || !data.courseShortDesc || !data.coursePrice || 
        !data.courseTags || !data.courseBenefits || !data.courseCategory || 
        !data.courseRequirements || !data.courseImage) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tags", JSON.stringify(data.courseTags)) // Fixed: was "tag"
    formData.append("whatWillYouLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    
    // Convert COURSE_STATUS.DRAFT to boolean for published field
    const isPublished = COURSE_STATUS.DRAFT === "PUBLISHED"; // Adjust based on your COURSE_STATUS constants
    formData.append("published", isPublished) // Fixed: was "status"
    
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)

    // Debug: Log FormData contents
    console.log("FormData being sent:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/5 to-slate-900/10 rounded-3xl pointer-events-none" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative space-y-8 rounded-3xl border border-slate-600/30 bg-slate-800/40 backdrop-blur-sm p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
      >
        {/* Form Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100 mb-2">Course Information</h2>
          <p className="text-slate-400 text-sm">Fill in the details to create your course</p>
        </div>

        <div className="grid gap-8">
          <div className="flex flex-col space-y-4">
            <label className="text-sm font-semibold text-slate-200 tracking-wide" htmlFor="courseTitle">
              Course Title
              <span className="text-rose-400 ml-1 text-base">*</span>
            </label>
            <div className="relative group">
              <input
                id="courseTitle"
                placeholder="Enter Course Title"
                {...register("courseTitle", { required: true })}
                className="w-full h-14 px-5 bg-slate-800/60 border-2 border-slate-600/50 rounded-2xl text-slate-100 placeholder-slate-400 font-medium tracking-wide transition-all duration-300 hover:border-slate-500/70 focus:border-blue-400/80 focus:bg-slate-800/80 focus:outline-none focus:ring-4 focus:ring-blue-400/20 shadow-lg hover:shadow-xl backdrop-blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent rounded-2xl pointer-events-none" />
            </div>
            {errors.courseTitle && (
              <div className="flex items-center gap-2.5 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></div>
                <span className="text-sm font-medium text-rose-400 tracking-wide">
                  Course title is required
                </span>
              </div>
            )}
          </div>

          
          <div className="flex flex-col space-y-4">
            <label className="text-sm font-semibold text-slate-200 tracking-wide" htmlFor="courseShortDesc">
              Course Short Description
              <span className="text-rose-400 ml-1 text-base">*</span>
            </label>
            <div className="relative group">
              <textarea
                id="courseShortDesc"
                placeholder="Enter a compelling description for your course..."
                {...register("courseShortDesc", { required: true })}
                className="w-full min-h-[140px] p-5 bg-slate-800/60 border-2 border-slate-600/50 rounded-2xl text-slate-100 placeholder-slate-400 font-medium tracking-wide transition-all duration-300 hover:border-slate-500/70 focus:border-blue-400/80 focus:bg-slate-800/80 focus:outline-none focus:ring-4 focus:ring-blue-400/20 shadow-lg hover:shadow-xl backdrop-blur-sm resize-none"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent rounded-2xl pointer-events-none" />
            </div>
            {errors.courseShortDesc && (
              <div className="flex items-center gap-2.5 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></div>
                <span className="text-sm font-medium text-rose-400 tracking-wide">
                  Course Description is required
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <label className="text-sm font-semibold text-slate-200 tracking-wide" htmlFor="coursePrice">
              Course Price
              <span className="text-rose-400 ml-1 text-base">*</span>
            </label>
            <div className="relative group">
              <input
                id="coursePrice"
                placeholder="Enter Course Price"
                {...register("coursePrice", {
                  required: true,
                  valueAsNumber: true,
                  pattern: {
                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                  },
                })}
                className="w-full h-14 pl-14 pr-5 bg-slate-800/60 border-2 border-slate-600/50 rounded-2xl text-slate-100 placeholder-slate-400 font-medium tracking-wide transition-all duration-300 hover:border-slate-500/70 focus:border-blue-400/80 focus:bg-slate-800/80 focus:outline-none focus:ring-4 focus:ring-blue-400/20 shadow-lg hover:shadow-xl backdrop-blur-sm"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
                <HiOutlineCurrencyRupee className="text-white text-lg" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent rounded-2xl pointer-events-none" />
            </div>
            {errors.coursePrice && (
              <div className="flex items-center gap-2.5 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></div>
                <span className="text-sm font-medium text-rose-400 tracking-wide">
                  Course Price is required
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <label className="text-sm font-semibold text-slate-200 tracking-wide" htmlFor="courseCategory">
              Course Category
              <span className="text-rose-400 ml-1 text-base">*</span>
            </label>
            <div className="relative group">
              <select
                {...register("courseCategory", { required: true })}
                defaultValue=""
                id="courseCategory"
                className="w-full h-14 px-5 bg-slate-800/60 border-2 border-slate-600/50 rounded-2xl text-slate-100 font-medium tracking-wide transition-all duration-300 hover:border-slate-500/70 focus:border-blue-400/80 focus:bg-slate-800/80 focus:outline-none focus:ring-4 focus:ring-blue-400/20 shadow-lg hover:shadow-xl backdrop-blur-sm appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-slate-800 text-slate-400">
                  Choose a Category
                </option>
                {!loading &&
                  courseCategories?.map((category, indx) => (
                    <option key={indx} value={category?._id} className="bg-slate-800 text-slate-100">
                      {category?.name}
                    </option>
                  ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent rounded-2xl pointer-events-none" />
            </div>
            {errors.courseCategory && (
              <div className="flex items-center gap-2.5 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></div>
                <span className="text-sm font-medium text-rose-400 tracking-wide">
                  Course Category is required
                </span>
              </div>
            )}
          </div>

          <Input
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags and press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />

          <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCourse ? course?.thumbnail : null}
          />

          <div className="flex flex-col space-y-4">
            <label className="text-sm font-semibold text-slate-200 tracking-wide" htmlFor="courseBenefits">
              Benefits of the course
              <span className="text-rose-400 ml-1 text-base">*</span>
            </label>
            <div className="relative group">
              <textarea
                id="courseBenefits"
                placeholder="Describe what students will gain from this course..."
                {...register("courseBenefits", { required: true })}
                className="w-full min-h-[140px] p-5 bg-slate-800/60 border-2 border-slate-600/50 rounded-2xl text-slate-100 placeholder-slate-400 font-medium tracking-wide transition-all duration-300 hover:border-slate-500/70 focus:border-blue-400/80 focus:bg-slate-800/80 focus:outline-none focus:ring-4 focus:ring-blue-400/20 shadow-lg hover:shadow-xl backdrop-blur-sm resize-none"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent rounded-2xl pointer-events-none" />
            </div>
            {errors.courseBenefits && (
              <div className="flex items-center gap-2.5 px-1">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></div>
                <span className="text-sm font-medium text-rose-400 tracking-wide">
                  Benefits of the course is required
                </span>
              </div>
            )}
          </div>

          <RequirementsField
            name="courseRequirements"
            label="Requirements/Instructions"
            register={register}
            setValue={setValue}
            errors={errors}
            getValues={getValues}
          />
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-slate-600/30">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-slate-700/60 hover:bg-slate-700/80 text-slate-200 font-semibold rounded-2xl transition-all duration-300 hover:shadow-lg border border-slate-600/50 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue Without Saving
            </button>
          )}
          <div className="relative">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border border-white/10 shadow-lg"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  {!editCourse ? "Next" : "Save Changes"}
                  <MdNavigateNext className="text-lg" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>)}