import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionClick = (role) => {
    setShowDropdown(false);
    navigate(`/${role}/login`);
  };

  return (
    <header className="bg-gray-600 shadow fixed w-full z-10">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon
            icon={faSchool}
            size="lg"
            className="text-gray-200"
          />
          <div className="text-xl font-bold text-white">School Sync</div>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#home"
                className="text-gray-200 hover:text-white
              "
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="text-gray-200 hover:text-white
              "
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="text-gray-200 hover:text-white
                "
              >
                Testimonials
              </a>
            </li>
            <li className="relative">
              <button
                onClick={handleLoginClick}
                className="text-gray-200 hover:text-white
                "
              >
                Login
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-lg w-48">
                  <button
                    onClick={() => handleOptionClick("admin")}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Login as Admin
                  </button>
                  <button
                    onClick={() => handleOptionClick("teacher")}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Login as Teacher
                  </button>
                  <button
                    onClick={() => handleOptionClick("student")}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Login as Student
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
