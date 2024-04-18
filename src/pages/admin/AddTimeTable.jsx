import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import axios from "../../services/axiosService";

function AddTimeTable() {
  const [timetableData, setTimetableData] = useState({
    date: "",
    period: "",
    subject: "",
    teacher: "",
    batch: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [timetables, setTimetables] = useState([]);

  useEffect(() => {
    fetchTeachers();
    getBatches();
    getTimetables();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("/admin/get-teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const getBatches = async () => {
    try {
      const response = await axios.get("/admin/get-batches");
      setBatches(response.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const getTimetables = async () => {
    try {
      const response = await axios.get("/admin/get-timetable");
      setTimetables(response.data.timetables);
    } catch (error) {
      console.error("Error fetching timetables:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTimetableData({ ...timetableData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/admin/add-timetable", timetableData);
      console.log("Timetable added successfully");
      setTimetableData({
        date: "",
        period: "",
        subject: "",
        teacher: "",
        batch: "",
      });
      getTimetables(); // Refresh timetables after adding
    } catch (error) {
      console.error("Error adding timetable:", error);
    }
  };

  const handleRemove = async (index) => {
    try {
      await axios.delete(`/admin/remove-timetable/${timetables[index]._id}`);
      console.log("Timetable deleted successfully");
      getTimetables(); // Refresh timetables after deleting
    } catch (error) {
      console.error("Error deleting timetable:", error);
    }
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-4 text-white">
          Add Time Table
        </h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <input
              type="date"
              name="date"
              value={timetableData.date}
              onChange={handleChange}
              placeholder="Date"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <select
              name="period"
              value={timetableData.period}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
              required
            >
              <option value="">Select Period</option>
              {[1, 2, 3, 4].map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <select
              name="teacher"
              value={timetableData.teacher}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="subject"
              value={timetableData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <select
              name="batch"
              value={timetableData.batch}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
              required
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-600 text-white py-2 rounded-md hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700"
          >
            Add Time Table
          </button>
        </form>
        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Added Timetables
          </h2>
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
                <button
                  onClick={() => handleRemove(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 absolute bottom-0 right-0 mb-3 mr-3"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AddTimeTable;
