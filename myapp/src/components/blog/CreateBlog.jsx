import React, { useEffect, useState } from "react";
import "./blog.css";
import Nav from "../nav/Nav";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { createBlogData } from "../../redux/actions/BlogAction";
import { allUsers } from "../../redux/actions/UserAction";

const CreateBlog = () => {
  const { token, user } = JSON.parse(localStorage.getItem("token"));
  console.log("login User::::", user.user_id);
  console.log("Token Data:::::", token);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allUsers());
  }, []);

  // const userData = JSON.parse(localStorage.getItem("loginUser"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [name, setAuthor] = useState(userData.name);
  const [ispending, setPending] = useState(false);
  // if (!userData) {
  //   navigate("/login");
  // }
  // console.log(setAuthor, setPending);

  const handleSubmit = (e) => {
    const data = { title, description, user_id: user.user_id };
    dispatch(createBlogData(data, token));

    e.preventDefault();

    toast("🦄Blog Created!", {
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
  };
  return (
    <>
      <Nav />
      <section className="create-blog">
        <div className="create-blog-wrapper section-spacing">
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="Enter title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <label htmlFor="author">Author:</label>
            <input type="text" value="" name="author" />
            {/* <select value={author} onChange={(e) => setAuthor(e.target.value)}>
              <option value="sufyan">Sufyan</option>
              <option value="ramzan">Ramzan</option>
            </select> */}
            {/* {!ispending && <input type="submit" value="Add Blog" />} */}
            {ispending ? (
              <input type="submit" value="Adding Blog..." />
            ) : (
              <input type="submit" value="Add Blog" />
            )}
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

export default CreateBlog;
