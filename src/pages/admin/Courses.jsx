import React, { useState, useEffect } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import axios from "../../services/axiosService";
import Popup from "reactjs-popup"; // Import Popup from reactjs-popup
import "reactjs-popup/dist/index.css";

function Courses() {
  const [course, setCourse] = useState("");
  const [subjects, setSubjects] = useState([{ name: "" }]);
  const [coursesList, setCoursesList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [courseToRemove, setCourseToRemove] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/admin/get-courses");
      if (response.data) {
        const coursesWithSubjects = response.data.map((course) => ({
          ...course,
          subjects: course.subjects || [],
        }));
        setCoursesList(coursesWithSubjects);
      } else {
        console.error("Response data is null or undefined");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleCourseChange = (event) => {
    setCourse(event.target.value);
  };

  const handleSubjectNameChange = (index, event) => {
    const newSubjects = [...subjects];
    newSubjects[index].name = event.target.value;
    setSubjects(newSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "" }]);
  };

  const handleRemoveSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  const handleRemoveCourse = async (index) => {
    setCourseToRemove(coursesList[index]._id);
    setIsOpen(true); // Open the popup
  };

  const confirmRemoveCourse = async () => {
    try {
      await axios.delete(`/admin/remove-course/${courseToRemove}`);
      const newCoursesList = coursesList.filter(
        (course) => course._id !== courseToRemove
      );
      setCoursesList(newCoursesList);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
    setIsOpen(false); // Close the popup
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/admin/add-course", {
        course,
        subjects,
      });
      fetchCourses();
      setCourse("");
      setSubjects([{ name: "" }]);
    } catch (error) {
      console.error("Error adding course:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-6 text-white">Courses</h2>
        <div className="flex flex-col md:flex-row">
          <div className=" h-2/5 w-full md:w-1/2 bg-gray-200 p-6 rounded-md shadow-md mb-6 md:mr-4">
            <form onSubmit={handleSubmit} className="mb-6">
              {error && <div className="text-red-500 mb-4">{error}</div>}

              <div className="mb-4">
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course:
                </label>
                <input
                  type="text"
                  id="course"
                  value={course}
                  onChange={handleCourseChange}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Subjects:
                </label>
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) => handleSubjectNameChange(index, e)}
                      className="mr-2 px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
                      placeholder="Subject name"
                      required
                    />
                    {subjects.length > 1 && (
                      <button
                        type="button"
                        className="ml-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={() => handleRemoveSubject(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="bg-zinc-700 text-white px-4 py-2 rounded-md mb-2 hover:bg-zinc-800"
                >
                  Add Subject
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-800"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
          <div className="w-full md:w-1/2">
            <div className="bg-gray-200 p-6 rounded-md shadow-md">
              <h2 className="text-lg font-semibold mb-4">Added Courses:</h2>
              {coursesList.map((item, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border bg-white rounded-md"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <strong>Course:</strong> {item.course}
                    </div>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                      onClick={() => handleRemoveCourse(index)}
                    >
                      Remove
                    </button>
                  </div>
                  <strong>Subjects:</strong>
                  <ul>
                    {item.subjects &&
                      item.subjects.map((subject, subIndex) => (
                        <li key={subIndex}>{subject.name}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
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
              Are you sure you want to remove this course?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-600 text-white hover:bg-red-700 font-bold py-1 px-2 mr-2 rounded-md"
                onClick={confirmRemoveCourse}
              >
                Yes
              </button>
              <button
                className="bg-zinc-600 text-white hover:bg-zinc-700 font-bold py-1 px-2 rounded-md"
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

export default Courses;
