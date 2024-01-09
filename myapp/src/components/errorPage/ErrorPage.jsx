import React from "react";
import "../blog/blog.css";

const ErrorPage = () => {
  return (
    <>
      <section className="error-page">
        <div className="error-wrapper section-spacing">
          <h1>404</h1>
          <h2>Page not Exist!</h2>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
