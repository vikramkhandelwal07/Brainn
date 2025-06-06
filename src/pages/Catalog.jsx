import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/api';
import { getCatalogPageData } from '../services/catalogDataApi';
import CourseCard from '../components/sections/Catalog/CourseCard';
import CourseSlider from '../components/sections/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error404"
const Catalog = () => {

  const { loading } = useSelector((state) => state.userProfile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  //Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id =
        res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
      setCategoryId(category_id);
    }
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        console.log("Printing res: ", res);
        setCatalogPageData(res);
      }
      catch (error) {
        console.log(error)
      }
    }
    if (categoryId) {
      getCategoryDetails();
    }

  }, [categoryId]);


  if (loading || !catalogPageData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin-reverse"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium font-poppins">Loading courses...</p>
        </div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-black via-blue-900 to-black overflow-hidden ">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-5">
        </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse-delay"></div>

      <div className="relative mx-auto flex min-h-[320px] max-w-maxContentTab flex-col justify-center gap-6 px-6 py-16 lg:max-w-maxContent lg:px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm">
          <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Home</span>
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">Catalog</span>
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-yellow-400 font-medium">
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </nav>

        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
            {catalogPageData?.data?.selectedCategory?.name}
          </h1>
          <p className="max-w-3xl text-lg text-gray-300 leading-relaxed font-poppins">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>

        {/* Stats or Additional Info */}
        <div className="flex flex-wrap gap-6 mt-8">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white font-medium">Top Rated</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-white font-medium">Verified Courses</span>
          </div>
        </div>
      </div>
    </div >

      {/* Section 1 */ }
      < div className = "mx-auto box-content w-full max-w-maxContentTab px-4 py-16 lg:max-w-maxContent bg-black" >
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-2">
            Courses to get you started
          </h2>
          <p className="text-gray-400 max-w-2xl font-poppins text-md">
            Choose from our carefully curated selection of courses designed to help you begin your learning journey
          </p>
        </div>

  {/* Enhanced Tab Navigation */ }
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-gray-300 rounded-xl w-fit">
            <button
              className={`px-6 py-3 rounded-lg font-medium font-poppins text-sm transition-all duration-300 ${
                active === 1
                  ? "bg-white/50 text-blue-600 shadow-md transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
              }`}
              onClick={() => setActive(1)}
            >
              <div className="flex items-center gap-2 ">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Most Popular
              </div>
            </button>
            <button
              className={`px-6 py-3 rounded-lg font-medium font-poppins text-sm transition-all duration-300 ${
                active === 2
                  ? "bg-white/50 text-blue-600 shadow-md transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => setActive(2)}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Latest
              </div>
            </button>
          </div>
        </div>

        <div className="bg-gray-950 rounded-2xl shadow-sm p-6">
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
            title=""
          />
        </div>
      </div >

  {/* Section 2 */ }
  < div className = "mx-auto box-content w-full max-w-maxContentTab px-4 py-16 lg:max-w-maxContent bg-black" >
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-white mb-4">
            Top courses in {catalogPageData?.data?.selectedCategory?.name}
          </h2>
          <p className="text-gray-100 max-w-2xl mx-auto font-poppins">
            Expand your knowledge with these highly-rated courses from related categories
          </p>
        </div>
        
        <div className="bg-gray-950 rounded-2xl shadow-sm p-6">
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
            title=""
          />
        </div>
      </div >

  {/* Section 3 */ }
  < div className = "mx-auto box-content w-full max-w-maxContentTab px-4 py-16 lg:max-w-maxContent bg-white" >
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-4">
            Frequently Bought Together
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-poppins">
            These popular course combinations help students achieve comprehensive learning outcomes
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
          {catalogPageData?.data?.topSellingCourses
            ?.slice(0, 4)
            .map((course, i) => (
              <div key={i} className="group">
                <div className="bg-gray-950 rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <CourseCard  course={course} Height={"h-[400px]"} />
                </div>
              </div>
            ))}
        </div>

{/* Call to Action */ }
<div className="mt-16 text-center">
  <div className="bg-gradient-to-br from-gray-900 via-black to-blue-900 rounded-2xl p-8 text-white">
    <h3 className="text-2xl font-bold font-poppins mb-4">Ready to start learning?</h3>
    <p className="text-blue-100 font-poppins mb-6 max-w-2xl mx-auto">
      Join thousands of students who have already transformed their careers with our comprehensive courses
    </p>
    <button className="bg-white text-blue-600 px-8 py-3 h-16 rounded-2xl font-semibold font-poppins hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl">
      Browse All Courses
    </button>
  </div>
</div>
      </div >

  <Footer />
    </>
  )
}

export default Catalog