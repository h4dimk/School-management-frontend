import React, { useState } from "react";
import axios from "../../services/axiosService";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { getStorage } from "firebase/storage";
import { app } from "../../firebase";

function AddTeachers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [gender, setGender] = useState("");
  // const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newTeacher = { name, email, subject, gender };
      const response = await axios.post("/admin/add-teacher", newTeacher);
      console.log("Teacher added successfully", response.data);
      // Reset the form after successful submission
      setName("");
      setEmail("");
      setSubject("");
      setGender("");
      // setAvatar("");
      setError("");
    } catch (error) {
      console.error("Error adding teacher:", error);
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
        <h2 className="text-3xl font-semibold mb-4 text-white">Add Teacher</h2>
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
              <label htmlFor="subject" className="text-white font-medium">
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
                required
              />
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
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-zinc-600 text-white hover:bg-zinc-700"
          >
            Add Teacher
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTeachers;
