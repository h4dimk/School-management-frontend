import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateAdminRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? (
    currentUser.role === "admin" ? (
      <Outlet />
    ) : (
      <Navigate to="/admin/home" />
    )
  ) : (
    <Navigate to="/admin/login" />
  );
}

export default PrivateAdminRoute;
