import React, { useEffect, useState } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import axios from "../../services/axiosService";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [timeTableToRemove, setTimeTableToRemove] = useState(null);

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
      const response = await axios.post("/admin/add-timetable", timetableData);

      console.log("Timetable added successfully");
      setTimetableData({
        date: "",
        period: "",
        subject: "",
        teacher: "",
        batch: "",
      });
      setErrorMessage("");
      getTimetables();
    } catch (error) {
      console.error("Error adding timetable:", error);
      setErrorMessage(error.response.data.message);
    }
  };

  const handleRemove = async (timeTableId) => {
    setTimeTableToRemove(timeTableId);
    setIsOpen(true);
  };

  const confirmRemoveBatch = async () => {
    try {
      await axios.delete(`/admin/remove-timetable/${timeTableToRemove}`);
      getTimetables();
    } catch (error) {
      console.error("Error deleting timetable:", error);
    }
    setIsOpen(false);
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-4 text-white">
          Add Time Table
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
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

          <div className="col-span-1">
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

          <div className="col-span-1">
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

          <div className="col-span-1">
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

          <div className="col-span-1">
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

          <div className="col-span-3">
            <button
              type="submit"
              className="w-full bg-zinc-600 text-white py-2 rounded-md hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700"
            >
              Add Time Table
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className="text-red-500 mb-4 mt-3">{errorMessage}</div>
        )}

        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Added Timetables
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {timetables
              .slice()
              .sort((a, b) => new Date(a.date) - new Date(b.date))
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
                      <th className="border px-4 py-2"> Remove</th>
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
                      <td className="text-white px-4 py-2 border text-center">
                        <button
                          onClick={() => handleRemove(timetable._id)}
                          className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 "
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </div>
              ))}
          </div>
        </div>
        <Popup
          open={isOpen}
          closeOnDocumentClick
          onClose={() => setIsOpen(false)}
          modal
        >
          <div className="p-5">
            <p className="text-lg font-semibold text-gray-700">
              Are you sure you want to remove this Timetable?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-600 text-white hover:bg-red-700 font-bold py-1 px-2 mr-2 rounded-md "
                onClick={confirmRemoveBatch}
              >
                Yes
              </button>
              <button
                className="bg-zinc-600 text-white hover:bg-zinc-700 font-bold py-1 px-2 rounded-md "
                onClick={() => setIsOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default AddTimeTable;
