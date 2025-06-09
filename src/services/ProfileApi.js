import { toast } from "react-hot-toast";

import { setLoading, setUser } from "../slices/userProfileSlice";
import { apiConnector } from "./apiConnector";
import { profileEndpoints } from "./api";
import { logout } from "./authApi";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];

  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");

    // Add more detailed logging
    console.log("Response status:", response?.status);
    console.log("Response data:", response?.data);

    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Failed to fetch enrolled courses"
      );
    }

    result = response.data.data;
    console.log("Enrolled courses result:", result);
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR", error);
    console.error("Full error object:", error);

    // Log more specific error details
    if (error.response) {
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    }

    toast.error("Could Not Get Enrolled Courses");
    toast.dismiss(toastId);

    throw error;
  }

  toast.dismiss(toastId);
  return result;
}
export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses;
  } catch (error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}
