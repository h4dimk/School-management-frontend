import React, { useState } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";

function ManageTeachers() {
  const teachersData = [
    {
      id: 1,
      avatar: "https://example.com/avatar1.jpg",
      name: "John Doe",
      email: "john@example.com",
      subject: "Mathematics",
      gender: "Male",
      blocked: false,
    },
    {
      id: 2,
      avatar: "https://example.com/avatar2.jpg",
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Science",
      gender: "Female",
      blocked: true,
    },
  ];

  const [teachers, setTeachers] = useState(teachersData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Filter teachers based on search term
    const filteredTeachers = teachersData.filter((teacher) =>
      teacher.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setTeachers(filteredTeachers);
  };

  return (
    <div className="flex h-screen">
      <AdminSideBar />
      <div className="container mx-auto px-4 py-8 ">
        <h2 className="text-3xl font-semibold mb-4 text-white">
          Manage Teachers
        </h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
            placeholder="Search teachers"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-gray-300 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <img
                  src={teacher.avatar}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold">{teacher.name}</h3>
                  <p className="text-gray-600">{teacher.email}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-2">Subject: {teacher.subject}</p>
              <p className="text-gray-700 mb-2">Gender: {teacher.gender}</p>
              <div className="flex justify-between items-center">
                <button
                  className={`px-4 py-2 rounded-md ${
                    teacher.blocked
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {teacher.blocked ? "Unblock" : "Block"}
                </button>
                <button className="px-4 py-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-800">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageTeachers;
