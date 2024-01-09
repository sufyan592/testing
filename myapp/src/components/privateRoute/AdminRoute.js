import { useDispatch } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { allUsers } from "../../redux/actions/UserAction";
import { useEffect } from "react";

const AdminRoute = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allUsers);
  }, [dispatch]);
  const user = JSON.parse(window.localStorage.getItem("userLoginPer"));
  console.log("lOGIN DATA:", user);
  //   const editUser = user.filter((perUser) => perUser.edit === "Edit");

  return user?.data && user?.data?.some((data) => data.role === "admin") ? (
    <Outlet />
  ) : (
    <Navigate to="/blog" state={{ from: location }} replace />
  );
};

export default AdminRoute;
