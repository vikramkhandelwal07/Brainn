import { combineReducers } from "redux";
import authReducer from "../slices/authSlice"
import userProfileReducer from "../slices/userProfileSlice"
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"
const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  cart: cartReducer,
  course:courseReducer,
  viewCourse:viewCourseReducer,

})
export default rootReducer;



