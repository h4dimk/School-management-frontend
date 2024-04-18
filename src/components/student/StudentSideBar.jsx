import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";

function StudentSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(signOut());
    navigate("/student/login");
  }

  return (
    <div
      className="flex flex-col h-full bg-zinc-700 text-white p-4"
      style={{ width: "220px", position: "fixed", top: 0, left: 0, bottom: 0 }}
    >
      <div className="flex items-center justify-center mb-8">
        {/* Your student logo or branding */}
      </div>
      <nav className="text-left">
        <p className="text-2xl text-center mb-3"> Student </p>
        <ul>
          <li className="mb-4">
            <a
              href="/student/home"
              className="text-lg text-gray-300 hover:text-white"
            >
              Home
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/student/profile"
              className="text-lg text-gray-300 hover:text-white"
            >
              Profile
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/student/apply-leave"
              className="text-lg text-gray-300 hover:text-white"
            >
              Apply Leave
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/student/chats"
              className="text-lg text-gray-300 hover:text-white"
            >
              Batch chats
            </a>
          </li>

          <li className="mb-4">
            <a
              href="/student/announcement"
              className="text-lg text-gray-300 hover:text-white"
            >
              Announcements
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/student/timetable"
              className="text-lg text-gray-300 hover:text-white"
            >
              Timetable
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

export default StudentSideBar;
