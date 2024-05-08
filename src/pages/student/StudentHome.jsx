import React, { useEffect, useState } from "react";
import axios from "../../services/axiosService";

import StudentSideBar from "../../components/student/StudentSideBar";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboard,
  faBook,
  faUserGraduate,
  faUserMinus,
  faTasks,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

function StudentHome() {
  const { currentUser } = useSelector((state) => state.user);
  const [attendance, setAttendance] = useState({ present: [], absent: [] });
  const [assignment,setAssignments]=useState(0)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const assignmentResponse=await axios.get(
        `/student/get-assignments/${currentUser._id}`
      );
      setAssignments(assignmentResponse.data.assignments.length)
      
      const attendanceResponse = await axios.get(
        `/student/get-attendances/${currentUser._id}`
      );
      const attendanceData = attendanceResponse.data.attendance;
      setAttendance(attendanceData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex">
      <StudentSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-6 text-white">
          Student Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
              Batch
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {currentUser.batch}
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              Course
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {currentUser.course}
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              Total Assignments
            </h3>
            <p className="text-5xl font-bold text-gray-900">
              {assignment}
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faChalkboard} className="mr-2" />
              Total Attendance taken
            </h3>
            <p className="text-5xl font-bold text-gray-900">
              {attendance.present.length + attendance.absent.length}
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faTasks} className="mr-2" />
              Present Days
            </h3>
            <p className="text-5xl font-bold text-gray-900">
              {attendance.present.length}
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faUserMinus} className="mr-2" />
              Absent Days
            </h3>
            <p className="text-5xl font-bold text-gray-900">
              {attendance.absent.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHome;
