import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

function AdminSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(signOut());
    navigate("/admin/login");
  }
  return (
    <div
      className="flex flex-col h-full bg-zinc-700 text-white p-4"
      style={{ width: "220px", position: "fixed", top: 0, left: 0, bottom: 0 }}
    >
      <div className="flex items-center justify-center mb-8">
        {/* <img src={logo} alt="Logo" className="w-16 h-16" /> Adjust width and height as needed */}
      </div>
      <nav className="text-left">
        <p className="text-2xl text-center mb-3"> Admin </p>
        <ul>
          <li className="mb-4">
            <a
              href="/admin/home"
              className="text-lg text-gray-300 hover:text-white"
            >
              Home
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/profile"
              className="text-lg text-gray-300 hover:text-white"
            >
              Profile
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/manage-teachers"
              className="text-lg text-gray-300 hover:text-white"
            >
              Manage Teachers
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/add-teachers"
              className="text-lg text-gray-300 hover:text-white"
            >
              Add Teachers
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/manage-students"
              className="text-lg text-gray-300 hover:text-white"
            >
              Manage Students
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/add-students"
              className="text-lg text-gray-300 hover:text-white"
            >
              Add Students
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/courses"
              className="text-lg text-gray-300 hover:text-white"
            >
              Courses
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/batches"
              className="text-lg text-gray-300 hover:text-white"
            >
              Batches
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/admin/announcement"
              className="text-lg text-gray-300 hover:text-white"
            >
              Announcement
            </a>
          </li>
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
