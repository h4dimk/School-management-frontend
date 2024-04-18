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
        {timetables
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((timetable, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-md mb-4 relative"
            >
              <p className="text-white">
                Day: {new Date(timetable.date).toLocaleDateString()}
              </p>

              <p className="text-white">Period: {timetable.period}</p>
              <p className="text-white">Subject: {timetable.subject}</p>
              <p className="text-white">Teacher: {timetable.teacher.name}</p>
              <p className="text-white">Batch: {timetable.batch.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Timetable;
