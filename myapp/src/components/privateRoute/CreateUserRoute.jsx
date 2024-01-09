// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { allUsers, loginUserData } from "../../redux/actions/UserAction";

// const { token, user } = JSON.parse(localStorage.getItem("token"));

// export const CreateUserRoute = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   useEffect(() => {
//     dispatch(loginUserData(user.user_id, token));
//   }, []);

//   const loginUser = useSelector((state) => state.userReducer);

//   console.log("All USERS:::", loginUser?.loginUser?.data);

//   return loginUser?.loginUser?.data &&
//     loginUser?.loginUser?.data?.some((data) => data.name === "write") ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/signin" state={{ from: location }} replace />
//   );
// };

import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const CreateUserRoute = () => {
  const location = useLocation();
  const user = JSON.parse(window.localStorage.getItem("userLoginPer"));
  console.log("lOGIN DATA:", user);
  //   const editUser = user.filter((perUser) => perUser.edit === "Edit");

  return user?.data && user?.data?.some((data) => data.name === "write") ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};
