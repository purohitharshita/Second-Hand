import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSearch } from "react-icons/fa";
import { useAuth } from "../context/authContext";
import Select from "react-select";
import { components } from "react-select";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const categories = [
    "All Categories",
    "Mattress",
    "Air Cooler",
    "Cycles",
    "Electronics",
    "Books",
  ];

  const handleSearch = () => {
    if (selectedCategory === "All Categories") {
      navigate(`/allproducts?q=${searchQuery}`);
    } else {
      navigate(
        `/categories/${selectedCategory.toLowerCase()}?q=${searchQuery}`
      );
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "2px",
      backgroundColor: "rgb(55, 65, 81)",
      border: "2px solid transparent",
      borderRadius: "4px 0px 0px 4px",
      color: "#fff",
      cursor: "pointer",
      minWidth: "100px",
      "&:hover": {
        borderColor: state.isFocused ? "#fff" : "transparent",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4B5563" : "transparent",
      color: state.isSelected ? "rgb(234, 179, 8)" : "inherit",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#4B5563",
        color: "rgb(234, 179, 8)",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#4B5563",
      color: "#fff",
      zIndex: 100,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
  };

  const options = categories.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <nav className="bg-gray-900 py-4 px-8 flex flex-col md:flex-row justify-between items-center z-[100]">
      <div className="flex items-center mb-4 md:mb-0">
        <Link to="/" className="text-white text-2xl font-bold">
          <span className="text-yellow-500">Your</span>Shop
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-center md:space-x-4">
        {/* <div className="flex items-center mb-4 md:mb-0 md:space-x-2"> }
          <Select
            classNamePrefix="react-select"
            className="w-40 py-2 rounded-l"
            options={options}
            value={{ value: selectedCategory, label: selectedCategory }}
            onChange={(selectedOption) =>
              setSelectedCategory(selectedOption.value)
            }
            components={{
              IndicatorSeparator: () => null,
              DropdownIndicator: (props) => (
                <components.DropdownIndicator {...props}>
                  <FaChevronDown />
                </components.DropdownIndicator>
              ),
            }}
            styles={customStyles}
          />
          <input
            type="text"
            className="bg-gray-800 text-white p-2 w-full md:w-64 border-2 border-transparent focus:border-white"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="p-[11.5px] bg-gray-700 text-white rounded-r hover:bg-white hover:text-gray-800 hover:transition-colors duration-300"
            onClick={handleSearch}
          >
            <FaSearch className="text-xl" />
          </button>
        </div> */}
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <a href={`/profile/${user.id}`}>
              <FaUser className="text-white text-xl cursor-pointer" />
            </a>
            <button
              onClick={() => {
                // Handle logout when user clicks the button
                logout();
                navigate("/");
              }}
              className="text-white hover:text-yellow-500"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-white hover:text-yellow-500">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
