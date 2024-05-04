import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faCalendarCheck,
  faFileAlt,
  faClipboardList,
  faBell,
  faClock,
  faTasks,
  faCheckSquare,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";

function TeacherSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(signOut());
    navigate("/teacher/login");
  }
  return (
    <div
      className="flex flex-col h-full bg-zinc-700 text-white p-4"
      style={{
        width: "220px",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        overflowY: "auto",
      }}
    >
      <div className="flex flex-col items-center justify-center mb-8 mt-2">
        <img
          src={currentUser.avatar}
          alt="User Avatar"
          className="w-16 h-16 rounded-full mb-2 object-cover"
        />
        <h2 className="text-xl font-semibold">{currentUser.name}</h2>
        <p className="text-xs text-center"> (teacher) </p>
      </div>
      <nav className="text-left">
        <ul>
          <li className="mb-4">
            <a
              href="/teacher/home"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/teacher/profile"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/teacher/batch"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Batch
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/teacher/attendence"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faCalendarCheck} className="mr-2" />
              Attendance
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/teacher/apply-leave"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              Apply Leave
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/teacher/leaves"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faTasks} className="mr-2" />
              Batch Leaves
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/teacher/announcement"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              Announcements
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/teacher/timetable"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              Timetable
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/teacher/add-mcq"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faCheckSquare} className="mr-2" />
              Add MCQ
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/teacher/batch-mcq"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faTasks} className="mr-2" />
              Batch MCQs
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/teacher/assignments"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              Assignments
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/teacher/remarks"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faStickyNote} className="mr-2" />
              Remarks
            </a>
          </li>

          {/* Add more teacher-specific links as needed */}
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
