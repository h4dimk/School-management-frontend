import React, { useState, useEffect } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import axios from "../../services/axiosService";

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch student data from the backend when the component mounts
    const fetchStudents = async () => {
      try {
        const response = await axios.get("/admin/get-students");
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleBlock = async (id) => {
    try {
      const response = await axios.put(`/admin/block-student/${id}`);
      const updatedStudents = filteredStudents.map((student) =>
        student._id === id
          ? { ...student, isActive: response.data.isActive }
          : student
      );
      setFilteredStudents(updatedStudents);
    } catch (error) {
      console.error("Error blocking/unblocking student:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this student?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`/admin/remove-student/${id}`);
      const updatedFilteredStudents = filteredStudents.filter(
        (student) => student._id !== id
      );
      setFilteredStudents(updatedFilteredStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm)
    );
    setFilteredStudents(filteredStudents);
  };

  return (
    <div className="flex h-screen">
      <AdminSideBar />
      <div className="container mx-auto px-4 py-8 ">
        <h2 className="text-3xl font-semibold mb-4 text-white">
          Manage Students
        </h2>
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
            placeholder="Search students"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student._id}
              className="bg-gray-300 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <img
                  src={student.avatar}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{student.name}</h3>
                  <p className="text-gray-600">{student.email}</p>
                  <p
                    className={`text-gray-700 mb-2 text-right ${
                      student.isActive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {student.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mb-2">Course: {student.course}</p>
              <p className="text-gray-700 mb-2">Batch: {student.batch}</p>
              <p className="text-gray-700 mb-2">Gender: {student.gender}</p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleBlock(student._id)}
                  className={`px-4 py-2 rounded-md ${
                    student.isActive
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {student.isActive ? "Block" : "Unblock"}
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
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

export default ManageStudents;
