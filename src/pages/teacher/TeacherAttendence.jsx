import React, { useState, useEffect } from "react";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";
import axios from "../../services/axiosService";
import { useSelector } from "react-redux";

function TeacherAttendance() {
  const [teacher, setTeacher] = useState(null);
  const [attendanceDetails, setAttendenceDetails] = useState(null);
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await axios.get(
          `/teacher/get-teacher/${currentUser._id}`
        );
        const teacherData = teacherResponse.data.teacher;
        setTeacher(teacherData);

        const attendanceResponse = await axios.get(
          `/teacher/get-attendances/${teacherData.batchId._id}`
        );
        const attendanceData = attendanceResponse.data;
        setAttendenceDetails(attendanceData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();

    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setCurrentDate(today.toLocaleDateString("en-US", options));
  }, [currentUser._id]);

  const handleAttendance = (studentId, attendanceStatus) => {
    setTeacher((prevTeacher) => {
      const updatedStudents = prevTeacher.batchId.students.map((student) => {
        if (student._id === studentId) {
          return { ...student, status: attendanceStatus };
        }
        return student;
      });
      return {
        ...prevTeacher,
        batchId: { ...prevTeacher.batchId, students: updatedStudents },
      };
    });

    if (attendanceStatus === "Present") {
      setPresentStudents((prevPresentStudents) => [
        ...prevPresentStudents,
        studentId,
      ]);
      setAbsentStudents((prevAbsentStudents) =>
        prevAbsentStudents.filter((id) => id !== studentId)
      );
    } else {
      setAbsentStudents((prevAbsentStudents) => [
        ...prevAbsentStudents,
        studentId,
      ]);
      setPresentStudents((prevPresentStudents) =>
        prevPresentStudents.filter((id) => id !== studentId)
      );
    }

    setAttendenceDetails((prevDetails) => {
      const updatedAttendance = prevDetails.attendance.map((entry) => {
        if (new Date(entry.date).toDateString() === new Date().toDateString()) {
          return {
            ...entry,
            present: presentStudents,
            absent: absentStudents,
          };
        }
        return entry;
      });
      return { ...prevDetails, attendance: updatedAttendance };
    });
  };

  const handleSubmit = async () => {
    try {
      const totalStudents = teacher.batchId.students.length;

      if (presentStudents.length + absentStudents.length !== totalStudents) {
        setError("Please mark attendance for all students");
        setSuccess("");
        return;
      }

      const response = await axios.post("/teacher/add-attendence", {
        batchId: teacher.batchId._id,
        present: presentStudents,
        absent: absentStudents,
        date: new Date(),
      });

      fetchA

      console.log("Attendance uploaded successfully:", response.data);
      setPresentStudents([]);
      setAbsentStudents([]);
      setError("");
      setSuccess("Attendance uploaded successfully");
    } catch (error) {
      console.error("Error uploading attendance:", error);
      setError(error.response.data.message);
      setSuccess("");
    }
  };

  return (
    <div className="flex">
      <TeacherSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h3 className="text-3xl font-semibold mb-3 text-white">Attendance</h3>
        <div className="bg-gray-200 p-6 rounded-md shadow-md relative">
          <h4 className="text-2xl font-semibold mb-4 text-gray-700">
            Attendance Sheet
            <span className="text-sm absolute top-0 right-0 mr-4 mt-2">
              {currentDate}
            </span>
          </h4>
          <table className="w-full text-left table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Avatar</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Attendance</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {teacher &&
                teacher.batchId.students.map((student) => (
                  <tr key={student._id}>
                    <td className="border px-4 py-2">
                      <img
                        src={student.avatar}
                        alt="Student Avatar"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </td>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleAttendance(student._id, "Present")}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleAttendance(student._id, "Absent")}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md ml-2"
                      >
                        Absent
                      </button>
                    </td>
                    <td
                      className={`border px-4 py-2 ${
                        student.status === "Present"
                          ? "text-green-500"
                          : student.status === "Absent"
                          ? "text-red-500"
                          : "text-gray-900"
                      }`}
                    >
                      {student.status}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="rounded-md bg-zinc-600 text-white hover:bg-zinc-700 font-bold py-2 px-4 mt-4"
            >
              Upload Attendance
            </button>
          </div>
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {success && <div className="text-green-500 mt-4">{success}</div>}
        </div>

        <div className="mt-8">
          <h4 className="text-xl font-semibold mb-4 text-white">
            Attendance Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendanceDetails &&
              attendanceDetails.attendance
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((entry, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 p-4 rounded-md shadow-md"
                  >
                    {/* Date heading */}
                    <p className="font-semibold text-lg mb-2">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <div className="flex justify-between">
                      {/* Present students */}
                      <div>
                        <p className="font-semibold mb-1 mt-3">
                          Present Students: {entry.present.length}
                        </p>
                        <div className="flex flex-wrap items-center">
                          {entry.present.map((student, i) => (
                            <div
                              key={i}
                              className="flex items-center mb-2 mr-4"
                            >
                              <img
                                src={student.avatar}
                                alt="Student Avatar"
                                className="w-9 h-9 rounded-full object-cover mr-2"
                              />
                              <p>{student.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Absent students */}
                      <div>
                        <p className="font-semibold mb-1 mt-3">
                          Absent Students: {entry.absent.length}
                        </p>
                        <div className="flex flex-wrap items-center">
                          {entry.absent.map((student, i) => (
                            <div
                              key={i}
                              className="flex items-center mb-2 mr-4"
                            >
                              <img
                                src={student.avatar}
                                alt="Student Avatar"
                                className="w-9 h-9 rounded-full object-cover mr-2"
                              />
                              <p>{student.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherAttendance;
