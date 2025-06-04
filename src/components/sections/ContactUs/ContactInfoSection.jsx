import React from "react";
import * as Icon1 from "react-icons/bi";
import * as Icon2 from "react-icons/io5";
import * as Icon3 from "react-icons/hi2";

const ContactInfo = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat with us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
    linkType: "email"
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    linkType: null
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri from 8am to 5pm",
    details: "+123 456 7869",
    linkType: "phone"
  },
];

const ContactInfoSection = () => {
  return (
    <div className=" md:grid-cols-3 gap-6 p-8  bg-gradient-to-b from-gray-900 via-black to-black shadow-xl flex flex-col ">
      {ContactInfo.map((ele, i) => {
        const Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];

        const detailElement = ele.linkType === "email" ? (
          <a href={`mailto:${ele.details}`} className="text-indigo-400 hover:underline font-medium">
            {ele.details}
          </a>
        ) : ele.linkType === "phone" ? (
          <a href={`tel:${ele.details}`} className="text-indigo-400 hover:underline font-medium">
            {ele.details}
          </a>
        ) : (
          <p className="text-gray-300">{ele.details}</p>
        );

        return (
          <div
            key={i}
            className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:shadow-lg hover:border-indigo-500 transition-all duration-300 flex flex-col gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-600/20 rounded-full text-indigo-400 shadow-md">
                <Icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white">{ele.heading}</h3>
            </div>
            <p className="text-sm text-gray-400">{ele.description}</p>
            {detailElement}
          </div>
        );
      })}
    </div>
  );
};

export default ContactInfoSection;
