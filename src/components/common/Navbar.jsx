import React, { useEffect, useState } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import brainnLogo from '../../assets/Brainn.png';
import ProfileMenu from './auth/ProfileMenu';
import { apiConnectors } from '../../services/apiConnectors';
import { categories } from '../../services/api';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.userProfile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogLinks, setCatalogLinks] = useState([]);

  const fetchCategories = async () => {
    try {
      const result = await apiConnectors("GET", categories.CATEGORIES_API);
      console.log("Fetched categories:", result);
      setCatalogLinks(result?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const isActive = (route) => {
    return matchPath({ path: route, end: true }, location.pathname);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "CodeSnippet", path: "/CodeSnippet" },
    { label: "About", path: "/about" },
    { label: "Catalog", path: "/catalog" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex h-16 items-center justify-between bg-black border-b border-gray-700 backdrop-blur-md px-6 md:px-12 z-50 w-full">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={brainnLogo} alt="Brainn Logo" className="h-12 w-14" />
        <Link to="/" className="text-white font-poppins text-3xl font-bold">
          Brainn
        </Link>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6 text-white text-base font-medium items-center z-[1000] relative">
        {navLinks.map((link) => {
          if (link.label === "Catalog") {
            return (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => setIsCatalogOpen(true)}
                onMouseLeave={() => setIsCatalogOpen(false)}
              >
                <span
                  className={`cursor-pointer hover:text-blue-400 transition duration-150 ${location.pathname.startsWith('/catalog')
                      ? 'text-blue-400 font-semibold'
                      : ''
                    }`}
                >
                  Catalog ▾
                </span>
                {isCatalogOpen && (
                  <div
                    role="menu"
                    className="absolute top-full mt-2 bg-black text-gray-300 rounded-lg shadow-lg w-52 border border-gray-600 z-50"
                  >
                    {catalogLinks.length > 0 ? (
                      catalogLinks.map((category) => (
                        <Link
                          key={category._id}
                          to={`/catalog/${category.name.toLowerCase()}`}
                          className="block px-4 py-2 hover:bg-violet-950 rounded-md hover:scale-[1.03] transition-all"
                        >
                          {category.name}
                        </Link>
                      ))
                    ) : (
                      <span className="block px-4 py-2 text-sm text-gray-400">
                        No categories found
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-blue-400 transition duration-150 ${isActive(link.path) ? 'text-blue-400 font-semibold' : ''
                  }`}
              >
                {link.label}
              </Link>
            );
          }
        })}
      </nav>

      {/* Right: Cart + Auth */}
      <div className="flex gap-4 items-center">
        {user && user?.accountType !== "Instructor" && (
          <Link to="/dashboard/cart" className="relative text-white text-xl">
            <PiShoppingCartSimpleDuotone className="text-2xl" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        )}

        {!token && (
          <>
            <Link
              to="/login"
              className="text-white border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
          </>
        )}

        {token && <ProfileMenu />}
      </div>
    </div>
  );
};

export default Navbar;
