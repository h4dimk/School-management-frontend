import React, { useState, useEffect } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import axios from "../../services/axiosService";

function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch teachers data from the backend when the component mounts
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("/admin/get-teachers");
        setTeachers(response.data);
        setFilteredTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleBlock = async (id) => {
    try {
      const response = await axios.put(`/admin/block-teacher/${id}`);
      const updatedTeachers = filteredTeachers.map((teacher) =>
        teacher._id === id
          ? { ...teacher, isActive: response.data.isActive }
          : teacher
      );
      setFilteredTeachers(updatedTeachers);
    } catch (error) {
      console.error("Error blocking/unblocking teacher:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this teacher?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/admin/remove-teacher/${id}`);
      const updatedFilteredTeachers = filteredTeachers.filter(
        (teacher) => teacher._id !== id
      );
      setFilteredTeachers(updatedFilteredTeachers);
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredTeachers = teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(searchTerm)
    );
    setFilteredTeachers(filteredTeachers);
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="container mx-auto px-4 py-8 ml-56 ">
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
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-gray-300 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <img
                  src={teacher.avatar}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{teacher.name}</h3>
                  <p className="text-gray-600">{teacher.email}</p>
                  <p
                    className={`text-gray-700 mb-2 text-right ${
                      teacher.isActive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {teacher.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-2">Subject: {teacher.subject}</p>
              <p className="text-gray-700 mb-2">Gender: {teacher.gender}</p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleBlock(teacher._id)}
                  className={`px-4 py-2 rounded-md ${
                    teacher.isActive
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {teacher.isActive ? "Block" : "Unblock"}
                </button>
                <button
                  onClick={() => handleDelete(teacher._id)}
                  className="px-4 py-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-800"
                >
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
