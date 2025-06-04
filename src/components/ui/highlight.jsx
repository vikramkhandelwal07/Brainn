import React from "react";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-tr from-[#dcff51] via-yellow-600 to-white text-transparent bg-clip-text font-bold">
      {text}
    </span>
  );
};

export default HighlightText;
