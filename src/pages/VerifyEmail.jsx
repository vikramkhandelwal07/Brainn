/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/authApi";
import { setSignupData } from "../slices/authSlice";
import { ACCOUNT_TYPE } from "../utils/Constants";
import { toast } from "react-hot-toast";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      const savedData = localStorage.getItem("signupData");
      if (savedData) {
        dispatch(setSignupData(JSON.parse(savedData)));
      } else {
        navigate("/signup");
      }
    }
  }, [dispatch, signupData, navigate]);
  

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    if (!signupData) {
      toast.error("Signup data missing. Please sign up again.");
      return;
    }

    const {
      firstName,
      lastName,
      email,
      contactNumber,
      password,
      confirmPassword,
      accountType,
    } = signupData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !contactNumber ||
      !password ||
      !confirmPassword ||
      !accountType
    ) {
      toast.error("All fields are required");
      return;
    }

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    console.log("Verifying with:", signupData, "OTP:", otp);
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        contactNumber,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center bg-gradient-to-tl from-pink-700/50 via-black to-gray-900 relative overflow-hidden">
      {/* Blurred Background Bubbles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply blur-xl animate-pulse-delay" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply blur-xl animate-pulse-delay-long" />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-600 border-t-yellow-400 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin-reverse"></div>
          </div>
          <p className="text-gray-300 text-lg font-medium animate-pulse">Verifying your email...</p>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-md mx-auto">
          {/* Glassmorphic Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-6 shadow-lg">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-white font-bold text-3xl mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Verify Your Email
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                We've sent a 6-digit verification code to{" "}
                <span className="text-yellow-400 font-medium">{signupData?.email}</span>
              </p>
            </div>

            {/* OTP Input */}
            <form onSubmit={handleVerifyAndSignup} className="space-y-8">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-300 text-center">
                  Enter verification code
                </label>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => (
                      <input
                        {...props}
                        placeholder="0"
                        className="rounded-xl text-white text-2xl font-bold text-center tracking-wider bg-gray-800/50 backdrop-blur-sm border-2 border-gray-600/50 focus:border-yellow-400 focus:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 hover:border-gray-500 hover:bg-gray-700/30"
                        style={{
                          width: "50px",       // Force width
                          height: "50px",      // Force height
                          margin: "0 6px",
                        }}
                      />
                    )}
                    containerStyle={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  />

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={otp.length !== 6}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {otp.length === 6 ? "Verify & Create Account" : `Enter ${6 - otp.length} more digits`}
              </button>
            </form>

            {/* Actions */}
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-700/50">
              <Link to="/signup" className="group">
                <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200">
                  <BiArrowBack className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                  <span className="font-medium">Back to Signup</span>
                </div>
              </Link>

              <button
                className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
                  onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              >
                <RxCountdownTimer className="w-4 h-4 transition-transform duration-200 group-hover:rotate-12" />
                <span>Resend Code</span>
              </button>
            </div>

            {/* Help Message */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Didn't receive the code? Check your spam folder or{" "}
                <button
                    onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 underline"
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
