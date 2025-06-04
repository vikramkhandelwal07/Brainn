import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { SiGmail } from "react-icons/si"
import { FaLock } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../../services/authApi"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div className="w-[24rem] h-[24rem] rounded-2xl bg-white/10 backdrop-blur-md shadow-lg border-2 border-white/30  text-white p-6 transition-all hover:scale-[1.03] duration-300 ">
      <form
        onSubmit={handleOnSubmit}
        className="flex w-full flex-col gap-y-4"
      >
        <label className="w-full relative">
          <p className="mb-1 text-base text-white">
            Email Address <sup className="text-red-400 text-base absolute 
            top-[-0.1rem]" >*</sup>
          </p>
          <div className="flex flex-row items-center ">
            <div className="bg-white/10 p-3 rounded-l-md">
              <SiGmail className="text-gray-400 text-2xl " />
            </div>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              className="w-full rounded-r-md bg-white/10 p-3 text-white placeholder:text-white/70 shadow-inner outline-none  "
            />
          </div>
        </label>

        <label className="w-full relative">
          <p className="mb-1 text-base text-white">
            Password <sup className="text-red-400 text-base absolute 
            top-[-0.1rem]" >*</sup>
          </p>
          <div className="flex flex-row items-center ">
            <div className="bg-white/10 p-3 rounded-l-md">
              <FaLock className="text-gray-400 text-2xl" />
            </div>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter password"
              className="w-full  bg-white/10 p-3 text-white placeholder:text-white/70 shadow-inner outline-none"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="bg-white/10 p-[0.88rem] cursor-pointer text-2xl "
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={20} fill="#ccc" />
              ) : (
                <AiOutlineEye fontSize={20} fill="#ccc" />
              )}
            </span>
          </div>
          
          <Link to="/forgot-password">
            <p className="mt-2 text-right text-sm text-blue-100 hover:underline">
              Forgot Password?
            </p>
          </Link>
        </label>
        <button
          type="submit"
          className="mt-8 rounded-md bg-yellow-50 py-2 px-4 font-medium text-black hover:brightness-105   hover:bg-black/50 hover:text-white hover:scale-[1.03] transition duration-150 ring-2 ring-white "
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default LoginForm
