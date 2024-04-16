import React, { useEffect, useState } from "react";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";
import axios from "../../services/axiosService";
import { useSelector } from "react-redux";

function TeachersBatchLeaves() {
  const [studentLeaves, setStudentLeaves] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchStudentLeaves();
  }, []);

  const fetchStudentLeaves = async () => {
    try {
      const batch = currentUser.batch;
      const response = await axios.get("/teacher/get-students-leaves", {
        params: { batch },
      });
      console.log(batch);
      console.log(response.data);
      setStudentLeaves(response.data.leaves);
    } catch (error) {
      console.error("Error fetching student leaves:", error);
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
      await axios.put("/teacher/update-student-leave-status", {
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
  return (
    <div className="flex">
      <TeacherSideBar />
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
        </div>
      </div>
    </div>
  );
}

export default TeachersBatchLeaves;
