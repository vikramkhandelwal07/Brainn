import { useSelector } from "react-redux"

import CartCourses from "./CartCourses"
import CartTotalAmount from "./CartTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 py-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Shopping Cart
          </h1>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
        </div>

        {/* Cart Items Counter */}
        <div className="mb-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 21a2 2 0 100-4 2 2 0 000 4zm-8 0a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    {totalItems} {totalItems === 1 ? 'Course' : 'Courses'} in Cart
                  </p>
                  <p className="text-sm text-gray-500">Ready for checkout</p>
                </div>
              </div>
              {totalItems > 0 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                  <span className="text-sm font-bold text-green-600">{totalItems}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart Content */}
        {total > 0 ? (
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
            {/* Cart Items - Takes up 2 columns on large screens */}
            <div className="lg:col-span-2">
              <CartCourses />
            </div>

            {/* Total Amount Sidebar - Takes up 1 column on large screens */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <CartTotalAmount />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M8 11v6a2 2 0 002 2h4a2 2 0 002-2v-6M8 11h8" />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-800">Your cart is empty</h3>
              <p className="mb-6 text-gray-500">Looks like you haven't added any courses yet</p>
              <button className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl">
                Browse Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}