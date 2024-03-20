import React, { useState } from "react";
import axios from "../../services/axiosService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../redux/user/userSlice";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(signInStart());
      const response = await axios.post("/admin/login", { email, password });
      const data = response.data.result;

      localStorage.setItem("token", data.token);

      if (data.success === false) {
        dispatch(signInFailure(data));
      } else {
        console.log("Login successful", data);
        dispatch(signInSuccess(data.admin));
        navigate("/admin/home");
      }
    } catch (error) {
      dispatch(signInFailure("Invalid email or password"));
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-zinc-900">
      <div className="bg-zinc-600 p-24 rounded-lg shadow-md mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-white text-center">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-white font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-8 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-8 py-2 border rounded-md focus:outline-none focus:border-zinc-700"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
