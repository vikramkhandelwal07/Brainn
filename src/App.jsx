/* eslint-disable no-unused-vars */
import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/sections/auth/OpenRoute";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import Error from "./pages/Error404";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import TermsAndConditions from "./pages/legal/TermsAndCondition";
import { ACCOUNT_TYPE } from "./utils/Constants";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import PrivateProtectedRoute from "./components/sections/auth/PrivateProtectedRoute";
import MyProfile from "./components/sections/Dashbaord/MyProfile";
import Settings from "./components/sections/Dashbaord/Settings/Settings"
import Loading from "./components/common/LoadingSpinner";
import RateUs from "./pages/RateUs";
import { apiConnector } from './services/apiConnector';
import { setUser } from './slices/userProfileSlice';
import { setToken } from './slices/authSlice';
import { getUserProfile } from './services/settingsApi';
import Cart from "./components/sections/Dashbaord/cart/Cart"
import MyEnrolledCourses from "./components/sections/Dashbaord/MyEnrolledCourses";
import Instructor from "./components/sections/Dashbaord/InstructorDashboard/Instructor"
import AddCourse from "./components/sections/Dashbaord/AddCourse/AddCourse"
import MyCourses from "./components/sections/Dashbaord/MyCourses";
import EditCourse from "./components/sections/Dashbaord/EditCourse";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.userProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    // Restore token if available
    if (savedToken && !token) {
      const parsedToken = JSON.parse(savedToken);
      dispatch(setToken(parsedToken));
    }

    // Restore user if available
    if (savedUser && !user) {
      try {
        const parsedUser = JSON.parse(savedUser);
        dispatch(setUser(parsedUser));
      } catch (error) {
        console.log("Error parsing saved user data:", error);
        localStorage.removeItem('user'); // Remove corrupted data
      }
    }

    // If we have token but no user, fetch fresh user data
    if (savedToken && !savedUser) {
      const parsedToken = JSON.parse(savedToken);
      console.log("Fetching fresh user data from API...");
      dispatch(getUserProfile(parsedToken));
    }
  }, [token, user, dispatch]);


  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/rateus" element={<RateUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route
          element={
            <PrivateProtectedRoute>
              <Dashboard />
            </PrivateProtectedRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<MyEnrolledCourses />}
              />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
        </Route>
        {/* <Route
          element={
            <PrivateProtectedRoute>
              <ViewCourse />
            </PrivateProtectedRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route> */}
        <Route path="*" element={<Error />} />
      </Routes>
      {/* <BackToTop /> */}
      {/* <Chatbot /> */}
    </div>
  )
}

export default App;