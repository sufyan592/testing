import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../nav/Nav";
import { singleBlogData, deleteBlogData } from "../../redux/actions/BlogAction";
import axios from "axios";
import { loginUserData } from "../../redux/actions/UserAction";

const BlogDetailed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("Blog ID:::::::", id);

  const { token, user } = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (id) {
      dispatch(singleBlogData(id, token));
    }
  }, [id, token]);

  useEffect(() => {
    dispatch(loginUserData(user.user_id, token));
  }, []);

  const blogs = useSelector((state) => state.blogReducer);
  console.log("Single blog::", blogs.blog);
  const loginUser = useSelector((state) => state.userReducer);

  console.log("All USERS:::", loginUser?.loginUser?.data);

  const deleteBlog = () => {
    dispatch(deleteBlogData(id, token));
    navigate("/blog");
  };

  return (
    <>
      <Nav />
      <section className="blog-detailed">
        <div className="blog-detailed-wrapper section-spacing">
          {blogs?.isLoading && <p className="section-spacing">Loading...</p>}
          {blogs?.error && <p className="section-spacing">Error...</p>}
          {blogs?.blog?.data?.length > 0 && (
            <div>
              <h2>{blogs?.blog?.data[0]?.title}</h2>
              <p>{blogs?.blog?.data[0]?.description}</p>
              <h5>Id: {blogs?.blog?.data[0]?.id}</h5>
            </div>
          )}
        </div>
      </section>
      <div className="dlt-btn section-spacing">
        {/* <button onClick={deleteBlog}>Delete</button> */}

        {loginUser?.loginUser?.data &&
          loginUser?.loginUser?.data?.some((data) => data.name === "delete") &&
          blogs?.blog?.data?.length > 0 && (
            <button onClick={deleteBlog}>Delete</button>
          )}
        {loginUser?.loginUser?.data &&
          loginUser?.loginUser?.data?.some((data) => data.name === "update") &&
          blogs?.blog?.data?.length > 0 && (
            <Link to={`/update/${blogs.blog.data[0].id}`}>Edit</Link>
          )}
      </div>
    </>
  );
};

export default BlogDetailed;
