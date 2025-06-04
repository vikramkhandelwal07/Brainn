import React from 'react'
import BentoGrid from '../components/sections/AboutUs/BentoGrid'
import Footer from "../components/common/Footer";
import StatsSection from '../components/sections/AboutUs/StatsSection';
import MissionVisionSection from '../components/sections/AboutUs/MissionAndVision';
import FounderSection from '../components/sections/AboutUs/FounderSection';
const About = () => {
  return (
    <div className='w-full h-screen bg-black'>
      <div className='w-full h-screen bg-gradient-to-tr from-violet-800  via-black to-black '>
        {/* sectionn1 */}
        <BentoGrid/>
        <StatsSection/>
        <MissionVisionSection/>
        <FounderSection/>
        <Footer/>
      </div>
      
    </div>
  )
}

export default About
