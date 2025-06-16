import React from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs";
import {
  FaShareSquare,
  FaShoppingCart,
  FaPlay,
  FaGift,
  FaUsers,
  FaStar
} from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../../slices/cartSlice";
import { ACCOUNT_TYPE } from "../../../utils/Constants";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.userProfile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const isEnrolled = user && course?.studentsEnrolled?.includes(user?._id);

  return (
    <div className="sticky top-6 w-full lg:w-[28rem]">
      <div className="relative overflow-hidden rounded-xl lg:rounded-2xl bg-black shadow-lg border border-[#2A2A40]">
        {/* Thumbnail */}
        <div className="relative group">
          <img
            src={ThumbnailImage}
            alt={course?.courseName}
            className="w-full h-48 sm:h-56 object-cover rounded-t-xl lg:rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-t-xl lg:rounded-t-2xl" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
            <div className="bg-white/20 p-3 sm:p-4 rounded-full backdrop-blur-md hover:scale-110 transition transform cursor-pointer">
              <FaPlay className="text-white text-xl sm:text-2xl" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Price */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start justify-start">
            <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-100">
              ₹{CurrentPrice?.toLocaleString()}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 sm:mt-4">One-time payment</p>
          </div>

          {/* Buy/Add to Cart */}
          <div className="space-y-2 sm:space-y-3">
            <button
              className="w-full  bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-semibold py-2 sm:py-3 rounded-lg transition-transform transform hover:scale-[1.02] flex items-center justify-center gap-2 text-sm sm:text-base"
              onClick={
                isEnrolled
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {isEnrolled ? (
                <>
                  <FaPlay className="text-sm sm:text-base" />
                  Go To Course
                </>
              ) : (
                <>
                  <FaShoppingCart className="text-sm sm:text-base" />
                  Buy Now
                </>
              )}
            </button>

            {!isEnrolled && (
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#2C2C3A] hover:bg-[#3B3B4E] text-white font-medium py-2 sm:py-3 rounded-lg transition duration-200 border border-[#3D3D5C] flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <FaShoppingCart className="group-hover:animate-pulse text-sm sm:text-base" />
                Add to Cart
              </button>
            )}
          </div>

          {/* Money Back Guarantee */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-green-400 mb-1">
              <FaGift className="animate-pulse text-sm sm:text-base" />
              <span className="font-semibold text-sm sm:text-base">30-Day Money-Back Guarantee</span>
            </div>
            <p className="text-xs text-gray-400">Full refund if you're not satisfied</p>
          </div>

          {/* What's Included */}
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
              <FaStar className="text-yellow-400 text-sm sm:text-base" />
              This Course Includes:
            </h3>
            <ul className="space-y-2">
              {course?.instructions?.map((item, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-3">
                  <span className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-1 mt-0.5 sm:mt-1">
                    <BsFillCaretRightFill className="text-white text-xs" />
                  </span>
                  <span className="text-xs sm:text-sm text-gray-300 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Share */}
          <div className="pt-3 sm:pt-4 border-t border-[#2A2A40]">
            <button
              className="w-full flex items-center justify-center gap-2 py-2 sm:py-3 text-gray-400 hover:text-yellow-400 transition duration-200 text-sm sm:text-base"
              onClick={handleShare}
            >
              <FaShareSquare className="text-sm sm:text-base" />
              <span className="font-medium">Share this course</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailsCard;