import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const EditUerRoute = () => {
  const location = useLocation();
  const user = JSON.parse(window.localStorage.getItem("userLoginPer"));
  console.log("lOGIN DATA:", user);
  //   const editUser = user.filter((perUser) => perUser.edit === "Edit");

  return user?.data && user?.data?.some((data) => data.name === "update") ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};
