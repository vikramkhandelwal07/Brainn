import { useSelector } from "react-redux"

import CartCourses from "./CartCourses"
import CartTotalAmount from "./CartTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="min-h-screen bg-black px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 md:mb-12 text-center">
          <h1 className="mb-3 sm:mb-4 py-2 sm:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent leading-tight">
            Shopping Cart
          </h1>
          <div className="mx-auto h-0.5 sm:h-1 w-16 sm:w-20 md:w-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
        </div>

        {/* Cart Items Counter */}
        <div className="mb-4 sm:mb-6 md:mb-8 rounded-xl sm:rounded-2xl bg-white/90 sm:bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate">
                    {totalItems} {totalItems === 1 ? 'Course' : 'Courses'} in Cart
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 hidden xs:block">Ready for checkout</p>
                </div>
              </div>
              {totalItems > 0 && (
                <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-green-100 flex-shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-green-600">{totalItems}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart Content */}
        {total > 0 ? (
          <div className="grid gap-4 sm:gap-6 md:gap-8 xl:grid-cols-3 xl:gap-12">
            {/* Cart Items - Takes up 2 columns on extra large screens */}
            <div className="xl:col-span-2 order-2 xl:order-1">
              <CartCourses />
            </div>

            {/* Total Amount Sidebar - Takes up 1 column on extra large screens */}
            <div className="xl:col-span-1 order-1 xl:order-2">
              <div className="xl:sticky xl:top-8">
                <CartTotalAmount />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[300px] sm:min-h-[400px] md:min-h-[500px] items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
              {/* Empty Cart Icon */}
              <div className="mx-auto mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
                <svg className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="20" cy="20" r="1" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" opacity="0.5" />
                </svg>
              </div>

              {/* Empty Cart Text */}
              <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                Your cart is empty
              </h3>
              <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-500 leading-relaxed px-2">
                Looks like you haven't added any courses yet. Start exploring and find your perfect course!
              </p>

              {/* Browse Courses Button */}
              <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 px-6 sm:px-8 py-2.5 sm:py-3 md:py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 w-full xs:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2 text-sm sm:text-base">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Browse Courses
                </span>
              </button>

              {/* Additional Empty State Elements */}
              <div className="mt-6 sm:mt-8 flex justify-center items-center gap-4 sm:gap-6 text-gray-400">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden xs:inline">Easy checkout</span>
                  <span className="xs:hidden">Easy</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden xs:inline">24/7 support</span>
                  <span className="xs:hidden">Support</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="hidden xs:inline">Money back</span>
                  <span className="xs:hidden">Refund</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}