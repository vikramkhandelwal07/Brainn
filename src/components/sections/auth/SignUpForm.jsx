import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/authApi";
import { ACCOUNT_TYPE } from "../../../utils/Constants";

import Tab from "../../common/Tab";
import { FaUser, FaPhone, FaLock } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, contactNumber, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const isContactValid = (number) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian pattern: 10 digits starting from 6–9
    return phoneRegex.test(number);
  };

  const isPasswordValid = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_]/.test(password);
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!isPasswordValid(password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      );
      return;
    }
    if (!isContactValid(contactNumber)) {
      toast.error("Please enter a valid 10-digit contactNumber number starting with 6-9");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div className="border-white/50 border-2 p-10 rounded-2xl w-[32rem]">
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          {/* First Name */}
          <label className="relative w-full">
            <p className="mb-1 text-sm text-gray-100">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <FaUser className="absolute top-[38px] left-3 text-gray-400 text-lg" />
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="w-full rounded-md bg-gray-800 p-3 pl-10 text-gray-100"
            />
          </label>

          {/* Last Name */}
          <label className="relative w-full">
            <p className="mb-1 text-sm text-gray-100">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <FaUser className="absolute top-[38px] left-3 text-gray-400 text-lg" />
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded-md bg-gray-800 p-3 pl-10 text-gray-100"
            />
          </label>
        </div>

        {/* Email */}
        <label className="relative w-full">
          <p className="mb-1 text-sm text-gray-100">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <SiGmail className="absolute top-[38px] left-3 text-gray-400 text-lg" />
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded-md bg-gray-800 p-3 pl-10 text-gray-100"
          />
        </label>

        {/* Contact */}
        <label className="relative w-full">
          <p className="mb-1 text-sm text-gray-100">
            Contact Number <sup className="text-pink-200">*</sup>
          </p>
          <FaPhone className="absolute top-[38px] left-3 text-gray-400 text-lg " />
          <input
            required
            type="tel"
            name="contactNumber"
            value={contactNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,10}$/.test(value)) {
                handleOnChange(e);
              }
            }}
            placeholder="Enter contactNumber number"
            className="w-full rounded-md bg-gray-800 p-3 pl-10 text-gray-100"
          />
        </label>

        <div className="flex gap-x-4">
          {/* Password */}
          <label className="relative w-full">
            <p className="mb-1 text-sm text-gray-100">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <FaLock className="absolute top-[38px] left-3 text-gray-400 text-lg" />
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter password"
              className="w-full rounded-md bg-gray-800 p-3 pl-10 pr-10 text-gray-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-gray-400"
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </button>
          </label>

          {/* Confirm Password */}
          <label className="relative w-full">
            <p className="mb-1 text-sm text-gray-100">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <FaLock className="absolute top-[38px] left-3 text-gray-400 text-lg" />
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm password"
              className="w-full rounded-md bg-gray-800 p-3 pl-10 pr-10 text-gray-100"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-gray-400"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible className="ml-10 text-white" size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </label>

        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-yellow-50 py-2 px-4 font-medium text-gray-900 hover:bg-black/50 hover:text-white hover:scale-[1.03] transition duration-150 ring-2 ring-white"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
