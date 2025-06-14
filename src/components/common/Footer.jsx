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

const BottomFooter = ["Privacy Policy", "Cookie Policy", "termsandconditions"];
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
    <div className="bg-gradient-to-b to-gray-900 from-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Company Information */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <img
                src={brainnLogo}
                alt="Brainn Logo"
                className="h-12 w-auto mb-6"
              />
            </div>

            {/* Company Links */}
            <div className="mb-8">
              <h1 className="text-lg font-semibold mb-4 text-gray-100">Company</h1>
              <div className="space-y-3">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <Link
                    key={i}
                    to={`/${ele.toLowerCase()}`}
                    className="block text-gray-300 hover:text-violet-600 transition-colors duration-200 text-sm"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="mb-8">
              <div className="flex space-x-4">
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
                    className="w-10 h-10 bg-gray-800 hover:bg-violet-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Email Form */}
            <div>
              <h4 className="mb-3 text-gray-100 font-medium">Email Us</h4>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm flex-1"
                />
                <a href="mailto:abc@gmail.com" className="p-2 bg-pink-500 hover:bg-violet-600 rounded-lg transition-colors duration-200">
                  <SendIcon className="text-white" fontSize="small" />
                </a>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h1 className="text-lg font-semibold mb-6 text-gray-100">Resources</h1>
            <div className="space-y-3">
              {Resources.map((item, i) => (
                <Link
                  key={i}
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-gray-300 hover:text-violet-600 transition-colors duration-200 text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>

            <h1 className="text-lg font-semibold mb-4 mt-8 text-gray-100">Support</h1>
            <Link
              to="/help-center"
              className="block text-gray-300 hover:text-violet-600 transition-colors duration-200 text-sm"
            >
              Help Center
            </Link>
          </div>

          {/* Plans */}
          <div className="lg:col-span-2">
            <h1 className="text-lg font-semibold mb-6 text-gray-100">Plans</h1>
            <div className="space-y-3">
              {Plans.map((item, i) => (
                <Link
                  key={i}
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-gray-300 hover:text-violet-600 transition-colors duration-200 text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>

            <h1 className="text-lg font-semibold mb-4 mt-8 text-gray-100">Community</h1>
            <div className="space-y-3">
              {Community.map(({ name, link, external }, i) => (
                external ? (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gray-300 hover:text-violet-600 transition-colors duration-200 text-sm"
                  >
                    {name}
                  </a>
                ) : (
                  <Link
                    key={i}
                    to={`/${link}`}
                    className="block text-gray-300 hover:text-violet-600 transition-colors duration-200 text-sm"
                  >
                    {name}
                  </Link>
                )
              ))}
            </div>
          </div>

          {/* Footer Links Column */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {FooterLink2.map((group, i) => (
                <div key={i} className="space-y-1">
                  <h1 className="text-lg font-semibold mb-6 text-gray-100">{group.title}</h1>
                  <div className="space-y-4">
                    {group.links.map((linkItem, index) => (
                      <Link
                        key={index}
                        to={linkItem.link}
                        className="block text-gray-300 hover:text-violet-600 transition-colors duration-200 text-sm leading-relaxed"
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
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start space-x-6">
              {BottomFooter.map((ele, i) => (
                <Link
                  key={i}
                  to={`/${ele.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-400 hover:text-violet-400 transition-colors duration-200 text-sm"
                >
                  {ele}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              Made with ❤️ © {new Date().getFullYear()} Brainn
            </div>
            
          </div>
          <div className="w-full bg-gray-950 text-center">
            <h1 className="text-6xl md:text-8xl lg:text-[20rem] font-black">
              <span className="bg-gradient-to-t from-black via-pink-950 to-violet-600 bg-clip-text text-transparent font-poppins">
                Brainn
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;