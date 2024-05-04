import React, { useEffect, useState } from "react";
import StudentSideBar from "../../components/student/StudentSideBar";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import axios from "../../services/axiosService";

function StudentRemarks() {
  const { currentUser } = useSelector((state) => state.user);
  const [remarksList, setRemarksList] = useState([]);

  useEffect(() => {
    fetchRemarks();
  }, []);

  const fetchRemarks = async () => {
    try {
      const response = await axios.get(
        `/student/get-remarks/${currentUser.batchId}`
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

  const downloadAssignment = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex">
      <StudentSideBar />

      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-4 text-white">Remarks</h2>
        <div className="bg-gray-800 rounded-lg p-6">
          <ul className="divide-y divide-gray-600">
            {remarksList
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((remark, index) => (
                <li key={index} className="py-4">
                  <div className="flex justify-between items-center px-4 py-2 bg-gray-600 rounded-md">
                    <div className="flex items-center space-x-2">
                      <img
                        src={remark.teacherId.avatar}
                        alt="Teacher avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="space-x-1">
                        <span className="text-lg font-semibold text-white">
                          {remark.teacherId.name}
                        </span>
                        <span className="text-sm text-gray-400">
                          ({remark.subject})
                        </span>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-right text-white">
                      {new Date(remark.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-gray-700 rounded-md mt-2 text-white">
                    <div className="mb-2 rounded-md p-2">
                      <strong className="text-gray-300">Remark:</strong>
                      <div className="bg-gray-600 border border-gray-500 rounded-md p-2 mt-1">
                        {remark.remark}
                      </div>
                    </div>
                    {remark.files && (
                      <div className="mt-2">
                        <strong className="text-gray-300">
                          Given document:{" "}
                        </strong>
                        <br />
                        <button
                          className="bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded mt-2"
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

export default StudentRemarks;
