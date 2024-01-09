import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const location = useLocation();
  const user = JSON.parse(window.localStorage.getItem("loginUser"));

  return user ? (
    <Outlet />
  ) : (
    // <Navigate to="/signin" state={{ from: location }} replace />
    <Navigate to="/blog" state={{ from: location }} replace />
  );
};

// export default PrivateRoute;
