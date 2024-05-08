import React, { useEffect, useState } from "react";
import axios from "../../services/axiosService";
import StudentSideBar from "../../components/student/StudentSideBar";
import { useSelector } from "react-redux";

function StudentMcqs() {
  const [mcqs, setMcqs] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [messages, setMessages] = useState([]);
  const [errors, setErrors] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    fetchMCQs();
  }, []);

  const fetchMCQs = async () => {
    try {
      const response = await axios.get(
        `/student/get-mcqs-batch/${currentUser.batchId}`,
        {
          params: {
            studentId: currentUser._id,
          },
        }
      );
      setMessages(Array(response.data.mcqs.length).fill(""));
      setErrors(Array(response.data.mcqs.length).fill(""));
      setMcqs(response.data.mcqs);
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    }
  };

  const submitAnswer = async (mcqId, index) => {
    try {
      // Check if an option is selected
      if (!selectedOption) {
        const updatedErrors = [...errors];
        updatedErrors[index] = "Please select an option.";
        setErrors(updatedErrors);
        return;
      }

      const mcq = mcqs.find((mcq) => mcq._id === mcqId);
      const isCorrect = mcq.correctAnswer === selectedOption;

      const response = await axios.post("/student/submit-answer", {
        mcqId,
        isCorrect,
        studentId: currentUser._id,
        batchId: currentUser.batchId,
      });

      if (isCorrect) {
        const updatedMessages = [...messages];
        updatedMessages[index] = "Your answer is correct!";
        setMessages(updatedMessages);
      } else {
        const updatedMessages = [...messages];
        updatedMessages[
          index
        ] = `Your answer is incorrect. The correct answer is: ${mcq.correctAnswer}`;
        setMessages(updatedMessages);
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      const updatedErrors = [...errors];
      updatedErrors[index] = error.response.data.message;
      setErrors(updatedErrors);
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
              {mcq.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  <input
                    type="radio"
                    id={`option-${optionIndex}`}
                    name={`mcq-${mcq._id}`}
                    value={option}
                    className="mr-2"
                    onChange={() => setSelectedOption(option)}
                  />
                  <label
                    htmlFor={`option-${optionIndex}`}
                    className="cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
            <button
              onClick={() => submitAnswer(mcq._id, index)}
              className="mt-4 bg-zinc-600 hover:bg-zinc-700 text-white py-2 px-4 rounded-md"
            >
              Submit Answer
            </button>
            {messages[index] && (
              <div
                className={`${
                  messages[index].includes("incorrect")
                    ? "text-red-500"
                    : "text-green-500"
                } mt-4`}
              >
                {messages[index]}
              </div>
            )}
            {errors[index] && (
              <div className="text-red-500 mt-4">{errors[index]}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentMcqs;
