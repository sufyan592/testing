const express = require("express");
const app = express();
// const blogs = require("../model/blogSchema");
// const User = require("../model/userSchema");
const connection = require("../db/db");

// =============================== Create Blog =============================

exports.createBlog = async (req, res, next) => {
  const { user_id: logUser_id } = req.user;
  const { title, description, user_id } = req.body;
  console.log(logUser_id, user_id);
  if (user_id === logUser_id) {
    try {
      const insertBlog = `insert into blogs(title,description,user_id) values('${title}','${description}',${user_id})`;
      const [blog] = await connection.query(insertBlog);

      res.status(201).json({
        status: "Success",
        message: "Blog created successfully!",
        data: blog,
      });
    } catch (error) {
      res.status(500).json({
        status: "Fail",
        error,
      });
    }
    next();
  } else {
    // If user_id doesn't match, send an error response
    res.status(403).json({
      status: "Fail",
      message: "User ID mismatch. You are not allowed to perform this action.",
    });
  }
};

// // =============================== Find All Blogs =============================

exports.allblogs = async (req, res, next) => {
  console.log("Headers::::::::::", req.headers);

  try {
    const { user_id } = req.user;
    console.log("All blogs,", user_id);
    const blogQuery = `select id,title,description from user inner join blogs on user.user_id=blogs.user_id where blogs.user_id=${user_id}`;
    const [blogs] = await connection.query(blogQuery);
    if (!blogs.length) {
      return res.status(404).json({
        status: "Fail",
        message: "Blogs not found or you are not authorized to found Blogs.",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Blogs found successfully!",
      conts: blogs.length,
      blogs: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      error,
    });
  }
  next();
};

// // =============================== Find Single Blog =============================

exports.singleBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    console.log("id:::", id);
    console.log("user id:::", user_id);
    const blogQuery = `select * from blogs where blogs.id=${id} && blogs.user_id=${user_id}`;
    const [blog] = await connection.query(blogQuery);
    console.log("data:", blog);

    if (!blog.length) {
      res.status(404).json({
        status: "Fail",
        message: "Blog not found or you are not authorized to update it.",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Blog found successfully!",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
  next();
};

// // =============================== Update Single Blog =============================

exports.updateblog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    const { title, description } = req.body;
    let updateFields = [];

    if (title) {
      updateFields.push(`title='${title}'`);
    }

    if (description) {
      updateFields.push(`description='${description}'`);
    }

    const updateFieldsString = updateFields.join(", ");

    const updateQuery = `UPDATE blogs SET ${updateFieldsString} WHERE id=${id} AND user_id=${user_id}`;
    const selectQuery = `SELECT * FROM blogs WHERE id=${id} AND user_id=${user_id}`;

    // Execute the update query
    await connection.query(updateQuery);

    // Fetch the updated blog from the database
    const [updatedBlog] = await connection.query(selectQuery);

    if (!updatedBlog.length) {
      // No rows were found, indicating that the blog with the given id and user_id wasn't found.
      return res.status(404).json({
        status: "Fail",
        message: "Blog not found or you are not authorized to update it.",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Blog updated successfully!",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
  next();
};

// =============================== Delete Single Blog =============================

exports.deletblog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    console.log("User id", id);
    const blogQuery = `delete from blogs where blogs.id=${id} && blogs.user_id=${user_id}`;
    const [result] = await connection.query(blogQuery);

    if (result.affectedRows === 0) {
      res.status(404).json({
        status: "Fail",
        message: "Blog not found or you don't have permission to delete.",
      });
    }

    res.status(204).json({
      status: "Success",
      message: "Blog Deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
  next();
};

// ============================================================ MongoDB ===============================================
// // =============================== Create Blog =============================

// exports.createBlog = async (req, res, next) => {
//   try {
//     const blog = await Blog.create(req.body);

//     res.status(201).json({
//       status: "Success",
//       message: "Blog created successfully!",
//       data: blog,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
//   next();
// };

// // =============================== Find All Blogs =============================

// exports.allblogs = async (req, res, next) => {
//   try {
//     const blogs = await Blog.find().populate({
//       path: "user",
//       select: "__v name",
//     });

//     res.status(200).json({
//       status: "Success",
//       message: "Blogs found successfully!",
//       conts: blogs.length,
//       blogs,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
//   next();
// };

// // =============================== Find Single Blog =============================

// exports.singleBlog = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     console.log("User id", id);

//     const blog = await Blog.findById(id).populate({
//       path: "user",
//       select: "__v name",
//     });

//     res.status(200).json({
//       status: "Success",
//       message: "Blog created successfully!",
//       data: blog,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
//   next();
// };

// // =============================== Update Single Blog =============================

// exports.updateblog = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       status: "Success",
//       message: "Blog updated successfully!",
//       data: blog,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
//   next();
// };
// // =============================== Delete Single Blog =============================

// exports.deletblog = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findByIdAndDelete(id);

//     res.status(204).json({
//       status: "Success",
//       message: "Blog Deleted successfully!",
//       data: blog,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
//   next();
// };

// // =============================== Login User Blog Post =============================

// exports.userLoginCreateBlog = async (req, res) => {
//   const { title, description, userId } = req.body;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const newBlog = new Blog({ title, description, user: user._id });
//     await newBlog.save();
//     res.status(201).json(newBlog);
//   } catch (error) {
//     console.error("Error creating a new blog:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// // =============================== Login User Blog =============================

// exports.loginUserBlog = async (req, res) => {
//   const { id } = req.query;

//   try {
//     // Check if the id is a valid ObjectId before querying the database
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: "Invalid ObjectId" });
//     }

//     const blogs = await Blog.find({ 'user._id': mongoose.Types.ObjectId(id) });
//     res.status(200).json(blogs);
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
