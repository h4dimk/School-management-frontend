import React, { useEffect, useState } from "react";
import axios from "../../services/axiosService";
import StudentSideBar from "../../components/student/StudentSideBar";
import { useSelector } from "react-redux";

function StudentMcqs() {
  const [mcqs, setMcqs] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchMCQs();
  }, []);

  const fetchMCQs = async () => {
    try {
      const response = await axios.get(
        `/student/get-mcqs-batch/${currentUser.batchId}`
      );
      setMcqs(response.data.mcqs);
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    }
  };

  const submitAnswer = async (mcqId, selectedOption) => {
    try {
      const response = await axios.post("/student/submit-answer", {
        mcqId,
        selectedOption,
      });
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="flex">
      <StudentSideBar />
      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-4 text-white">
          Multiple Choice Questions
        </h2>
        {mcqs.map((mcq, index) => (
          <div key={index} className="bg-gray-200 p-4 mb-4 rounded-md">
            <h3 className="text-xl font-semibold mb-2">{`Question ${
              index + 1
            }: ${mcq.question}`}</h3>
            <div className="grid grid-cols-2 gap-4 text-lg">
              {mcq.options.map((option, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name={`mcq-${mcq._id}`}
                    value={option}
                    className="mr-2"
                  />
                  <label htmlFor={`option-${index}`} className="cursor-pointer">
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <button
              onClick={() => submitAnswer(mcq._id, selectedOption)}
              className="mt-4 bg-zinc-600 hover:bg-zinc-700 text-white py-2 px-4 rounded-md"
            >
              Submit Answer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentMcqs;
