import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import brainnLogo from '../../assets/Brainn.png'
import {
  FaFacebook,
  FaGoogle,
  FaYoutube,
  FaXTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa6";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = [
  { name: "Forums", link: "forums" },
  { name: "Chapters", link: "chapters" },
  { name: "Events", link: "events" },
  {
    name: "Contribute",
    link: "https://github.com", // Add actual contribution link
    external: true,
  },
];

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="flex flex-col lg:flex-row gap-8 justify-between w-11/12 max-w-maxContent mx-auto py-14">
        {/* Left Column */}
        <div className="w-full flex flex-col lg:flex-row pb-5 border-b border-gray-700">
          <div className="w-full lg:w-[50%] flex flex-wrap justify-between lg:border-r border-gray-700 pr-5 gap-6">
            {/* Company Section */}
            <div className="w-full lg:w-[30%]">
              <img src={brainnLogo} alt="Logo" className="object-contain h-20" />
              <h1 className="font-semibold text-md mt-4">Company</h1>
              <div className="flex flex-col gap-2 mt-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <Link
                    key={i}
                    to={`/${ele.toLowerCase()}`}
                    className="text-md hover:text-violet-600 transition"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
              {/* Social Icons */}
              <div className="flex gap-3 mt-4 text-lg">
                {[
                  { icon: <FaFacebook />, link: "https://www.facebook.com" },
                  { icon: <FaGoogle />, link: "https://projects.100xdevs.com" },
                  { icon: <FaXTwitter />, link: "https://www.twitter.com" },
                  { icon: <FaYoutube />, link: "https://www.youtube.com" },
                  { icon: <FaLinkedin />, link: "https://www.linkedin.com" },
                  { icon: <FaInstagram />, link: "https://www.instagram.com" },
                ].map(({ icon, link }, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Social link ${i}`}
                    className="hover:text-violet-600 transition"
                  >
                    {icon}
                  </a>
                ))}
              </div>
              {/* Email Form */}
              <div className="mt-4">
                <h4 className="mb-1">Email Us</h4>
                <div className="flex items-center">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="border-2 border-pink-500 rounded px-2 py-1 w-44 text-black"
                  />
                  <a href="mailto:abc@gmail.com" className="ml-2">
                    <SendIcon className="text-pink-500 hover:text-violet-600 cursor-pointer" />
                  </a>
                </div>
              </div>
            </div>

            {/* Resources and Support */}
            <div className="w-full lg:w-[30%]">
              <h1 className="font-semibold text-xl">Resources</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((item, i) => (
                  <Link
                    key={i}
                    to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-md hover:text-violet-600 transition"
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <h1 className="font-semibold text-xl mt-6">Support</h1>
              <Link to="/help-center" className="text-md hover:text-violet-600 mt-2 block">
                Help Center
              </Link>
            </div>

            {/* Plans and Community */}
            <div className="w-full lg:w-[30%]">
              <h1 className="font-semibold text-xl">Plans</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((item, i) => (
                  <Link
                    key={i}
                    to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-md hover:text-violet-600 transition"
                  >
                    {item}
                  </Link>
                ))}
              </div>
              <h1 className="font-semibold text-xl mt-6">Community</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Community.map(({ name, link, external }, i) => (
                  external ? (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-md hover:text-violet-600 transition"
                    >
                      {name}
                    </a>
                  ) : (
                    <Link
                      key={i}
                      to={`/${link}`}
                      className="text-md hover:text-violet-600 transition"
                    >
                      {name}
                    </Link>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links Column */}
          <div className="w-full lg:w-[50%] flex flex-wrap justify-between pl-5 gap-6 mt-6 lg:mt-0">
            {FooterLink2.map((group, i) => (
              <div key={i} className="w-full lg:w-[30%]">
                <h1 className="font-semibold text-xl">{group.title}</h1>
                <div className="flex flex-col gap-2 mt-2">
                  {group.links.map((linkItem, index) => (
                    <Link
                      key={index}
                      to={linkItem.link}
                      className="text-md hover:text-violet-600 transition"
                    >
                      {linkItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="flex flex-col lg:flex-row items-center justify-between w-11/12 max-w-maxContent mx-auto pb-10 pt-4 border-t border-gray-700 text-sm">
        <div className="flex flex-col lg:flex-row gap-4 w-full justify-between items-center">
          <div className="flex flex-wrap justify-center lg:justify-start">
            {BottomFooter.map((ele, i) => (
              <Link
                key={i}
                to={`/${ele.toLowerCase().replace(/\s+/g, "-")}`}
                className={`px-3 ${i < BottomFooter.length - 1 ? "border-r border-gray-700" : ""} hover:text-violet-400 transition`}
              >
                {ele}
              </Link>
            ))}
          </div>
          <div className="text-center mt-4 lg:mt-0">
            Made with ❤️ © {new Date().getFullYear()} Brainn
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;