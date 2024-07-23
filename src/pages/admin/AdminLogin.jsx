import React, { useState } from "react";
import axios from "../../services/axiosService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../redux/user/userSlice";
import Header from "../../components/common/Home/Header";

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
    <section className=" bg-gray-800 min-h-screen flex items-center justify-center px-6 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700 dark:border dark:border-gray-600">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Admin login
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign in
            </button>

            <div className="text-center mt-4">
              <a
                href="/"
                className="text-gray-300 hover:text-gray-400 underline"
              >
                Go Back Home
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
