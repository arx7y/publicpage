import React from "react";
import { Navigate, useLocation, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/userSlice";

const PublicOnlyRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  return isAuthenticated ? (
    <Navigate to="/home" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
};

export default PublicOnlyRoute;