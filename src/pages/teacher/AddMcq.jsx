import React, { useEffect, useState } from "react";
import axios from "../../services/axiosService";
import TeacherSideBar from "../../components/teacher/TeacherSideBar";
import { useSelector } from "react-redux";

function AddMCQ() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  // const [selectedBatch, setSelectedBatch] = useState("");
  // const [batchesList, setBatchesList] = useState([]);
  const [error, setError] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [mcqs, setMcqs] = useState([]);

  useEffect(() => {
    fetchMCQs();
  }, []);

  const fetchMCQs = async () => {
    try {
      const response = await axios.get(
        `/teacher/get-mcqs-teacher/${currentUser._id}`
      );
      setMcqs(response.data.mcqs);
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!question.trim() || options.some((option) => !option.trim())) {
        setError("Question text and options cannot be empty.");
        return;
      }

      const mcqData = {
        question,
        options,
        correctAnswer,
        teacherId: currentUser._id,
        batchId: currentUser.batchId,
      };

      const response = await axios.post("/teacher/add-mcq", mcqData);
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      fetchMCQs();
    } catch (error) {
      console.error("Error adding MCQ question:", error);
      setError(response.data.message);
    }
  };

  return (
    <div className="flex">
      <TeacherSideBar />

      <div className="container mx-auto px-4 py-8 ml-56">
        <h2 className="text-3xl font-semibold mb-4 text-white">
          Multiple Choice Questions
        </h2>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-xl">
            <h3 className="text-2xl font-semibold mb-3 text-white text-center">
              Add MCQ Question
            </h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-white">Question:</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {options.map((option, index) => (
                  <div key={index}>
                    <label className="block mb-1 text-white">{`Option ${
                      index + 1
                    }:`}</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
                      value={option}
                      onChange={(e) => handleChange(e, index)}
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-white">Correct Answer:</label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  required
                >
                  <option value="">Select Correct Answer</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className="mb-4">
                <label className="block mb-1 text-white">Assign to Batch:</label>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  required
                >
                </select>
              </div> */}
              <button
                type="submit"
                className="w-full bg-zinc-600 text-white py-2 rounded-md hover:bg-zinc-700 focus:outline-none focus:bg-zinc-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-3 text-white">Added MCQs</h3>
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

export default AddMCQ;
