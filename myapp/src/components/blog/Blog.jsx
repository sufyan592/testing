import { useDispatch, useSelector } from "react-redux";
import BlogList from "./BlogList";
import { useEffect } from "react";
import { fetchBlogData } from "./../../redux/actions/BlogAction";

const Blog = () => {
  const { token } = JSON.parse(localStorage.getItem("token"));
  console.log("Token:::::", token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogData(token));
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogReducer);
  console.log("Data:::::", blogs);
  // const {
  //   data: blogs,
  //   isloading,
  //   error,
  // } = useFetch("http://localhost:8000/blog");

  // useEffect(() => {
  //   fetch("http://localhost:8000/blog")
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Failed to featch the Data!");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setBlog(data);
  //       setLoading(false);
  //       setError(false);
  //     });
  // }, []);
  // const deleteblog = (id) => {
  //   const fltrBlog = blogs.filter((val) => {
  //     if (val.id !== id) {
  //       return val;
  //     }
  //   });
  //   setBlog(fltrBlog);
  // };

  return (
    <>
      {/* {isloading && <p>Loading...</p>}
      {error && <p>Error...</p>} */}
      <section className="myBlog">
        <div className="myBlog-wrapper section-spacing">
          <h1>Saffi Tech</h1>

          {blogs?.data &&
            blogs?.data.map((blogData, i) => {
              return (
                <>
                  <BlogList data={blogData} />
                </>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Blog;
