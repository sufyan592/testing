const app = require("./app");
// const express = require("express");
// const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 8002;
const connection = require("./db/db");

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
  connection.connect((err) => {
    if (err) throw err;
    console.log("Database connection established");
  });
});
