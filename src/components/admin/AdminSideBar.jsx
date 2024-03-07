import React from "react";

function AdminSideBar() {
  return (
    <div
      className="flex flex-col h-full bg-zinc-700 text-white p-4"
      style={{ width: "250px" }}
    >
      <div className="flex items-center justify-center mb-8">
        {/* <img src={logo} alt="Logo" className="w-16 h-16" /> Adjust width and height as needed */}
      </div>
      <nav className="text-left">
        <p className="text-2xl text-center mb-3"> Admin </p>
        <ul>
          <li className="mb-4">
            <a href="/home" className="text-lg text-gray-300 hover:text-white">
              Home
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/profile"
              className="text-lg text-gray-300 hover:text-white"
            >
              Profile
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/manage-teachers"
              className="text-lg text-gray-300 hover:text-white"
            >
              Manage Teachers
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/add-teachers"
              className="text-lg text-gray-300 hover:text-white"
            >
              Add Teachers
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/manage-students"
              className="text-lg text-gray-300 hover:text-white"
            >
              Manage Students
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/add-students"
              className="text-lg text-gray-300 hover:text-white"
            >
              Add Students
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/courses"
              className="text-lg text-gray-300 hover:text-white"
            >
              Courses
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminSideBar;
