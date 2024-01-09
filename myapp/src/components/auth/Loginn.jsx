import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../nav/Nav";
import { userLogin } from "../../redux/actions/UserAction";
import { userReducer } from "./../../redux/reducers/UserReducer";

const Loginn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((user) => user.userReducer);
  console.log("Found Login data:", user?.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch login action to authenticate the user
      await dispatch(userLogin({ email, password }));
      localStorage.setItem("userLoginData", JSON.stringify(user.user));

      // If login is successful, navigate to the blog page
      toast("🦄 Login Successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/blog");
      }, 2000);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("🦄 Login failed. Please check your credentials.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <Nav />
      <section className="user-signin">
        <div className="user-signin-wrapper section-spacing">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Login</button>
          </form>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </section>
    </>
  );
};

export default Loginn;
