import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateStudentRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? (
    currentUser.role === "student" ? (
      <Outlet />
    ) : (
      <Navigate to="/student/home" />
    )
  ) : (
    <Navigate to="/student/login" />
  );
}

export default PrivateStudentRoute;
