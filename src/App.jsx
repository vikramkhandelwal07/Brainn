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
import TermsAndConditions from "./pages/legal/TermsAndCondition";
import {ACCOUNT_TYPE} from "./utils/Constants";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";
// import Dashboard from "./pages/Dashboard";
// import MyProfile from "./pages/dashboard/MyProfile";
// import Settings from "./pages/dashboard/Settings";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); 
  }, []);

  if (loading) {
    return (
      <div>
       
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="catalog/:catalogName" element={<Catalog />} /> */}
        {/* <Route path="courses/:courseId" element={<CourseDetails />} /> */}
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
        {/* <Route path="/project" element={<Project />} />
        <Route path="/rateus" element={<Rateus />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        {/* <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        > */}
          {/* <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Settings />} /> */}
          {/* {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
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
        </Route> */}
        {/* <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
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
