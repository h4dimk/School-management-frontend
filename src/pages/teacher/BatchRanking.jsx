import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";
import axios from "../../services/axiosService";

function BatchRanking() {
  const { currentUser } = useSelector((state) => state.user);
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    fetchRanks();
  }, []);

  const fetchRanks = async () => {
    try {
      const response = await axios.get(
        `/teacher/get-batch-ranks/${currentUser.batchId}`
      );
      setRanks(response.data.ranks);
    } catch (error) {
      console.error("Error fetching batch ranks:", error);
    }
  };
  return (
    <div className="flex ">
      <TeacherSideBar />
      <div className="container mx-auto px-4 py-8 flex-1 ml-56">
        <h3 className="text-3xl font-semibold mb-6 text-white">
          Batch Ranking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ranks.map((rank, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-md shadow-md hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <h4 className="text-3xl font-semibold text-white mr-2">
                  #{index + 1}
                </h4>
                <h4 className="text-xl font-semibold text-white">
                  {rank.studentDetails.name}
                </h4>
                <p className="text-gray-400 ml-auto">
                  Correct Answers: {rank.totalCorrect}
                </p>
              </div>
              <img
                src={rank.studentDetails.avatar}
                alt={rank.studentDetails.name}
                className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
              />
              <div className="grid grid-cols-1 gap-2 text-center">
                {" "}
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Email:</span>{" "}
                  {rank.studentDetails.email}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-white">Course:</span>{" "}
                  {rank.studentDetails.course}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BatchRanking;
