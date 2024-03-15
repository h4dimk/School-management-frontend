import React from "react";
import { useNavigate } from "react-router-dom";
function TeacherSideBar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/teacher/login");
  }
  return (
    <div
      className="flex flex-col h-full bg-zinc-700 text-white p-4"
      style={{ width: "250px" }}
    >
      <div className="flex items-center justify-center mb-8">
        {/* Your student logo or branding */}
      </div>
      <nav className="text-left">
        <p className="text-2xl text-center mb-3"> Teacher </p>
        <ul>
          <li className="mb-4">
            <a
              href="/teacher/home"
              className="text-lg text-gray-300 hover:text-white"
            >
              Home
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/teacher/profile"
              className="text-lg text-gray-300 hover:text-white"
            >
              Profile
            </a>
          </li>
          {/* Add more student-specific links as needed */}
          <li className="mt-10">
            <button
              onClick={handleLogout}
              className="text-lg text-gray-300 hover:text-white bg-gray-600 rounded-md py-2 px-16 block text-center"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default TeacherSideBar;
