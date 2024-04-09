import React, { useEffect, useState } from "react";
import StudentSideBar from "../../components/student/StudentSideBar";
import axios from "../../services/axiosService";
import { useSelector } from "react-redux";

function StudentApplyLeave() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [studentLeaves, setStudentLeaves] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchStudentLeaves();
  }, []);

  const fetchStudentLeaves = async () => {
    try {
      const response = await axios.get(
        `/student/get-leaves/${currentUser._id}`
      );
      setStudentLeaves(response.data.leaves);
    } catch (error) {
      console.error("Error fetching student leaves:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!leaveType || !startDate || !endDate || !reason.trim()) {
      setError("Please fill in all fields");
      return;
    }

    // Date validation
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (startDateObj > endDateObj) {
      setError("Start date cannot be after end date");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await axios.post(
        `/student/apply-leave/${currentUser._id}`,
        {
          leaveType,
          startDate,
          endDate,
          reason,
        }
      );
      console.log("Leave application submitted:", response.data);
      setSuccessMessage("Leave application submitted successfully.");
      resetForm();
    } catch (error) {
      console.error("Error submitting leave application:", error);
      setError("Failed to submit leave application. Please try again later.");
    }
  };

  const cancelLeave = async (leaveId) => {
    try {
      await axios.delete(`/student/cancel-leave/${leaveId}`);
      fetchStudentLeaves();
      setSuccessMessage("Leave canceled successfully.");
    } catch (error) {
      console.error("Error canceling leave:", error);
      setError("Failed to cancel leave. Please try again later.");
    }
  };

  function getStatusColorClass(status) {
    switch (status) {
      case "Pending":
        return "text-yellow-400";
      case "Accept":
        return "text-green-500";
      case "Reject":
        return "text-red-500";
      default:
        return "";
    }
  }

  const resetForm = () => {
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
    setError("");
  };

  return (
    <div className="flex">
      <StudentSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-6 text-white">
          Leave Application
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 p-6 rounded-md shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="leaveType"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Leave Type:
            </label>
            <select
              id="leaveType"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Vacation">Vacation</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endDate"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="reason"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Reason:
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
              rows={4}
              required
            ></textarea>
          </div>
          {error && <p className="text-red-500 ">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button
            type="submit"
            className="bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-800 mt-4"
          >
            Submit
          </button>
        </form>
        {studentLeaves.length > 0 && (
          <div>
            <h2 className="text-3xl font-semibold mb-6 mt-8 text-white">
              Your Leaves
            </h2>
            <ul className="text-gray-700">
              {studentLeaves.map((leave) => (
                <li key={leave.id} className="mb-8">
                  <div className="bg-gray-200 p-4 rounded-md relative">
                    <p className="text-lg mb-2">
                      <span className="font-semibold">Start Date:</span>{" "}
                      {new Date(leave.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-semibold">End Date:</span>{" "}
                      {new Date(leave.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-semibold">Reason:</span>{" "}
                      {leave.reason}
                    </p>
                    <p className="text-lg mb-2">
                      <span className="font-semibold">Status:</span>{" "}
                      <span className={`${getStatusColorClass(leave.status)}`}>
                        {leave.status}
                      </span>
                    </p>
                    <button
                      onClick={() => cancelLeave(leave._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 absolute bottom-2 right-2"
                    >
                      Cancel Leave
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentApplyLeave;
