import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateTeacherRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? (
    currentUser.role === "teacher" ? (
      <Outlet />
    ) : (
      <Navigate to="/teacher/home" />
    )
  ) : (
    <Navigate to="/teacher/login" />
  );
}

export default PrivateTeacherRoute;
