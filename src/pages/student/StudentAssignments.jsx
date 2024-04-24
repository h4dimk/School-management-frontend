import React, { useState, useEffect } from "react";
import StudentSideBar from "../../components/student/StudentSideBar";
import axios from "../../services/axiosService";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faDownload } from "@fortawesome/free-solid-svg-icons";

function StudentAssignments() {
  const { currentUser } = useSelector((state) => state.user);

  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        `/student/get-assignments/${currentUser._id}`
      );
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size should be less than 5MB.");
      setNewAssignment(null);
    } else {
      setNewAssignment(file);
      setFileName(file.name);
      setErrorMessage("");
    }
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const uploadAssignment = async () => {
    if (!newAssignment) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    try {
      const storage = getStorage();
      const fileNameWithTime = new Date().getTime() + newAssignment.name;
      const storageRef = ref(storage, fileNameWithTime);
      const uploadTask = uploadBytesResumable(storageRef, newAssignment);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading assignment:", error);
          setErrorMessage("Error uploading assignment. Please try again.");
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await axios.post("/student/upload-assignment", {
              name: fileName,
              assignment: downloadURL,
              studentId: currentUser._id,
              batchId: currentUser.batchId,
            });
            setNewAssignment(null);
            setFileName("");
            setErrorMessage("");
            setUploadProgress(0);
            setSuccessMessage("File uploaded successfully.");
            fetchAssignments();
          } catch (error) {
            console.error("Error storing assignment data:", error);
            setErrorMessage("Error storing assignment data. Please try again.");
          }
        }
      );
    } catch (error) {
      console.error("Error uploading assignment:", error);
      setErrorMessage("Error uploading assignment. Please try again.");
    }
  };

  const downloadAssignment = (url) => {
    // Trigger file download
    window.open(url, "_blank");
  };

  return (
    <div className="flex">
      <StudentSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h3 className="text-3xl font-semibold mb-3 text-white">Assignments</h3>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-4 text-white">Upload File</h2>

          <div className="flex items-center mb-2">
            <div className="bg-gray-200 p-4 rounded-lg shadow-md">
              <input
                className="px-3 py-2 mr-2 border rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter Assignment Name"
                value={fileName}
                onChange={handleFileNameChange}
              />
              <input
                className="px-3 py-2 mr-2 border rounded-lg focus:outline-none"
                id="file_input"
                type="file"
                onChange={handleFileChange}
              />
              <button
                className="bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-800"
                onClick={uploadAssignment}
              >
                <FontAwesomeIcon icon={faUpload} className="mr-2" />
                Upload
              </button>
            </div>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {uploadProgress > 0 && (
            <p className="text-gray-500">Uploading: {uploadProgress}%</p>
          )}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>
        <div className="mb-4 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-white">Uploaded Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignments
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((assignment) => (
                <div
                  key={assignment._id}
                  className="p-4 rounded-lg shadow-md bg-gray-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-semibold text-lg">
                      {assignment.name}
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-sm">
                      {new Date(assignment.createdAt).toLocaleDateString()}
                    </div>
                    <button
                      className="bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-800 inline-flex items-center"
                      onClick={() => downloadAssignment(assignment.assignment)}
                    >
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAssignments;
