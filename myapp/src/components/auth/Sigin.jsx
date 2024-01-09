import React, { useState } from "react";
import "../blog/blog.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../nav/Nav";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/actions/UserAction";

const Sigin = () => {
  const initialData = JSON.parse(localStorage.getItem("userData")) || [];
  const emailRegix =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [data, setData] = useState(initialData);
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = Math.random();

  const handleSubmit = (e) => {
    e.preventDefault();

    setData((prevData) => [
      ...prevData,
      { name, email, password, confirmPassword },
    ]);

    
    dispatch(addUser({ name, email, password, confirmPassword }));

    if (data.some((user) => user.email === email)) {
      toast("🦄Email Already Exist!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // dispatch(addUser({ name, email, password, confirmPassword, userId }));
    // console.log("Data saved:", data);
    // localStorage.setItem(
    //   "userData",
    //   JSON.stringify([...data, { name, email, password, userId }])
    // );

    toast("🦄User Added Successfully!", {
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
      navigate("/login");
    }, 2000);
  };

  const handleName = (e) => {
    if (e.target.value.length < 3) {
      setNameErr(true);
    } else {
      setNameErr(false);
    }
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    if (!e.target.value.match(emailRegix)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    if (e.target.value.length < 5) {
      setPassErr(true);
    } else {
      setPassErr(false);
    }
    setPassword(e.target.value);
  };
  const handleCPass = (e) => {
    if (e.target.value.length < 5) {
      setPassErr(true);
    } else {
      setPassErr(false);
    }
    setconfirmPassword(e.target.value);
  };

  return (
    <>
      <Nav />
      <section className="user-signin">
        <div className="user-signin-wrapper section-spacing">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={name} onChange={handleName} />

            {nameErr ? (
              <p style={{ color: "red" }}>
                Name length must be 3 or more characters.
              </p>
            ) : (
              ""
            )}
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
            {emailErr ? (
              <p style={{ color: "red" }}>Enter a valid email.</p>
            ) : (
              ""
            )}
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePass}
            />
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleCPass}
            />
            {passErr ? (
              <p style={{ color: "red" }}>Please enter a strong password.</p>
            ) : (
              ""
            )}

            <button type="submit">Signin</button>
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

export default Sigin;
