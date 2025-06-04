import {Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/sections/auth/OpenRoute";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
function App() {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
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
      </Routes> 
    </div>
  )
}

export default App;
