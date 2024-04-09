import React, { useState, useEffect } from "react";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";
import axios from "../../services/axiosService";
import { useSelector } from "react-redux";

function TeacherLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch leave data when the component mounts
    // fetchLeaves();
  }, []);

  // const fetchLeaves = async () => {
  //   try {
  //     const response = await axios.get(
  //       `/teacher/get-leaves/${currentUser._id}`
  //     ); // Assuming this is the endpoint to fetch leaves
  //     setLeaves(response.data.leaves);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching leaves:", error);
  //     setError("Failed to fetch leaves. Please try again later.");
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex">
      <TeacherSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-6 text-white">
          Leaves Applied by Students
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            {leaves.length === 0 ? (
              <p>No leaves applied by students.</p>
            ) : (
              <ul>
                {leaves.map((leave) => (
                  <li key={leave.id}>
                    {/* Render leave information here */}
                    {/* Example: <p>{leave.startDate} - {leave.endDate}</p> */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherLeaves;
