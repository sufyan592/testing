const express = require("express");
const app = express();
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

// Load models
const permissionSeeder = require("./model/permissionSeeder");

// Connect to DB
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log("Database connection Error:", err);
  });

// Read JSON files
const permissions = JSON.parse(
  fs.readFileSync(`${__dirname}/seed.json`, "utf-8")
);

// Import into DB
const importData = async () => {
  try {
    await permissionSeeder.create(permissions);
    console.log("Data Imported...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await permissionSeeder.deleteMany();
    console.log("Data Destroyed...");
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const mode = process.argv[2] || process.env.MODE; // Use command-line argument if provided

if (mode === "import") {
  importData();
} else if (mode === "delete") {
  deleteData();
} else {
  console.error("Invalid mode specified. Use 'import' or 'delete'.");
  process.exit(1);
}
