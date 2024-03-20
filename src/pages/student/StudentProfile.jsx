import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAuth, updateProfile } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "../../services/axiosService";
import StudentSideBar from "../../components/student/StudentSideBar";

function StudentProfile() {
  const [profileData, setProfileData] = useState({});
  const [errors, setErrors] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [modifiedFields, setModifiedFields] = useState({});
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePerc, setImagePerc] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `/student/get-student/${currentUser._id}`
        );
        setProfileData(response.data.student);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [currentUser._id]);

  const handleFileUpload = async (image) => {
    const storage = getStorage();
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePerc(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProfileData({ ...profileData, avatar: downloadURL });
          setModifiedFields({ ...modifiedFields, avatar: downloadURL });
          updateProfileInAuth(downloadURL);
        });
      }
    );
  };

  const updateProfileInAuth = async (downloadURL) => {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      photoURL: downloadURL,
    })
      .then(() => {
        console.log("Profile picture updated in Firebase Auth");
      })
      .catch((error) => {
        console.error(
          "Error updating profile picture in Firebase Auth:",
          error
        );
      });
  };

  const handleAvatarChange = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate name
    if (!profileData.name?.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Validate date of birth
    if (!profileData.dob?.trim()) {
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
    if (!profileData.gender?.trim()) {
      newErrors.gender = "Gender is required";
      valid = false;
    }

    // Validate phone number
    if (!profileData.phonenumber || !/^\d{10}$/.test(profileData.phonenumber)) {
      newErrors.phonenumber = "Enter a valid Phone Number";
      valid = false;
    }

    // Validate password
    if (!profileData.password?.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleFieldChange = (fieldName, value) => {
    setProfileData({ ...profileData, [fieldName]: value });
    setModifiedFields({ ...modifiedFields, [fieldName]: value });
  };

  const updateProfile = async () => {
    try {
      if (validateForm()) {
        const response = await axios.put(
          `/student/update-student/${currentUser._id}`,
          modifiedFields
        );
        console.log("Profile updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <StudentSideBar />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-4 text-white">Profile</h2>

        <div className="flex items-center justify-center mb-6">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={handleAvatarChange}
          />
          <img
            src={profileData.avatar}
            alt="Profile"
            className="h-44 w-44  cursor-pointer rounded-full object-cover"
            onClick={() => fileRef.current.click()}
          />
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
              value={profileData.name || ""}
              onChange={(e) => handleFieldChange("name", e.target.value)}
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
              value={profileData.dob || ""}
              onChange={(e) => handleFieldChange("dob", e.target.value)}
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
              value={profileData.gender || ""}
              onChange={(e) => handleFieldChange("gender", e.target.value)}
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
              value={profileData.phonenumber || ""}
              onChange={(e) => handleFieldChange("phonenumber", e.target.value)}
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
              value={profileData.email || ""}
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
              onChange={(e) => handleFieldChange("password", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="course" className="text-white font-medium">
              Course:
            </label>
            {/* Assuming profileData.course is a string */}
            <input
              type="text"
              id="course"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white mt-2"
              value={profileData?.course}
              disabled
            />
          </div>
          <div>
            <label htmlFor="batch" className="text-white font-medium">
              Batch:
            </label>
            <input
              type="text"
              id="batch"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white mt-2"
              value={profileData?.batch}
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

export default StudentProfile;
