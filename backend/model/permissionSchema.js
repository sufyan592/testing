const connection = require("../db/db");

const permissionSchema =
  "create table permissions(per_id int auto_increment primary key, name varchar(100), created_at timestamp default now())";

const permissions = connection.query(permissionSchema);

if (permissions) {
  console.log("permissions table created!");
} else {
  console.log("permissions table Error!");
}

module.exports = permissions;

// const mongoose = require("mongoose");

// const permissionSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     unique: true,
//   },
// });

// const Permission = mongoose.model("Permission", permissionSchema);
// module.exports = Permission;
