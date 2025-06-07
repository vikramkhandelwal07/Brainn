import { toast } from "react-hot-toast";

import { setUser } from "../slices/userProfileSlice";
import { apiConnector } from "./apiConnector";
import { settingsEndpoints } from "./api";
import { logout } from "./authApi";

const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
  GET_USER_DETAILS_API,
} = settingsEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Update localStorage when display picture is updated
      const updatedUser = response.data.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(updatedUser));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR", error);
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
}

// In your settingsApi.js file
export function getUserProfile(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("GET_USER_DETAILS_API API RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const user = response.data.data;
      const userImage = user.image
        ? user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`;

      const userWithImage = { ...user, image: userImage };

      // Save user to localStorage when fetched from API
      localStorage.setItem("user", JSON.stringify(userWithImage));

      dispatch(setUser(userWithImage));
    } catch (error) {
      console.log("GET_USER_DETAILS_API API ERROR", error);
    }
  };
}

export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("UPDATE_PROFILE_API API RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;

      const updatedUser = {
        ...response.data.updatedUserDetails,
        image: userImage,
      };

      console.log("About to update localStorage with:", updatedUser);
      console.log(
        "Current localStorage before update:",
        localStorage.getItem("user")
      );

      dispatch(setUser(updatedUser));

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      console.log("localStorage after update:", localStorage.getItem("user"));
      console.log(
        "Parsed localStorage:",
        JSON.parse(localStorage.getItem("user"))
      );

      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR", error);
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}

export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CHANGE_PASSWORD_API API RESPONSE", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password Changed Successfully");
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}

export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("DELETE_PROFILE_API API RESPONSE", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Deleted Successfully");
      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR", error);
      toast.error("Could Not Delete Profile");
    }
    toast.dismiss(toastId);
  };
}
