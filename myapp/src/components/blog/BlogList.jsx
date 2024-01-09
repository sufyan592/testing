import React from "react";
import "./blog.css";
import { Link } from "react-router-dom";

const BlogList = ({ data, user }) => {
  const { title, description, id } = data;
  console.log("Data sers::", data);
  console.log("Data sers::", user);
  return (
    <>
      <section className="blog-list">
        <div className="blog-list-wrapper">
          <div className="blog-list-content">
            <Link to={`/blog/${id}`}>
              <h2>{title}</h2>
              <p>{description}</p>
              <h5>Author:{user}</h5>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogList;
