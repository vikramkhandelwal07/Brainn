"use client";

import React from "react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is my learning progress and data secure on Brainn?",
      answer:
        "Absolutely. We use 256-bit encryption and follow industry-standard practices to keep your data secure. Our platform includes two-factor authentication and undergoes regular security checks.",
    },
    {
      question: "Can I access my courses from multiple devices?",
      answer:
        "Yes, you can seamlessly switch between mobile, tablet, and desktop. Your progress syncs automatically across all devices with your Brainn account.",
    },
    {
      question: "How does Brainn's AI help improve my learning?",
      answer:
        "Brainn's AI tracks your learning patterns, strengths, and challenges to deliver personalized study plans, smart quizzes, and timely reminders. It adapts to your pace to boost your understanding and retention.",
    },
    {
      question: "Can I download course materials for offline use?",
      answer:
        "Yes, Brainn allows you to download lecture notes, assignments, and select video lessons for offline access. This feature is available on all premium plans.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-neutral-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-neutral-800 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left text-white hover:bg-neutral-700 transition-colors"
                onClick={(e) => {
                  const answer = e.currentTarget.nextElementSibling;
                  const icon = e.currentTarget.querySelector("svg");
                  answer.classList.toggle("hidden");
                  icon.classList.toggle("rotate-180");
                }}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <svg
                  className="w-6 h-6 text-gray-400 transform transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="faq-answer hidden p-4 text-gray-400 border-t border-neutral-700">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
