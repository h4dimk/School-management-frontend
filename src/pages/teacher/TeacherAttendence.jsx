import React, { useState, useEffect } from "react";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";
import axios from "../../services/axiosService";
import { useSelector } from "react-redux";

function TeacherAttendance() {
  const [teacher, setTeacher] = useState(null);
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(
          `/teacher/get-teacher/${currentUser._id}`
        );
        const teacherWithBatchAndStudents = response.data.teacher;
        setTeacher(teacherWithBatchAndStudents);
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };

    fetchTeacher();

    // Set current date
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
    // Update student's attendance status
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

    // Update present and absent students arrays
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

    // Functionality to mark attendance
    console.log(
      `Marking attendance for student ${studentId} as ${attendanceStatus}`
    );
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
      </div>
    </div>
  );
}

export default TeacherAttendance;
