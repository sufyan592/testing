const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const blogRoute = require("./routes/blogRoutes");
const userRoute = require("./routes/userRoute");
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/user", userRoute);

module.exports = app;
