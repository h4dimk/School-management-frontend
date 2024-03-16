import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../services/axiosService";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";

function TeacherProfile() {
  const [profileData, setProfileData] = useState({});
  const [errors, setErrors] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `/teacher/get-teacher/${currentUser._id}`
        );
        setProfileData(response.data.teacher);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate name
    if (!profileData?.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Validate date of birth
    if (!profileData?.dob.trim()) {
      newErrors.dob = "Date of Birth is required";
      valid = false;
    } else {
      // Regular expression to match the date format MM/DD/YYYY or MM-DD-YYYY
      const dateRegex =
        /^(0[1-9]|1[0-2])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
      if (!dateRegex.test(profileData.dob)) {
        newErrors.dob =
          "Invalid date format. Please use MM/DD/YYYY or MM-DD-YYYY";
        valid = false;
      }
    }

    // Validate gender
    if (!profileData?.gender.trim()) {
      newErrors.gender = "Gender is required";
      valid = false;
    }

    // Validate phone number
    if (
      !profileData?.phonenumber ||
      !/^\d{10}$/.test(profileData.phonenumber)
    ) {
      newErrors.phonenumber = "Enter a valid Phone Number";
      valid = false;
    }

    // Validate password
    if (!profileData?.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const updateProfile = async () => {
    try {
      if (validateForm()) {
        const response = await axios.put(
          `/teacher/update-teacher/${currentUser._id}`,
          profileData
        );
        console.log("Profile updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <TeacherSideBar />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-4 text-white">Profile</h2>

        <div className="flex items-center justify-center mb-6">
          <div className="h-44 w-44 rounded-full overflow-hidden bg-white">
            <img
              src={profileData?.avatar}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-600">
          <div>
            <label htmlFor="name" className="text-white font-medium">
              Name:
            </label>
            {errors.name && <p className="text-red-500 ">{errors.name}</p>}
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white mt-2"
              value={profileData?.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="dob" className="text-white font-medium">
              Date of Birth:
            </label>
            {errors.dob && <p className="text-red-500 ">{errors.dob}</p>}
            <input
              type="text"
              id="dob"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white mt-2"
              value={profileData?.dob}
              onChange={(e) =>
                setProfileData({ ...profileData, dob: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="gender" className="text-white font-medium">
              Gender:
            </label>
            {errors.gender && <p className="text-red-500 ">{errors.gender}</p>}
            <select
              id="gender"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white mt-2"
              value={profileData?.gender}
              onChange={(e) =>
                setProfileData({ ...profileData, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="text-white font-medium">
              Phone Number:
            </label>
            {errors.phonenumber && (
              <p className="text-red-500 ">{errors.phonenumber}</p>
            )}
            <input
              type="text"
              id="phone"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white mt-2"
              value={profileData?.phonenumber}
              onChange={(e) =>
                setProfileData({ ...profileData, phonenumber: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email" className="text-white font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white mt-2"
              value={profileData?.email}
              disabled
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white font-medium">
              Password:
            </label>
            {errors.password && (
              <p className="text-red-500 ">{errors.password}</p>
            )}
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white mt-2"
              value=""
              onChange={(e) =>
                setProfileData({ ...profileData, password: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="subject" className="text-white font-medium">
              Subject:
            </label>

            <input
              type="text"
              id="subject"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white mt-2"
              value={profileData?.subject}
              disabled
            />
          </div>
        </div>
        <button
          className="rounded-md bg-zinc-600 text-white hover:bg-zinc-700 font-bold py-2 px-4 mt-4"
          onClick={updateProfile}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default TeacherProfile;
