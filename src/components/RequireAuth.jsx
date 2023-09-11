import React from "react";

import { Outlet, Navigate, useLocation } from "react-router";

import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectRoles } from "../store/userSlice";

const RequireAuth = ({ allowedRoles }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRoles = useSelector(selectRoles);
  const location = useLocation();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} to="/login" replace />
  );
//   return userRoles.find((role) => allowedRoles?.includes(role)) ? (
//     <Outlet />
//   ) : isAuthenticated ? (
//     <Navigate state={{ from: location }} to="/unauthorized" replace />
//   ) : (
//     <Navigate state={{ from: location }} to="/login" replace />
//   );
};

export default RequireAuth;