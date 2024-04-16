import React, { useState, useEffect } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import axios from "../../services/axiosService";

function Leaves() {
  const [studentLeaves, setStudentLeaves] = useState([]);
  const [teacherLeaves, setTeacherLeaves] = useState([]);

  useEffect(() => {
    fetchStudentLeaves();
    fetchTeacherLeaves();
  }, []);

  const fetchStudentLeaves = async () => {
    try {
      const response = await axios.get("/admin/get-students-leaves");
      setStudentLeaves(response.data.leaves);
    } catch (error) {
      console.error("Error fetching student leaves:", error);
    }
  };

  const fetchTeacherLeaves = async () => {
    try {
      const response = await axios.get("/admin/get-teachers-leaves");
      setTeacherLeaves(response.data.leaves);
    } catch (error) {
      console.error("Error fetching teacher leaves:", error);
    }
  };

  function getStatusColorClass(status) {
    switch (status) {
      case "Pending":
        return "text-yellow-400";
      case "Accepted":
        return "text-green-500";
      case "Rejected":
        return "text-red-500";
      default:
        return "";
    }
  }

  const updateStudentLeaveStatus = async (leaveId, status) => {
    try {
      await axios.put("/admin/update-student-leave-status", {
        leaveId,
        status,
      });
      // If the request is successful, update the local state to reflect the change
      const updatedLeaves = studentLeaves.map((leave) =>
        leave._id === leaveId ? { ...leave, status } : leave
      );
      setStudentLeaves(updatedLeaves);
    } catch (error) {
      console.error("Error updating student leave status:", error);
    }
  };

  const updateTeacherLeaveStatus = async (leaveId, status) => {
    try {
      await axios.put("/admin/update-teacher-leave-status", {
        leaveId,
        status,
      });
      // If the request is successful, update the local state to reflect the change
      const updatedLeaves = teacherLeaves.map((leave) =>
        leave._id === leaveId ? { ...leave, status } : leave
      );
      setTeacherLeaves(updatedLeaves);
    } catch (error) {
      console.error("Error updating teacher leave status:", error);
    }
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-white">
              Student Leaves
            </h2>
            <ul>
              {studentLeaves
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((leave) => (
                  <li key={leave.id} className="mb-6">
                    <div className="bg-gray-200 p-4 rounded-md flex flex-col space-y-2">
                      <div className="flex justify-center items-center space-x-4 bg-gray-400 rounded-md p-4">
                        {leave.student.avatar && (
                          <img
                            src={leave.student.avatar}
                            alt={leave.student.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="text-lg">
                            <span className="font-semibold">Name:</span>{" "}
                            {leave.student.name}
                          </p>
                          <p className="text-lg">
                            <span className="font-semibold"> Batch:</span>{" "}
                            {leave.student.batch}
                          </p>
                          <p className="text-lg">
                            <span className="font-semibold">Course:</span>{" "}
                            {leave.student.course}
                          </p>
                        </div>
                      </div>
                      <p className="text-lg">
                        <span className="font-semibold">Start Date:</span>{" "}
                        {new Date(leave.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">End Date:</span>{" "}
                        {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">Reason:</span>{" "}
                        {leave.reason}
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                          className={`${getStatusColorClass(leave.status)}`}
                        >
                          {leave.status}
                        </span>
                      </p>
                      {leave.status !== "Accepted" && (
                        <div className="flex justify-end">
                          <button
                            onClick={() =>
                              updateStudentLeaveStatus(leave._id, "Accepted")
                            }
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              updateStudentLeaveStatus(leave._id, "Rejected")
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6 text-white">
              Teacher Leaves
            </h2>
            <ul>
              {teacherLeaves
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((leave) => (
                  <li key={leave.id} className="mb-6">
                    <div className="bg-gray-200 p-4 rounded-md flex flex-col space-y-2">
                      <div className="flex justify-center items-center space-x-4 bg-gray-400 rounded-md p-4">
                        {leave.teacher.avatar && (
                          <img
                            src={leave.teacher.avatar}
                            alt={leave.teacher.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="text-lg">
                            <span className="font-semibold">Name:</span>{" "}
                            {leave.teacher.name}
                          </p>
                          <p className="text-lg">
                            <span className="font-semibold">
                              Assigned Batch:
                            </span>{" "}
                            {leave.teacher.batch}
                          </p>
                          <p className="text-lg">
                            <span className="font-semibold">Subject:</span>{" "}
                            {leave.teacher.subject}
                          </p>
                        </div>
                      </div>
                      <p className="text-lg">
                        <span className="font-semibold">Start Date:</span>{" "}
                        {new Date(leave.startDate).toLocaleDateString()}
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">End Date:</span>{" "}
                        {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">Reason:</span>{" "}
                        {leave.reason}
                      </p>
                      <p className="text-lg">
                        <span className="font-semibold">Status:</span>{" "}
                        <span
                          className={`${getStatusColorClass(leave.status)}`}
                        >
                          {leave.status}
                        </span>
                      </p>

                      {leave.status === "Pending" && (
                        <div className="flex justify-end">
                          <button
                            onClick={() =>
                              updateTeacherLeaveStatus(leave._id, "Accepted")
                            }
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              updateTeacherLeaveStatus(leave._id, "Rejected")
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaves;
