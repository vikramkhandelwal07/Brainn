import { combineReducers } from "redux";
import authReducer from "../slices/authSlice"
import userProfileReducer from "../slices/userProfileSlice"
import cartReducer from "../slices/cartSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  userProfile: userProfileReducer,
  cart: cartReducer,


})
export default rootReducer;
