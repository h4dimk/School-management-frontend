import React, { useEffect, useState } from "react";
import axios from "../../services/axiosService";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUser,
  faClipboardList,
  faTasks,
  faUserGraduate,
  faChalkboardTeacher,
  faBook,
} from "@fortawesome/free-solid-svg-icons"; // Import required icons
import { useSelector } from "react-redux";

function TeacherHome() {
  const { currentUser } = useSelector((state) => state.user);
  const [teacher, setTeacher] = useState(null);
  const [totalBatchStudents, setTotalBatchStudents] = useState(0);
  const [presentStudents, setPresentStudents] = useState(0);
  const [absentStudents, setAbsentStudents] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch total number of students
      const teacherResponse = await axios.get(
        `/teacher/get-teacher/${currentUser._id}`
      );
      const teacherData = teacherResponse.data.teacher;
      setTeacher(teacherData);
      const teacherWithBatchAndStudents = teacherResponse.data.teacher;
      setTotalBatchStudents(
        teacherWithBatchAndStudents.batchId.students.length
      );

      // Fetch attendance data
      const attendanceResponse = await axios.get(
        `/teacher/get-attendances/${teacherData.batchId._id}`
      );
      const attendanceData = attendanceResponse.data;

      // Calculate total attendance, present students, and absent students
      let totalAttendance = 0;
      let presentCount = 0;
      let absentCount = 0;
      Object.values(attendanceData.attendance).forEach((attendance) => {
        totalAttendance++;
        presentCount += attendance.present.length;
        absentCount += attendance.absent.length;
      });

      setPresentStudents(presentCount);
      setAbsentStudents(absentCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex">
      <TeacherSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-6 text-white">
          Teacher Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faUsers} className="mr-2" /> Total Batch
              Students
            </h3>
            <p className="text-5xl font-bold text-gray-900">
              {totalBatchStudents}
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> Total
              Attendance taken
            </h3>
            <p className="text-5xl font-bold text-gray-900">
              {Math.round(
                (presentStudents + absentStudents) / totalBatchStudents
              )}
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faTasks} className="mr-2" /> Present
              Students
            </h3>
            <p className="text-5xl font-bold text-gray-900">
              {presentStudents}
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faUserGraduate} className="mr-2" /> Absent
              Students
            </h3>
            <p className="text-5xl font-bold text-gray-900">{absentStudents}</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
              Assigned Batch
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {currentUser.batch}
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faBook} className="mr-2" />
              Assigned Subject
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {currentUser.subject}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherHome;
