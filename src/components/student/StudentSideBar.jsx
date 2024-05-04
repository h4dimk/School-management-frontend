import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faPen,
  faComments,
  faBell,
  faClock,
  faList,
  faTasks,
  faCheckSquare,
  faFileAlt,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";

function StudentSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(signOut());
    navigate("/student/login");
  }

  return (
    <div
      className="flex flex-col h-full bg-zinc-700 text-white p-4"
      style={{ width: "220px", position: "fixed", top: 0, left: 0, bottom: 0 ,overflowY: "auto"}}
    >
      <div className="flex flex-col items-center justify-center mb-8 mt-2">
        <img
          src={currentUser.avatar}
          alt="User Avatar"
          className="w-16 h-16 rounded-full mb-2 object-cover"
        />
        <h2 className="text-xl font-semibold">{currentUser.name}</h2>
        <p className="text-xs text-center"> (student) </p>
      </div>

      <nav className="text-left">
        <ul>
          <li className="mb-4">
            <a
              href="/student/home"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/student/profile"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/student/apply-leave"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faPen} className="mr-2" />
              Apply Leave
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/student/chats"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faComments} className="mr-2" />
              Batch Chats
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/student/announcement"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              Announcements
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/student/timetable"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              Timetable
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/student/mcqs"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faList} className="mr-2" />
              MCQs
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/student/answered-mcqs"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faCheckSquare} className="mr-2" />
              Answered MCQs
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/student/assignments"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              Assignments
            </a>
          </li>

          <li className="mb-4">
            <a
              href="/student/remarks"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faStickyNote} className="mr-2" />
              Remarks
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
