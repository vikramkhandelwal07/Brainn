import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseForm from "./CourseForm/CourseForm";
import CourseInformationForm from "./courseDetails/CourseInformationForm";
import PublishCourse from "./PublishCourse";

export default function RenderFlow() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      {/* Progress Steps */}
      <div className="mb-12 " >
        {/* Step indicators */}
        <div className="relative mb-6 flex w-full justify-center gap-16">
          {steps.map((item, index) => (
            <div key={item.id} className="relative flex flex-col items-center  ">
              {/* Step Circle */}
              <div
                className={`relative z-10 grid w-12 h-12 place-items-center rounded-full border-2 transition-all duration-300 ${step === item.id
                    ? "border-blue-400 bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/25"
                    : step > item.id
                      ? "border-green-400 bg-green-500/20 text-green-400 shadow-lg shadow-green-500/25"
                      : "border-gray-600 bg-gray-800/50 text-gray-500"
                  }`}
              >
                {step > item.id ? (
                  <FaCheck className="text-green-400 text-sm font-bold" />
                ) : (
                  <span className="font-semibold text-sm">{item.id}</span>
                )}
                {step === item.id && (
                  <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-pulse" />
                )}
              </div>

              {/* Step Title */}
              <div className="mt-2 text-center">
                <p
                  className={`text-sm font-medium transition-colors duration-300 ${step === item.id
                      ? "text-blue-400"
                      : step > item.id
                        ? "text-green-400"
                        : "text-gray-500"
                    }`}
                >
                  {item.title}
                </p>
                {step === item.id && (
                  <div className="mt-1 h-0.5 w-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto" />
                )}
              </div>

              {/* Connector Line */}
              {index !== steps.length - 1 && (
                <div className="absolute top-6 right-[-100px] ">
                  <div
                    className={`h-0.5 w-40 transition-all duration-500 ${step > item.id
                        ? "bg-gradient-to-r from-green-400 to-blue-400 animate-pulse"
                        : "bg-gray-700"
                      }`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <div className="rounded-xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm p-8 shadow-xl">
          {step === 1 && <CourseInformationForm />}
          {step === 2 && <CourseForm />}
          {step === 3 && <PublishCourse />}
        </div>
      </div>
    </>
  );
}
