import React, { useEffect, useState } from 'react'
import RatingStars from "../../common/RatingStars";
import GetAverageRating from "../../../utils/AverageRating";
import { Link } from 'react-router-dom';

const CourseCard = ({ course, Height }) => {


  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAverageRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course])



  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="bg-gray-900/10 rounded-2xl">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumbnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-2xl font-semibold font-poppins text-white">{course?.courseName}</p>
            <p className="text-base text-gray-200 font-normal font-mono">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2 text-yellow-500 font-poppins">
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-gray-500">{avgReviewCount || 0}</span>
              <span className="text-gray-500 font-poppins">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-2xl font-semibold font-poppins text-white">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default CourseCard;
