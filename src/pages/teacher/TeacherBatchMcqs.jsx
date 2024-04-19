import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";
import axios from "../../services/axiosService";


function TeacherBatchMcqs() {
  const { currentUser } = useSelector((state) => state.user);
  const [mcqs, setMcqs] = useState([]);

  useEffect(() => {
    fetchMCQs();
  }, []);

  const fetchMCQs = async () => {
    try {
      const response = await axios.get(
        `/teacher/get-mcqs-batch/${currentUser.batchId}`
      );
      setMcqs(response.data.mcqs);
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    }
  };


  return (
    <div className="flex">
      <TeacherSideBar />

      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-4 text-white">
          Multiple Choice Questions  ({currentUser.batch})
        </h2>
        <div className="mt-8">
          {mcqs.map((mcq, index) => (
            <div key={index} className="bg-gray-800 p-4 mb-4 rounded-md">
              <h4 className="text-xl font-semibold mb-2 text-white">{`Question ${
                index + 1
              }: ${mcq.question}`}</h4>
              <div className="grid grid-cols-2 gap-4 mb-2 text-lg">
                {mcq.options.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <span className="font-semibold text-white">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <p className="ml-2 text-white">{option}</p>
                  </div>
                ))}
              </div>
              <p className="text-green-500 font-semibold">
                Correct Answer: {mcq.correctAnswer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherBatchMcqs;
