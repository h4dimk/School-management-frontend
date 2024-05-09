import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = (userType) => {
    navigate(`/${userType}/login`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-800 to-gray-700">
      {/* Logo container with subtle animation and larger size */}
      <div className="mb-12 animate-pulse">
        <FontAwesomeIcon icon={faSchool} size="4x" className="text-white" />
      </div>

      <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-md text-center">
        Welcome to Our Website
      </h1>

      <p className="text-xl text-gray-200 text-center mb-8">
        Explore and discover what we have to offer!
      </p>

      <div className="flex justify-center gap-8">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => handleLoginClick("admin")}
        >
          Login as Admin
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-md shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => handleLoginClick("teacher")}
        >
          Login as Teacher
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={() => handleLoginClick("student")}
        >
          Login as Student
        </button>
      </div>
    </div>
  );
}

export default Home;
