import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../slices/authSlice";
import { resetCart } from "../slices/cartSlice";
import { setUser } from "../slices/userProfileSlice";
import { apiConnector } from "./apiConnector";
import { endpoints } from "./api";
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

const handleApiError = (error, defaultMessage = "Something went wrong") => {
  console.error("API ERROR:", error);
  toast.error(error?.response?.data?.message || defaultMessage);
};

// Send OTP
export const sendOtp = (email, navigate) => async (dispatch) => {
  const toastId = toast.loading("Sending OTP...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", SENDOTP_API, {
      email,
      checkUserPresent: true,
    });

    if (!response.data.success) throw new Error(response.data.message);

    toast.success("OTP sent successfully");
    navigate("/verify-email");
  } catch (error) {
    handleApiError(error, "Could not send OTP");
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};

// Signup
export const signUp =
  (
    accountType,
    firstName,
    lastName,
    email,
    contactNumber,
    password,
    confirmPassword,
    otp,
    navigate
  ) =>
  async (dispatch) => {
    const toastId = toast.loading("Creating account...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        contactNumber,
        password,
        confirmPassword,
        otp,
      });

      if (!response.data.success) throw new Error(response.data.message);

      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      handleApiError(error, "Signup failed");
      navigate("/signup");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };

// Login
export const login = (email, password, navigate) => async (dispatch) => {
  const toastId = toast.loading("Logging in...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", LOGIN_API, { email, password });

    if (!response.data.success) throw new Error(response.data.message);

    const { token, user } = response.data;
    const userImage =
      user?.image ||
      `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;

    dispatch(setToken(token));
    dispatch(setUser({ ...user, image: userImage }));
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));

    toast.success("Login successful");
    navigate("/dashboard/my-profile");
  } catch (error) {
    handleApiError(error, "Login failed");
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};

// Logout
export const logout = (navigate) => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  dispatch(resetCart());
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  toast.success("Logged out");
  navigate("/");
};

// Send Reset Password Email
export const getPasswordResetToken =
  (email, setEmailSent) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      if (!response.data.success) throw new Error(response.data.message);

      toast.success("Reset email sent");
      setEmailSent(true);
    } catch (error) {
      handleApiError(error, "Failed to send password reset email");
    } finally {
      dispatch(setLoading(false));
    }
  };

// Reset Password
export const resetPassword =
  (password, confirmPassword, token) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      if (!response.data.success) throw new Error(response.data.message);

      toast.success("Password has been reset successfully");
    } catch (error) {
      handleApiError(error, "Unable to reset password");
    } finally {
      dispatch(setLoading(false));
    }
  };
