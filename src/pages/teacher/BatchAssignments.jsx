import React, { useEffect, useState } from "react";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";
import { useSelector } from "react-redux";
import axios from "../../services/axiosService";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faDownload);

function BatchAssignments() {
  const { currentUser } = useSelector((state) => state.user);

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        `/teacher/get-assignments/${currentUser.batchId}`
      );
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const downloadAssignment = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex">
      <TeacherSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Batch Assignments
        </h2>
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
                  <div className="font-semibold text-lg">{assignment.name}</div>
                  <div className="flex items-center mt-2">
                    <img
                      src={assignment.student.avatar}
                      alt="Student Avatar"
                      className="w-10 h-10 rounded-full mr-2 object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium">
                        {assignment.student.name}
                      </div>
                    </div>
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
                    <FontAwesomeIcon icon="download" className="mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default BatchAssignments;
