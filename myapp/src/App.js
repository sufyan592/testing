import React from "react";
// import Blog from "./components/blog/Blog";
// import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogDetailed from "./components/blog/BlogDetailed";
import CreateBlog from "./components/blog/CreateBlog";
import Sigin from "./components/auth/Sigin";
import Loginn from "./components/auth/Loginn";
import UpdateBlog from "./components/blog/UpdateBlog";
import UserBlog from "./components/blog/UserBlog";
import ErrorPage from "./components/errorPage/ErrorPage";
import { PrivateRoute } from "./components/privateRoute/PrivateRoute";
import "./App.css";
import User from "./components/users/User";
import { EditUerRoute } from "./components/privateRoute/EditUserRoute";
import { CreateUserRoute } from "./components/privateRoute/CreateUserRoute";
import AdminRoute from "./components/privateRoute/AdminRoute";
// import IncDec from "./IncDecComponents/app/IncDec";
// import Login from "./BlogComponents/Blog/login";
// import "./Pages/Home";
// import About from "./Pages/About";
// import Contact from "./Pages/Contact";

function App() {
  // const userData = JSON.parse(localStorage.getItem("foundData"));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <>
            <Route path="/" element={<Sigin />}></Route>
            <Route path="/signin" element={<Sigin />}></Route>
            {/* <Route path="/users" element={<User />}></Route> */}
            {/* <Route path="/blogData" element={<Blog />}></Route> */}
            <Route path="/login" element={<Loginn />}></Route>
            {/* <Route path="/users" element={<User />}></Route> */}

            {/* <Route path="/blog" element={<UserBlog />}></Route>
            <Route path="/blog/:id" element={<BlogDetailed />}></Route> */}
            {/* <Route path="/create" element={<CreateBlog />}></Route> */}

            <Route element={<PrivateRoute />}>
              {/* <Route path="/create" element={<CreateBlog />}></Route> */}
              {/* <Route path="/update/:updateId" element={<UpdateBlog />}></Route> */}
            </Route>

            <Route element={<EditUerRoute />}>
              <Route path="/update/:updateId" element={<UpdateBlog />}></Route>
              <Route path="/blog" element={<UserBlog />}></Route>
              {/* <Route path="/create" element={<CreateBlog />}></Route> */}
              <Route path="/blog/:id" element={<BlogDetailed />}></Route>
              {/* <Route path="/update/:updateId" element={<UpdateBlog />}></Route> */}
            </Route>

            <Route element={<CreateUserRoute />}>
              {/* <Route path="/blog" element={<UserBlog />}></Route> */}
              <Route path="/create" element={<CreateBlog />}></Route>
              <Route path="/blog/:id" element={<BlogDetailed />}></Route>
              <Route path="/update/:updateId" element={<UpdateBlog />}></Route>
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/users" element={<User />}></Route>
            </Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </>
        </Routes>
      </BrowserRouter>
      {/* <IncDec /> */}
    </>
  );
}

export default App;
