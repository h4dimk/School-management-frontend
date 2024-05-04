import React, { useEffect, useState } from "react";
import StudentSideBar from "../../components/student/StudentSideBar";
import { useSelector } from "react-redux";
import axios from "../../services/axiosService";

function StudentAnsweredMcqs() {
  const { currentUser } = useSelector((state) => state.user);
  const [mcqs, setMcqs] = useState([]);
  useEffect(() => {
    fetchMCQs();
  }, []);

  const fetchMCQs = async () => {
    try {
      const response = await axios.get(
        `/student/get-answered-mcqs/${currentUser._id}`
      );
      setMcqs(response.data.answeredMcqs);
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    }
  };

  console.log(mcqs)
  return (
    <div className="flex">
    <StudentSideBar />
    <div className="container mx-auto px-4 py-8 ml-56">
      <h2 className="text-3xl font-semibold mb-4 text-white">Answered Questions</h2>
      <div className="mt-8">
        {mcqs.map((mcq, index) => (
          <div key={index} className="bg-gray-800 p-4 mb-4 rounded-md">
            <h4 className="text-xl font-semibold mb-2 text-white">{`Question ${index + 1}: ${mcq.mcqId.question}`}</h4>
            <div className="grid grid-cols-2 gap-4 mb-2 text-lg">
              {mcq.mcqId.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  <span className="font-semibold text-white">{String.fromCharCode(65 + optionIndex)}.</span>
                  <p className="ml-2 text-white">{option}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-green-500 font-semibold">
                  Correct Answer: {mcq.mcqId.correctAnswer}
                </p>
              </div>
              <div>
                <p className={`font-semibold ${mcq.isCorrect ? "text-green-500" : "text-red-500"}`}>
                  Your answer was {mcq.isCorrect ? "right" : "wrong"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default StudentAnsweredMcqs;
