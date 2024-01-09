import React, { useState, useEffect } from "react";
import "./blog.css";
import { useNavigate, useParams } from "react-router-dom";
import { singleBlogData, updateBlogData } from "../../redux/actions/BlogAction";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../nav/Nav";

const UpdateBlog = () => {
  const { token, user } = JSON.parse(localStorage.getItem("token"));
  console.log("login User::::", user.user_id);
  console.log("Token Data:::::", token);

  const { updateId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [author, setAuthor] = useState("");
  // const [ispending, setPending] = useState(false);
  const data = useSelector((state) => state.blogReducer.blog);
  console.log("Updated Data:", data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!updateId) {
      return;
    }
    dispatch(singleBlogData(updateId));
  }, [updateId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updateId) {
      window.alert("Id required");
      return;
    }
    dispatch(updateBlogData(updateId, { title, paragraph, author }, token));
    navigate("/blog");
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setParagraph(data.paragraph);
      setAuthor(data.author);
    }
  }, [data]);

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
              name="paragraph"
              placeholder="Enter Description"
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
            ></textarea>
            <label htmlFor="author">Author:</label>
            <select value={author} onChange={(e) => setAuthor(e.target.value)}>
              <option value="sufyan">Sufyan</option>
              <option value="ramzan">Ramzan</option>
            </select>
            <input type="submit" value="Update..." />
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateBlog;
