import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../services/axiosService";
import StudentSideBar from "../../components/student/StudentSideBar";

function Timetable() {
  const [timetables, setTimetables] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    getTimetables();
  }, []);

  const getTimetables = async () => {
    try {
      const response = await axios.get(
        `/student/get-timetable/${currentUser.batchId}`
      );
      setTimetables(response.data.timetables);
    } catch (error) {
      console.error("Error fetching timetables:", error);
    }
  };

  return (
    <div className="flex">
      <StudentSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-4 text-white">Time Table</h2>
        <div className="grid grid-cols-1 gap-4">
          {timetables
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((timetable, index) => (
              <div
                  key={index}
                  className="bg-gray-800 p-4 rounded-md table w-full"
                >
                  <thead className="text-white">
                    <tr>
                      <th className="border px-4 py-2">Day</th>
                      <th className="border px-4 py-2">Period</th>
                      <th className="border px-4 py-2">Subject</th>
                      <th className="border px-4 py-2">Teacher</th>
                      <th className="border px-4 py-2">Batch</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-white px-4 py-2 border text-center">
                        {new Date(timetable.date).toLocaleDateString()}
                      </td>
                      <td className="text-white px-4 py-2 border text-center">
                        {timetable.period}
                      </td>
                      <td className="text-white px-4 py-2 border text-center">
                        {timetable.subject}
                      </td>
                      <td className="text-white px-4 py-2 border text-center">
                        {timetable.teacher.name}
                      </td>
                      <td className="text-white px-4 py-2 border text-center">
                        {timetable.batch.name}
                      </td>
                      
                    </tr>
                  </tbody>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Timetable;
