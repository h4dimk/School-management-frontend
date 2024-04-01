import React, { useEffect, useState } from "react";
import axios from "../../services/axiosService";
import { useSelector } from "react-redux";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";

function TeacherBatch() {
  const [teacher, setTeacher] = useState(null);
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
  }, [currentUser._id]); 

  return (
    <div className="flex">
      <TeacherSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        {teacher && (
          <>
            <h2 className="text-3xl font-semibold mb-4 text-white">
              Batch: {teacher.batchId.name}
            </h2>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-white">
                Students:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3">
                {teacher.batchId.students.map((student) => (
                  <div
                    key={student._id}
                    className="bg-gray-300 p-4 rounded-lg shadow-md"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <img
                        src={student.avatar}
                        alt={`${student.name}'s avatar`}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {student.name}
                        </h3>
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
                    <p className="text-gray-700 mb-2">
                      Course: {student.course}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Gender: {student.gender}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TeacherBatch;
