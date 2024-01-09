import axios from "axios";
export const addUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: "REQUEST_USERS" });
    try {
      // fetch("http://localhost:8001/api/v1/user/signup", {
      //   method: "POSTs",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });
      console.log("Data Data::", data);

      const response = await axios.post(
        "http://localhost:8001/api/v1/user/signup",
        data
      );
      console.log("Signup User:", response);
      // dispatch({
      //   type: "ADD_USER",
      //   payload: data,
      // });
    } catch (error) {
      console.log(error);
      dispatch({ type: "USERS_FAILURE_ERROR" });
    }
  };
};

// ================================ login ============================

export const userLogin = (data) => {
  return async (dispatch) => {
    dispatch({ type: "REQUEST_USERS" });
    try {
      // fetch("http://localhost:8001/api/v1/user/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      console.log("LOgin::", data);
      const res = await axios.post(
        "http://localhost:8001/api/v1/user/login",
        data
      );

      console.log("login User:", res.data);
      // localStorage.setItem("loginUser", JSON.stringify(res.data.data));
      localStorage.setItem("token", JSON.stringify(res.data));
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "USERS_FAILURE_ERROR" });
    }
  };
};

// ================================ Get All Users from DataBase ============================

export const allUsers = () => {
  return async (dispatch) => {
    dispatch({ type: "REQUEST_USERS" });
    try {
      // const users = JSON.parse(localStorage.getItem("userData")) || [];
      // console.log("Users from localStorage:", users);
      // const response = await fetch("http://localhost:8001/api/v1/user");
      const users = await axios.get("http://localhost:8001/api/v1/user");

      console.log("All Users Data:", users.data.users);

      localStorage.setItem("allLoginUsers", JSON.stringify(users.data.users));

      // const users = await response.json();
      // console.log("ALL users from DB:", data.data);
      dispatch({
        type: "ALL_USERS",
        payload: users,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "USERS_FAILURE_ERROR" });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    // console.log(id);
    dispatch({
      type: "DELETE_USER",
      payload: id,
    });
  };
};

export const loginUserData = (id, token) => {
  return async (dispatch) => {
    dispatch({ type: "BLOG_DATA_REQUEST" });
    try {
      const response = await fetch(`http://localhost:8001/api/v1/user/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("USER LOGINNN:::", data);

      localStorage.setItem("userLoginPer", JSON.stringify(data));

      dispatch({
        type: "GET_All_USERS_LOGIN_DATA",
        payload: data,
      });
    } catch (error) {
      console.error("Error updating blog data:", error.message);
      dispatch({
        type: "FAILED_TO_GET_All_USERS_LOGIN_DATA",
        payload: error.message,
      });
    }
  };
};
