import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../services/axiosService";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";

function TeacherRemarks() {
  const { currentUser } = useSelector((state) => state.user);

  const [newRemark, setNewRemark] = useState("");
  const [batch, setBatch] = useState("");
  const [batchesList, setBatchesList] = useState([]);
  const [subject, setSubject] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [remarksList, setRemarksList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileErrorMessage, setFileErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchBatches();
    fetchRemarks();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await axios.get("/teacher/get-batches");
      if (response.data) {
        setBatchesList(response.data.batches);
      } else {
        console.error("Response data is null or undefined");
      }
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const fetchRemarks = async () => {
    try {
      const response = await axios.get(
        `/teacher/get-remarks/${currentUser._id}`
      );
      if (response.data && response.data.remarks) {
        setRemarksList(response.data.remarks);
      } else {
        console.error("No remarks found in the response");
      }
    } catch (error) {
      console.error("Error fetching remarks:", error);
    }
  };

  const handleBatchChange = (event) => {
    setBatch(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleRemarkChange = (event) => {
    setNewRemark(event.target.value);
    setErrorMessage("");
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size should be less than 5MB.");
      setFile(null);
    } else {
      setFile(file);
      setFileName(file.name);
      setErrorMessage("");
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setFileErrorMessage("Please select a file to upload.");
      return;
    }

    try {
      const storage = getStorage();
      const fileNameWithTime = new Date().getTime() + fileName;
      const storageRef = ref(storage, fileNameWithTime);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading file:", error);
          setFileErrorMessage("Error uploading file. Please try again.");
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setFileErrorMessage(""); // Clear file error message if any
            setFile(downloadURL); // Set file URL to the state
            setSuccessMessage("File uploaded successfully.");
          } catch (error) {
            console.error("Error storing file data:", error);
            setErrorMessage("Error storing file data. Please try again.");
          }
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error uploading file. Please try again.");
    }
  };

  const handleSubmitRemark = async (event) => {
    event.preventDefault();

    if (batch.trim() === "") {
      setErrorMessage("Please select a batch.");
      return;
    }

    if (subject.trim() === "") {
      setErrorMessage("Please enter a subject.");
      return;
    }

    if (newRemark.trim() === "") {
      setErrorMessage("Please enter a remark before submitting.");
      return;
    }

    try {
      const remarkData = {
        remark: newRemark,
        batchId: batch,
        subject,
        date: new Date().toISOString(),
        teacherId: currentUser._id,
        files: file,
      };

      await axios.post("/teacher/add-remarks", remarkData);
      fetchRemarks();
      // Reset form fields
      setNewRemark("");
      setBatch("");
      setSubject("");
      setFileName("");
      setFile(null);
      setErrorMessage("");
      setFileErrorMessage("");
      setSuccessMessage("Remark added successfully.");
    } catch (error) {
      console.error("Error saving remark data:", error);
      setErrorMessage("Error saving remark data. Please try again.");
    }
  };

  const downloadAssignment = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex">
      <TeacherSideBar />

      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-4 text-white">Add Remarks</h2>

        <form onSubmit={handleSubmitRemark}>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label
                htmlFor="batch"
                className="text-white font-medium block text-lg mb-2"
              >
                Assign Batch:
              </label>
              <select
                id="batch"
                value={batch}
                onChange={handleBatchChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
                required
              >
                <option value="">Select Batch</option>
                {batchesList.map((batch) => (
                  <option key={batch._id} value={batch._id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label
                htmlFor="subject"
                className="block text-lg font-medium mb-2 text-white"
              >
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={handleSubjectChange}
                className="shadow-sm focus:ring-zinc-500 focus:border-zinc-500 rounded-md w-full sm:text-sm p-2.5"
                placeholder="Enter subject name"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="new-remark"
              className="block text-lg font-medium mb-2 text-white"
            >
              Remark:
            </label>
            <textarea
              id="new-remark"
              name="new-remark"
              rows={5}
              className={`shadow-sm focus:ring-zinc-500 focus:border-zinc-500 rounded-md w-full sm:text-sm p-2.5 ${
                errorMessage ? "border-red-500" : ""
              }`}
              value={newRemark}
              onChange={handleRemarkChange}
              placeholder="Enter your remark here..."
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
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
                  type="button"
                  onClick={uploadFile}
                >
                  <FontAwesomeIcon icon={faUpload} className="mr-2" />
                  Upload
                </button>
              </div>
            </div>

            {fileErrorMessage && (
              <p className="text-red-500">{fileErrorMessage}</p>
            )}
            {uploadProgress > 0 && (
              <p className="text-gray-500">Uploading: {uploadProgress}%</p>
            )}
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-zinc-700 font-medium text-white rounded-md hover:bg-zinc-800 focus:outline-none focus:ring-zinc-500"
          >
            Add Remark
          </button>
        </form>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-3xl font-bold mb-6 text-white">Remarks List</h3>
          <ul className="divide-y divide-gray-600">
            {remarksList
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((remark, index) => (
                <li key={index} className="py-4">
                  <div className="flex justify-between items-center px-4 py-2 bg-gray-400 rounded-md">
                    <div className="flex items-center space-x-4">
                      <div className="space-x-1">
                        <span className="text-lg font-semibold text-white">
                          {remark.batchId.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          ({remark.subject})
                        </span>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-right text-white">
                      {new Date(remark.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-gray-300 rounded-md mt-2 text-black">
                    <div className="mb-2 rounded-md p-2">
                      <strong className="text-gray-800">Remark:</strong>
                      <div className="bg-white border border-gray-300 rounded-md p-2 mt-1">
                        {remark.remark}
                      </div>
                    </div>
                    {remark.files && (
                      <div className="mt-2">
                        <strong>Given document: </strong>
                        <br />
                        <button
                          className="bg-zinc-700 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded mt-2"
                          onClick={() => downloadAssignment(remark.files)}
                        >
                          <FontAwesomeIcon icon={faDownload} className="mr-2" />
                          Download
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeacherRemarks;
