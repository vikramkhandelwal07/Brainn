import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, CreditCard, Sparkles } from "lucide-react"

import IconButton from "../../../common/IconButton"
import { buyCourse } from "../../../../services/studentApi"

export default function CartTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.userProfile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[320px] group">
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/90 via-slate-800/80 to-slate-900/95 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl"></div>

        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 shadow-lg">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Order Summary
              </h3>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                {cart.length} {cart.length === 1 ? 'Course' : 'Courses'}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent mb-8"></div>

          {/* Total Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-500/25"></div>
              <p className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                Total Amount
              </p>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                ₹{total.toLocaleString('en-IN')}
              </span>
              <div className="px-2 py-1 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                <span className="text-xs font-semibold text-green-400">
                  Best Price
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400">
              Inclusive of all taxes and fees
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-700/30">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50"></div>
                <span className="text-sm text-slate-300">Lifetime Access</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-700/30">
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"></div>
                <span className="text-sm text-slate-300">Certificate Included</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-700/30">
                <div className="w-2 h-2 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"></div>
                <span className="text-sm text-slate-300">30-Day Money Back</span>
              </div>
            </div>
          </div>

          {/* Buy Button */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <button
              onClick={handleBuyCourse}
              className="relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <CreditCard className="w-5 h-5" />
              Buy Now
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            </div>
            Secure Payment with 256-bit SSL Encryption
          </div>
        </div>
      </div>
    </div>
  )
}