import React from "react";
import HighlightText from "../../ui/highlight";

const BentoGridArray = [
  {
    order: -1, 
    heading: "Accessible Education for All",
    highlightText: "Learn Anytime, Anywhere",
    description:
      "Studynotion collaborates with over 275 top institutions to offer flexible, affordable, and career-relevant online education for individuals and organizations around the globe.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Industry-Aligned Curriculum",
    description:
      "Our curriculum is crafted with direct input from industry experts, ensuring you're gaining the most relevant and practical skills needed in today’s job market.",
  },
  {
    order: 2,
    heading: "Flexible & Practical Learning",
    description:
      "We combine interactive, hands-on learning with the flexibility to study at your own pace—making education both effective and accessible.",
  },
  {
    order: 3,
    heading: "Recognized Certifications",
    description:
      "Earn certifications that are respected by employers and recognized across industries—boosting your resume and credibility.",
  },
  {
    order: 4,
    heading: "Smart Auto-Grading System",
    description:
      "Our intelligent auto-grading provides instant, unbiased feedback to help you track progress and stay motivated throughout your learning journey.",
  },
  {
    order: 5,
    heading: "Career-Ready Skills",
    description:
      "Studynotion prepares you with real-world skills and project experience so you're ready to hit the ground running in your next job.",
  },
];

const BentoGrid = () => {
  // Sort cards by order to ensure correct display order
  const sortedCards = [...BentoGridArray].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 mb-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-start mb-8 mt-14 ml-4">About Us</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {sortedCards.map((card, i) => {
          const isHighlightCard = card.highlightText !== undefined;
          const cardBgClass =
            card.order % 2 === 1
              ? "bg-black"
              : card.order % 2 === 0
                ? "bg-gray-800"
                : "bg-transparent";
          const cardHeightClass = "h-[320px]";
          const colSpanClass = i === 0 ? "xl:col-span-2" : "";
          const colStartClass = card.order === 3 ? "xl:col-start-2" : "";

          return (
            <div
              key={i}
              className={`${colSpanClass} ${colStartClass} ${cardBgClass} ${cardHeightClass} p-4 rounded-md`}
            >
              {isHighlightCard ? (
                <div className="flex flex-col gap-3 pb-10 xl:pb-0 sm:pb-20">
                  <div className="text-2xl sm:text-4xl font-semibold text-start text-white">
                    {card.heading} <HighlightText text={card.highlightText} />
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">
                    {card.description}
                  </p>
                  <div className="w-fit mt-2">
                    <button
                      className="bg-[#dcff51] text-black px-6 py-2 rounded-md font-semibold hover:brightness-95 transition-all"
                      onClick={() => (window.location.href = card.BtnLink)}
                    >
                      {card.BtnText}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 flex flex-col gap-4 sm:gap-8">
                  <h1 className="text-gray-100 text-lg sm:text-xl text-center font-bold">
                    {card.heading}
                  </h1>
                  <p className="text-gray-300 text-sm sm:text-base px-2">
                    {card.description}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BentoGrid;
