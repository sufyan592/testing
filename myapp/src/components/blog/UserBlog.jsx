import React, { useEffect } from "react";
import BlogList from "./BlogList";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogData } from "../../redux/actions/BlogAction";
import Nav from "../nav/Nav";

const UserBlog = () => {
  const { token, user } = JSON.parse(localStorage.getItem("token"));
  console.log("Token:::::", token);
  console.log("Token:::::", user.name);

  // const userData = JSON.parse(localStorage.getItem("userLoginData"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBlogData(token));
  }, [dispatch, token]);
  const data = useSelector((state) => state?.blogReducer);
  console.log("USER data:::", data?.blogs?.blogs);

  return (
    <>
      <Nav />

      <section className="myBlog">
        <div className="myBlog-wrapper section-spacing">
          <h1>Welcome {user?.name}</h1>
          {data.blogs.blogs?.isLoading && (
            <p className="section-spacing">Loading...</p>
          )}
          {data.blogs.blogs?.error && (
            <p className="section-spacing">Error...</p>
          )}
          {data.blogs.blogs &&
            data.blogs.blogs?.map((blogData, i) => {
              return (
                <>
                  <BlogList data={blogData} user={user?.name} key={i} />
                  {console.log("Blogging:", blogData)}
                </>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default UserBlog;
