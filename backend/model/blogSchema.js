const connection = require("../db/db");

const blogSchema =
  "create table blogs(id int auto_increment primary key not null, title varchar(255) not null, description varchar(255),user_id int, foreign key(user_id) references user(user_id), created_at timestamp default now())";
const blogs = connection.query(blogSchema);

if (blogs) {
  console.log("Blog table created!");
} else {
  console.log("Blog table not created!");
}

module.exports = blogs;

// const mongoose = require("mongoose");
// const blogSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Please enter title of Blog."],
//     },
//     description: {
//       type: String,
//       required: [true, "Please enter details of Blog."],
//     },
//     user: [
//       {
//         type: mongoose.Schema.ObjectId,
//         ref: "User",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// const Blog = mongoose.model("Blog", blogSchema);

// module.exports = Blog;
