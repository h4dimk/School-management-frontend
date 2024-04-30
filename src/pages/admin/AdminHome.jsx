import React, { useEffect, useState } from "react";
import axios from "../../services/axiosService";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChalkboardTeacher,
  faBook,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

function AdminHome() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalBatches, setTotalBatch] = useState(0);
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentsResponse = await axios.get("/admin/get-students");
      const teachersResponse = await axios.get("/admin/get-teachers");
      const coursesResponse = await axios.get("/admin/get-courses");
      const batchesResponse = await axios.get("/admin/get-batches");
      const attendenceResponse = await axios.get("/admin/get-attendence");

      setTotalStudents(studentsResponse.data.length);
      setTotalTeachers(teachersResponse.data.length);
      setTotalCourses(coursesResponse.data.length);
      setTotalBatch(batchesResponse.data.length);
      setPresentStudents(attendenceResponse.data.attendance.present);
      setAbsentStudents(attendenceResponse.data.attendance.absent);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-6 text-white">
          Admin Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Total Students
            </h3>
            <p className="text-5xl font-bold text-gray-900">{totalStudents}</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />{" "}
              Total Teachers
            </h3>
            <p className="text-5xl font-bold text-gray-900">{totalTeachers}</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faBook} className="mr-2" /> Total Courses
            </h3>
            <p className="text-5xl font-bold text-gray-900">{totalCourses}</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Total
              Batches
            </h3>
            <p className="text-5xl font-bold text-gray-900">{totalBatches}</p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Today's Present
              Students
            </h3>
            <p className="text-5xl font-bold text-gray-900">
              {presentStudents.length}
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-md">
            <h3 className="text-2xl font-semibold mb-3 text-gray-700">
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Today's Absent
              Students
            </h3>
            <p className="text-5xl font-bold text-gray-900">
              {absentStudents.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
