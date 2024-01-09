const mongoose = require("mongoose");

const SeederSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});

const PermissionSeeder = mongoose.model("PermissionSeeder", SeederSchema);
module.exports = PermissionSeeder;
