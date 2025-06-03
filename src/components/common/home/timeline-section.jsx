import React from "react";
import TimeLineImage from "../../../assets/TimeLineLogo/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const TimeLine = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skill",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <section className="relative z-0 overflow-visible">
      <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center pb-40">
        {/* Timeline Info */}

        <div className="lg:w-[45%] flex flex-col gap-6">
          {TimeLine.map((ele, i) => (
            <div className="flex flex-col" key={i}>
              <div className="flex gap-6 items-start">
                <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-lg mb-2">
                  <img src={ele.Logo} alt={ele.Heading} />
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{ele.Heading}</h2>
                  <p className="text-base text-gray-700">{ele.Description}</p>
                </div>
              </div>
              {i !== TimeLine.length - 1 && (
                <div className="hidden lg:block h-14 border-r border-dotted border-black w-2 mx-5 mt-5"></div>

              )}
            </div>
          ))}
        </div>

        {/* Image + Stats */}
        <div className="relative w-fit h-fit shadow-xl">
          {/* Overlay stats */}
          <div className="absolute lg:left-1/2 lg:bottom-0 transform lg:-translate-x-1/2 lg:translate-y-1/2 bg-gradient-to-r from-black via-pink-700 to-black text-white uppercase py-6 px-4 flex lg:flex-row flex-col items-center gap-4 z-10">
            {/* Experience */}
            <div className="flex gap-4 items-center lg:border-r border-white pr-8">
              <h1 className="text-3xl font-bold">10</h1>
              <span className="text-sm w-[90px] text-green-200">Years Experience</span>
            </div>

            {/* Courses */}
            <div className="flex gap-4 items-center pl-8">
              <h1 className="text-3xl font-bold">250</h1>
              <span className="text-sm w-[90px] text-green-200">Types of Courses</span>
            </div>
          </div>

          <img
            src={TimeLineImage}
            alt="Timeline"
            className="object-cover h-[400px] lg:h-auto shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
