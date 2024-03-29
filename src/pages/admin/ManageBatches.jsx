import React, { useState, useEffect } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import axios from "../../services/axiosService";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function ManageBatches() {
  const [batches, setBatches] = useState([]);
  const [newBatchName, setNewBatchName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [batchToRemove, setBatchToRemove] = useState(null);

  useEffect(() => {
    getBatches();
  }, []);

  const getBatches = async () => {
    try {
      const response = await axios.get("/admin/get-batches");
      setBatches(response.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const addBatch = async () => {
    const batchFormatRegex = /^\d{4}-\d{4}$/;
    if (!batchFormatRegex.test(newBatchName)) {
      setErrorMessage("Batch name must be in the format YYYY-YYYY");
      return;
    }
    try {
      await axios.post("/admin/add-batch", { name: newBatchName });
      setNewBatchName("");
      setErrorMessage("");
      getBatches();
    } catch (error) {
      console.error("Error adding batch:", error);
    }
  };

  const removeBatch = async (batchId) => {
    setBatchToRemove(batchId);
    setIsOpen(true);
  };

  const confirmRemoveBatch = async () => {
    try {
      await axios.delete(`/admin/remove-batch/${batchToRemove}`);
      getBatches();
    } catch (error) {
      console.error("Error removing batch:", error);
    }
    setIsOpen(false);
  };

  return (
    <div className="flex">
      <AdminSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-4 text-white">Batches</h2>
        <div className="flex mb-4">
          <input
            type="text"
            className="px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700 bg-white"
            placeholder="Enter batch name"
            value={newBatchName}
            onChange={(e) => setNewBatchName(e.target.value)}
          />
          <button
            className="ml-2 rounded-md bg-zinc-600 text-white hover:bg-zinc-700 font-bold py-2 px-4"
            onClick={addBatch}
          >
            Add
          </button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <ul className="text-zinc-600">
          {batches.map((batch) => (
            <li
              key={batch._id}
              className="flex items-center justify-between mb-2"
            >
              <span className="text-white">{batch.name}</span>
              <button
                className="rounded-md bg-red-600 text-white hover:bg-red-700 font-bold py-1 px-2"
                onClick={() => removeBatch(batch._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <Popup
          open={isOpen}
          closeOnDocumentClick
          onClose={() => setIsOpen(false)}
          modal
        >
          <div className="p-5">
            <p className="text-lg font-semibold text-gray-700">
              Are you sure you want to remove this batch?
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

export default ManageBatches;
