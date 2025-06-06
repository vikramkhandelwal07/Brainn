import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';
import { FreeMode, Pagination, Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';

import CourseCard from './CourseCard';

const CourseSlider = ({ Courses = [], title = "Featured Courses" }) => {
  return (
    <div className="relative w-full">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          {title}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>

      {Courses.length > 0 ? (
        <div className="relative px-4 md:px-8">
          {/* Gradient overlays for modern effect */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white via-white/50 to-transparent z-10 pointer-events-none hidden md:block"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white via-white/50 to-transparent z-10 pointer-events-none hidden md:block"></div>

          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            modules={[FreeMode, Pagination, Autoplay, Navigation, EffectCoverflow]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              bulletClass: 'swiper-pagination-bullet custom-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
            }}
            freeMode={{
              enabled: true,
              sticky: true,
            }}
            effect="slide"
            grabCursor={true}
            centeredSlides={false}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3.5,
                spaceBetween: 35,
              },
            }}
            className="max-h-[35rem] pb-12"
          >
            {Courses.map((course, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                  <CourseCard
                    course={course}
                    Height="h-[280px]"
                    className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-white hover:scale-110 transition-all duration-300 group">
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>

          <div className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-white hover:scale-110 transition-all duration-300 group">
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Courses Available</h3>
            <p className="text-gray-500">Check back later for new courses or browse our other categories.</p>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .custom-bullet {
          background: rgba(99, 102, 241, 0.3) !important;
          width: 12px !important;
          height: 12px !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
        }
        
        .custom-bullet-active {
          background: linear-gradient(45deg, #6366f1, #8b5cf6) !important;
          width: 16px !important;
          height: 16px !important;
          transform: scale(1.1) !important;
        }
        
        .swiper-pagination {
          bottom: 0 !important;
        }
        
        .swiper-button-disabled {
          opacity: 0.3 !important;
          cursor: not-allowed !important;
        }
      `}</style>
    </div>
  );
};

export default CourseSlider;