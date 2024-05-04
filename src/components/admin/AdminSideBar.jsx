import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faChalkboardTeacher,
  faUserGraduate,
  faBook,
  faCalendarAlt,
  faBullhorn,
  faCalendarCheck,
  faClock,
  faTasks,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

function AdminSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(signOut());
    navigate("/admin/login");
  }
  return (
    <div
      className="flex flex-col h-full bg-zinc-700 text-white p-4"
      style={{ width: "220px", position: "fixed", top: 0, left: 0, bottom: 0 ,overflowY: "auto" }}
    >
      <div className="flex flex-col items-center justify-center mb-8 mt-2">
        <img
          src={currentUser.avatar}
          alt="User Avatar"
          className="w-16 h-16 rounded-full mb-2 object-cover"
        />
        <h2 className="text-xl font-semibold">{currentUser.name}</h2>
        <p className="text-xs text-center"> (admin) </p>

      </div>

      <nav className="text-left">
        <ul>
          <li className="mb-4">
            <a
              href="/admin/home"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/profile"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/manage-teachers"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
              Manage Teachers
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/add-teachers"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Add Teachers
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/manage-students"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
              Manage Students
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/add-students"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Add Students
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/courses"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              Courses
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/batches"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
              Batches
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/announcement"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faBullhorn} className="mr-2" />
              Announcements
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/leaves"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faTasks} className="mr-2" />
              Leaves
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/timetable"
              className="text-lg text-gray-300 hover:text-white"
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              Timetable
            </a>
          </li>

          {/* Add more admin-specific links as needed */}
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

export default AdminSideBar;
