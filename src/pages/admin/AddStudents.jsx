import React, { useState, useEffect } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { getStorage } from "firebase/storage";
import { app } from "../../firebase";
import axios from "../../services/axiosService";

function AddStudents() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [gender, setGender] = useState("");
  // const [avatar, setAvatar] = useState("");
  const [coursesList, setCoursesList] = useState([]);
  const [batchesList, setBatchesList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchBatches();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/admin/get-courses");
      if (response.data) {
        setCoursesList(response.data);
      } else {
        console.error("Response data is null or undefined");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchBatches = async () => {
    try {
      const response = await axios.get("/admin/get-batches");
      if (response.data) {
        setBatchesList(response.data);
      } else {
        console.error("Response data is null or undefined");
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      course.trim() === "" ||
      batch.trim() === "" ||
      gender.trim() === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    const newStudent = {
      name,
      email,
      course,
      batch,
      gender,
    };
    try {
      const response = await axios.post("/admin/add-student", newStudent);
      setName("");
      setEmail("");
      setCourse("");
      setBatch("");
      setGender("");
      setError("");
      console.log("Student added successfully:", response.data);
    } catch (error) {
      console.error("Error adding student:", error);
      setError(error.response.data.error);
    }
  };

  // const handleAvatarChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setAvatar(reader.result);
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="flex h-screen">
      <AdminSideBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-4 text-white">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label htmlFor="name" className="text-white font-medium">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-white font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="course" className="text-white font-medium">
                Course:
              </label>
              <select
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
                required
              >
                <option value="">Select Course</option>
                {coursesList.map((course) => (
                  <option key={course._id} value={course.course}>
                    {course.course}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="batch" className="text-white font-medium">
                Batch:
              </label>
              <select
                id="batch"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
                required
              >
                <option value="">Select Batch</option>
                {batchesList.map((batch) => (
                  <option key={batch._id} value={batch.batch}>
                    {batch.batch}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="text-white font-medium">
                Gender:
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {/* <div className="mb-4">
              <label htmlFor="avatar" className="text-white font-medium">
                Profile Photo:
              </label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <label
                htmlFor="avatar"
                className="cursor-pointer text-blue-500 hover:underline"
              >
                Choose File
              </label>
            </div> */}
          </div>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-zinc-600 text-white hover:bg-zinc-700"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudents;
