import {Route, Routes } from "react-router-dom"
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/common/Navbar";
function App() {
  return (
    <div className="w-full min-h-screen bg-black flex flex-col">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes> 
    </div>
  )
}

export default App;
