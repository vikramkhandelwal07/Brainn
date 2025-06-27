import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PiShoppingCartSimpleDuotone } from "react-icons/pi";
import { HiMenu, HiX } from "react-icons/hi";
import brainnLogo from '../../assets/Brainn.png';
import ProfileMenu from '../sections/auth/ProfileMenu';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/api';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.userProfile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [catalogLinks, setCatalogLinks] = useState([]);
  const catalogRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Fetched categories:", result);
      setCatalogLinks(result?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle click outside to close catalog dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target)) {
        setIsCatalogOpen(false);
      }
    };

    if (isCatalogOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCatalogOpen]);

  const isActive = (route) => {
    return matchPath({ path: route, end: true }, location.pathname);
  };

  const navLinks = [
    { label: "Home", path: "/" },
    // { label: "CodeSnippet", path: "/CodeSnippet" },
    { label: "About", path: "/about" },
    { label: "Catalog", path: "/catalog" },
    { label: "Contact", path: "/contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsCatalogOpen(false);
  };

  const toggleCatalog = () => {
    setIsCatalogOpen(!isCatalogOpen);
  };

  return (
    <>
      <div className="flex h-16 items-center justify-between bg-black border-b border-gray-700 backdrop-blur-md px-4 md:px-12 z-[60] relative">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={brainnLogo} alt="Brainn Logo" className="h-10 w-12 md:h-12 md:w-14" />
          <Link to="/" className="text-white font-poppins text-2xl md:text-3xl font-bold">
            Brainn
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-white text-base font-medium items-center z-[70] relative">
          {navLinks.map((link) => {
            if (link.label === "Catalog") {
              return (
                <div
                  key={link.path}
                  className="relative"
                  ref={catalogRef}
                  onMouseEnter={() => setIsCatalogOpen(true)}
                >
                  <span
                    className={`cursor-pointer hover:text-blue-400 transition duration-150 ${location.pathname.startsWith('/catalog')
                      ? 'text-blue-400 font-semibold'
                      : ''
                      }`}
                    onClick={toggleCatalog}
                  >
                    Catalog ▾
                  </span>
                  {isCatalogOpen && (
                    <div
                      role="menu"
                      className="absolute top-full mt-2 bg-black text-gray-300 rounded-lg shadow-lg w-52 border border-gray-600 z-[80]"
                    >
                      {catalogLinks.length > 0 ? (
                        catalogLinks.map((category) => (
                          <Link
                            key={category._id}
                            to={`/catalog/${category.name.toLowerCase()}`}
                            className="block px-4 py-2 hover:bg-violet-950 rounded-md hover:scale-[1.03] transition-all"
                            onClick={() => setIsCatalogOpen(false)}
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

        {/* Right: Cart + Auth + Mobile Menu Button */}
        <div className="flex gap-3 md:gap-4 items-center">
          {/* Cart Icon */}
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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-4 items-center relative z-[70]">
            {!token ? (
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
            ) : (
              <div className="relative z-[70]">
                <ProfileMenu />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white text-2xl p-1"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[45] md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-16 left-0 right-0 bg-black border-b border-gray-700 z-[55] md:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
        <nav className="flex flex-col py-4">
          {navLinks.map((link) => {
            if (link.label === "Catalog") {
              return (
                <div key={link.path} className="border-b border-gray-700">
                  <button
                    onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                    className={`w-full text-left px-6 py-3 text-white hover:bg-gray-800 transition duration-150 flex justify-between items-center ${location.pathname.startsWith('/catalog')
                      ? 'text-blue-400 font-semibold'
                      : ''
                      }`}
                  >
                    Catalog
                    <span className={`transform transition-transform ${isCatalogOpen ? 'rotate-180' : ''}`}>
                      ▾
                    </span>
                  </button>
                  {isCatalogOpen && (
                    <div className="bg-gray-900 border-t border-gray-600">
                      {catalogLinks.length > 0 ? (
                        catalogLinks.map((category) => (
                          <Link
                            key={category._id}
                            to={`/catalog/${category.name.toLowerCase()}`}
                            className="block px-8 py-2 text-gray-300 hover:bg-violet-950 transition-all"
                            onClick={closeMobileMenu}
                          >
                            {category.name}
                          </Link>
                        ))
                      ) : (
                        <span className="block px-8 py-2 text-sm text-gray-400">
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
                  className={`px-6 py-3 text-white hover:bg-gray-800 transition duration-150 border-b border-gray-700 ${isActive(link.path) ? 'text-blue-400 font-semibold' : ''
                    }`}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              );
            }
          })}

          {/* Mobile Auth Section */}
          {!token && (
            <div className="px-6 py-4 border-t border-gray-600 mt-2">
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="text-center text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-center bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}

          {/* Mobile Profile Menu */}
          {token && (
            <div className="px-6 py-4 border-t border-gray-600 mt-2">
              <div onClick={closeMobileMenu}>
                <ProfileMenu />
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;