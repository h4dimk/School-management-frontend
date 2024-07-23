import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginAction = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowOptions(true);
  };

  const handleOptionClick = (role) => {
    setShowOptions(false);
    navigate(`/${role}/login`);
  };

  return (
    <section id="contact" className="bg-gray-800 py-20 text-white text-center">
      <div className="container mx-auto">
        {!showOptions ? (
          <>
            <h2 className="text-3xl font-bold mb-6">Get Started Today!</h2>
            <p className="text-xl mb-8">
              Join us and experience the benefits of our school management
              system.
            </p>
            <button
              onClick={handleLoginClick}
              className="bg-white text-gray-800 px-6 py-3 rounded-full font-bold"
            >
              Login
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => handleOptionClick("admin")}
              className="bg-white text-black px-6 py-3 rounded-full font-bold w-full"
            >
              Login as Admin
            </button>
            <button
              onClick={() => handleOptionClick("teacher")}
              className="bg-white text-black px-6 py-3 rounded-full font-bold w-full"
            >
              Login as Teacher
            </button>
            <button
              onClick={() => handleOptionClick("student")}
              className="bg-white text-black px-6 py-3 rounded-full font-bold w-full"
            >
              Login as Student
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoginAction;
