// const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGODB)
//   .then(() => {
//     console.log("Database connection established");
//   })
//   .catch((err) => {
//     console.log("Database connection Error:", err);
//   });

// ============== My Sql Db ==================

const mysql = require("mysql2");

// 'create database myBlog_db';

const connection = mysql
  .createConnection({
    host: "localhost",
    user: "root",
    database: "myBlog_db",
    password: "root",
  })
  .promise();

module.exports = connection;
