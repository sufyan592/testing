const connection = require("../db/db");

const createTableQuery =
  "create table User(user_id int auto_increment primary key, name varchar not null, email varchar unique not null, password varchar not null,confirmPassword varchar not null, role varchar(100) default user, created_at timestamp default now())";

const user = connection.query(createTableQuery, (err, result) => {
  if (err) {
    console.error("Error creating table:", err);
  } else {
    console.log("Table created or already exists:", result);
  }
});

module.exports = user;

// const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "User name is required"],
//       maxlength: 20,
//       minlength: 5,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "User email is required"],
//       unique: true,
//       lowercase: true,
//       trim: true,
//       validate: [validator.isEmail, "Please enter a valid email"],
//     },
//     password: {
//       type: String,
//       required: [true, "User password is required"],
//     },
//     confirmPassword: {
//       type: String,
//       validate: {
//         validator: function (val) {
//           return val === this.password;
//         },
//         message: "User password not matched.",
//       },
//     },
//     role: {
//       type: String,
//       enum: ["admin", "editor", "creator", "user"],
//       default: "user",
//     },
//     active: {
//       type: Boolean,
//       default: true,
//       select: false,
//     },
//     permissions: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "UserPermission",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// userSchema.pre("save", async function (next) {
//   // if(this.isModified(this.password) return next())
//   this.password = await bcrypt.hash(this.password, 12);
//   this.confirmPassword = undefined;
//   next();
// });

// userSchema.methods.compairPassword = async (userPassword) => {
//   return await bcrypt.compare(userPassword, this.password);
// };

// const User = mongoose.model("User", userSchema);
// module.exports = User;

// const User =
//   "create table User(user_id int auto_increment primary key, name varchar(100) not null, email varchar(100) unique not null, password varchar(100)) not null,confirmPassword varchar(100) not null, created_at timestamp default now()";

// module.exports = User;
