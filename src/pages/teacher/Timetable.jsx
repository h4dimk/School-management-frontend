import React, { useEffect, useState } from "react";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";
import { useSelector } from "react-redux";
import axios from "../../services/axiosService";

function Timetable() {
  const [timetables, setTimetables] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    getTimetables();
  }, []);

  const getTimetables = async () => {
    try {
      const response = await axios.get(
        `/teacher/get-timetable/${currentUser._id}`
      );
      setTimetables(response.data.timetables);
    } catch (error) {
      console.error("Error fetching timetables:", error);
    }
  };
  return (
    <div className="flex">
      <TeacherSideBar />
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