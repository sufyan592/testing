import axios from "axios";

export const fetchBlogData = (token) => {
  return async (dispatch) => {
    dispatch({ type: "BLOG_DATA_REQUEST" });

    try {
      const response = await axios.get("http://localhost:8001/api/v1/blog", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "BLOG_DATA_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching blog data:", error.message);

      dispatch({
        type: "BLOG_DATA_FAILURE",
        payload: error.message,
      });
    }
  };
};

export const singleBlogData = (id, token) => {
  return async (dispatch) => {
    dispatch({ type: "SINGLE_BLOG_DATA_REQUEST" });

    try {
      const response = await axios.get(
        `http://localhost:8001/api/v1/blog/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User Single Blog::", response.data);

      dispatch({
        type: "SINGLE_BLOG_DATA_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching blog data:", error.message);
      dispatch({
        type: "SINGLE_BLOG_DATA_FAILURE",
        payload: error.message,
      });
    }
  };
};

export const deleteBlogData = (id, token) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:8001/api/v1/blog/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "DELETE_BLOG_DATA",
        payload: id,
      });
    } catch (error) {
      console.error("Error deleting blog data:", error.message);
    }
  };
};

export const createBlogData = (data, token) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:8001/api/v1/blog", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: "CREATE_BLOG_DATA",
        payload: data,
      });
    } catch (error) {
      console.error("Error creating blog data:", error.message);
    }
  };
};

export const updateBlogData = (id, data, token) => {
  return async (dispatch) => {
    dispatch({ type: "BLOG_DATA_REQUEST" });

    try {
      const response = await axios.patch(
        `http://localhost:8001/api/v1/blog/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "UPDATE_BLOG_DATA",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error updating blog data:", error.message);
      dispatch({
        type: "BLOG_DATA_FAILURE",
        payload: error.message,
      });
    }
  };
};
