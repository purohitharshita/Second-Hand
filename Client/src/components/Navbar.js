import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const profileMenuRef = useRef(null);

  useEffect(() => {
    // Close profile menu when user clicks outside of it
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="bg-gray-900 py-4 px-8 flex flex-col md:flex-row justify-between items-center z-[100]">
      <div className="flex items-center mb-4 md:mb-0">
        <Link to="/" className="text-white text-2xl font-bold">
          <span className="text-yellow-500">Your</span>Shop
        </Link>
      </div>
      <div className="relative group">
        {isAuthenticated ? (
          <>
            <button
              onClick={handleProfileMenuToggle}
              className="flex items-center space-x-2 focus:outline-none relative"
            >
              <FaUser className="text-white text-xl cursor-pointer" />
              {isProfileMenuOpen && (
                <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
              )}
            </button>
            {isProfileMenuOpen && (
              <div
                ref={profileMenuRef}
                className="w-40 absolute right-0 mt-2 bg-white p-2 rounded shadow-lg transform transition duration-300 opacity-100 scale-100 hover:scale-105"
              >
                <Link
                  to={`/profile/${user.id}`}
                  className="block text-gray-800 hover:text-yellow-500 py-1 transition duration-300"
                >
                  Profile
                </Link>
                <Link
                  to="/add-product"
                  className="block text-gray-800 hover:text-yellow-500 py-1 transition duration-300"
                >
                  Add Product
                </Link>
                <button
                  onClick={() => {
                    // Handle logout when user clicks the button
                    logout();
                    setIsProfileMenuOpen(false);
                  }}
                  className="block text-gray-800 hover:text-yellow-500 py-1 w-full text-left transition duration-300"
                >
                  Sign Out
                </button>
              </div>
            )}
          </>
        ) : (
          <Link
            to="/login"
            className="text-white hover:text-yellow-500 transition duration-300"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
