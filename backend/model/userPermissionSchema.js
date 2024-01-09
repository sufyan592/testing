const connection = require("../db/db");

const permissionSchema =
  "create table user_permissions(per_id int, user_id int, primary key(per_id,user_id), foreign key(per_id) references permissions(per_id), foreign key(user_id) references user(user_id),created_at timestamp default now() )";

const userpermissions = connection.query(permissionSchema);

if (userpermissions) {
  console.log("User permissions table created!");
} else {
  console.log("User permissions table Error!");
}

module.exports = userpermissions;

// const mongoose = require("mongoose");

// const userPermissionSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
//   permissionId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
// });

// const UserPermission = mongoose.model("UserPermission", userPermissionSchema);
// module.exports = UserPermission;
