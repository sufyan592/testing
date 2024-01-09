// const User = require("../model/userSchema");
// const user = require("../model/userSchema");
const connection = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// require("../model/permissionSchema");
// require("../model/userPermissionSchema");
// const mongoose = require("mongoose");
// const { response } = require("../app");
// const Permission = require("../model/permissionSchema");
// const UserPermission = require("../model/userPermissionSchema");

// ============================================ MySQL ==========================================================

// =============================== Signup User =============================

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    const saltRounds = 10;

    const hashpassword = await bcrypt.hash(password, saltRounds);
    const hashconfirmPassword = await bcrypt.hash(confirmPassword, saltRounds);

    console.log(hashpassword, hashconfirmPassword);

    const insertData =
      "INSERT INTO user (name, email, password, confirmPassword, role) VALUES (?, ?, ?, ?,?)";

    const [user] = await connection.query(insertData, [
      name,
      email,
      hashpassword,
      hashconfirmPassword,
      role,
    ]);

    res.status(201).json({
      status: "Success",
      message: "User created successfully!",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
  }

  next();
};

// =============================== login User =============================

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findData = `select * from user where email='${email}'`;
    const [foundUser] = await connection.query(findData);
    if (!foundUser) console.log("user not found");

    const matched = await bcrypt.compare(password, foundUser[0].password);
    if (!matched) console.log("Password not mached!");
    const token = jwt.sign({ user: foundUser[0] }, process.env.SECRETE_KEY, {
      expiresIn: process.env.Expires_TIME,
    });

    res.status(200).json({
      status: "Success",
      message: "User found successfully!",
      user: foundUser[0],
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

// =============================== all User =============================

exports.allUsers = async (req, res) => {
  try {
    const getUser = "select * from user";
    const data = await connection.query(getUser);
    console.log(data);
    res.status(200).json({
      status: "Success",
      message: "User created successfully!",
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
  }
};

// =============================== Single User =============================

exports.singleUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    console.log("User Id::::", user_id);
    console.log("Body::::", req.body);

    const getUser = `select user.user_id,user.name,user.email, user.role, permissions.name from user inner join user_permissions on user.user_id=user_permissions.user_id inner join permissions on permissions.per_id=user_permissions.per_id where user.user_id=${user_id}`;
    const data = await connection.query(getUser);
    console.log(data);
    res.status(200).json({
      status: "Success",
      message: "User created successfully!",
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error: "Internal Server Error",
    });
  }
};

// =============================== User Authorization =============================

exports.auth = async (req, res, next) => {
  try {
    console.log("Token:::", req.header.Authorization);
    console.log("Header:::", req.header);

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    const decode = await jwt.verify(token, process.env.SECRETE_KEY);

    console.log(decode.user_id);

    console.log("decoded id:", decode.user.user_id);
    req.user = decode.user;

    // connection.query('select * from user where')

    next();
  } catch (error) {
    console.log("Errror::::", error);
    res.status(500).json({
      status: "Fail",
      message: "You are not allowed to access this",
      error,
    });
  }
};

// ============================= Permissions ====================================

exports.getAllUserPermissions = async (req, res) => {
  try {
    // Fetch all userPermissions from the database

    // const userPermissions = await UserPermission.find();
    const findData = `select * from permissions`;
    // console.log("Permissions:::", findData);
    const [userPermissions] = await connection.query(findData);
    console.log("Permissions:::", userPermissions);

    console.log("user permissions::", userPermissions);

    res.status(200).json({ userPermissions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ============================= Permissions Update ====================================

exports.changePermissionNew = async (req, res) => {
  try {
    const { userId, permissionId } = req.body;

    // Check if the permission already exists
    const userPermissionQuery = `
      SELECT * FROM user_permissions 
      WHERE user_id = ? AND per_id = ?`;

    const [existingUserPermission] = await connection.query(
      userPermissionQuery,
      [userId, permissionId]
    );

    if (existingUserPermission.length > 0) {
      // If the permission exists, remove it
      const removePermissionQuery = `
        DELETE FROM user_permissions 
        WHERE user_id = ? AND per_id = ?`;

      await connection.query(removePermissionQuery, [userId, permissionId]);
      res
        .status(200)
        .json({ success: true, message: "Permissions removed successfully" });
    } else {
      // If the permission does not exist, add it
      const addPermissionQuery = `
        INSERT INTO user_permissions (per_id, user_id) 
        VALUES (?, ?)`;

      await connection.query(addPermissionQuery, [permissionId, userId]);
      res
        .status(200)
        .json({ success: true, message: "Permissions added successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// =============================== Signup User =============================

// exports.signup = async (req, res, next) => {
//   try {
//     // const{name,email,password,confirmPassword}=req.body;
//     const user = await User.create(req.body);
//     const token = jwt.sign({ id: user._id }, process.env.SECRETE_KEY, {
//       expiresIn: process.env.Expires_TIME,
//     });

//     res.status(201).json({
//       status: "Success",
//       message: "User created successfully!",
//       data: user,
//       token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
//   next();
// };

// =============================== Login User =============================

// exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const findUser = await User.findOne({ email: email });
//     // if (!findUser) {
//     //   return next();
//     // }
//     const correct = await bcrypt.compare(password, findUser.password);
//     if (!findUser || !correct) {
//       throw new Error("Invalid Credientials");
//     }

//     const token = jwt.sign({ id: findUser._id }, process.env.SECRETE_KEY, {
//       expiresIn: process.env.Expires_TIME,
//     });
//     res.cookie("jwt", token, {
//       expiresIn: process.env.Expires_TIME,
//       httpOnly: true,
//     });
//     // res.cookie("userName", findUser.name, { httpOnly: true });
//     // res.cookie("userId", findUser._id, { httpOnly: true });

//     res.status(200).json({
//       status: "Success",
//       message: "User Found successfully!",
//       data: findUser,
//       token,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
//   next();
// };

// =============================== All Users =============================

// exports.allUsers = async (req, res, next) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({
//       status: "Success",
//       message: "User finded successfully!",
//       usersCount: users.length,
//       users,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
//   next();
// };

// =============================== Update Users =============================

// exports.updateUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: "Success",
//       message: "User Updaed successfully!",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
//   next();
// };

// =============================== User Authorization =============================

// exports.auth = async (req, res, next) => {
//   try {
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     } else if (req.cookies.jwt) {
//       token = req.cookies.jwt;
//     }
//     await jwt.verify(token, process.env.SECRETE_KEY);

//     next();
//   } catch (error) {
//     console.log("Errror::::", error);
//     res.status(500).json({
//       status: "Fail",
//       message: "You are not allowed to access this",
//       error,
//     });
//   }
// };

// exports.auth = async (req, res, next) => {
//   try {
//     let token;
//     if (req.cookies.jwt) {
//       token = req.cookies.jwt;
//     }
//     await jwt.verify(token, process.env.SECRETE_KEY);

//     next();
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       message: "You are not allowed to access this",
//       error,
//     });
//   }
// };

// ============================= User Permissions =============================

// exports.assignPermissions = async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const { write, edit, delete: remove } = req.body;

//     // Helper function to create or find a permission
//     const getPermission = async (name) => {
//       let permission = await Permission.findOne({ name });

//       if (!permission) {
//         permission = await Permission.create({ name });
//       }

//       return permission;
//     };

//     // Helper function to create or find user permission
//     const getUserPermission = async (userId, permissionId) => {
//       return await UserPermission.findOne({
//         user: userId,
//         permission: permissionId,
//       });
//     };

//     // Create or find permissions for each action
//     const writePermission = await getPermission("write");
//     const editPermission = await getPermission("edit");
//     const deletePermission = await getPermission("delete");

//     // Check if the user already has these permissions
//     const existingWritePermission = await getUserPermission(
//       userId,
//       writePermission._id
//     );
//     const existingEditPermission = await getUserPermission(
//       userId,
//       editPermission._id
//     );
//     const existingDeletePermission = await getUserPermission(
//       userId,
//       deletePermission._id
//     );

//     // Create new permissions only if they don't exist
//     if (!existingWritePermission) {
//       await UserPermission.create({
//         user: userId,
//         permission: writePermission._id,
//       });
//     }

//     if (!existingEditPermission) {
//       await UserPermission.create({
//         user: userId,
//         permission: editPermission._id,
//       });
//     }

//     if (!existingDeletePermission) {
//       await UserPermission.create({
//         user: userId,
//         permission: deletePermission._id,
//       });
//     }

//     res.json({ success: true, message: "Permissions assigned successfully" });
//   } catch (error) {
//     console.error("Error assigning permissions:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// exports.assignOrRemovePermission = async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const { write, edit, delete: remove } = req.body;

//     // Helper function to create or find a permission
//     const getPermission = async (name) => {
//       let permission = await Permission.findOne({ name });

//       if (!permission) {
//         permission = await Permission.create({ name });
//       }

//       return permission;
//     };

//     // Helper function to create or find user permission
//     const getUserPermission = async (userId, permissionId) => {
//       return await UserPermission.findOne({
//         user: userId,
//         permission: permissionId,
//       });
//     };

//     // Helper function to remove user permission
//     const removeUserPermission = async (userId, permissionId) => {
//       await UserPermission.findOneAndRemove({
//         user: userId,
//         permission: permissionId,
//       });
//     };

//     // Create or find permissions for each action
//     const writePermission = await getPermission("write");
//     const editPermission = await getPermission("edit");
//     const deletePermission = await getPermission("delete");

//     // Check if the user already has these permissions
//     const existingWritePermission = await getUserPermission(
//       userId,
//       writePermission._id
//     );
//     const existingEditPermission = await getUserPermission(
//       userId,
//       editPermission._id
//     );
//     const existingDeletePermission = await getUserPermission(
//       userId,
//       deletePermission._id
//     );

//     // Remove permission if it exists; otherwise, assign the permission
//     if (existingWritePermission) {
//       await removeUserPermission(userId, existingWritePermission.permission);
//     } else {
//       await UserPermission.create({
//         user: userId,
//         permission: writePermission._id,
//       });
//     }

//     if (existingEditPermission) {
//       await removeUserPermission(userId, existingEditPermission.permission);
//     } else {
//       await UserPermission.create({
//         user: userId,
//         permission: editPermission._id,
//       });
//     }

//     if (existingDeletePermission) {
//       await removeUserPermission(userId, existingDeletePermission.permission);
//     } else {
//       await UserPermission.create({
//         user: userId,
//         permission: deletePermission._id,
//       });
//     }

//     res.json({ success: true, message: "Permissions updated successfully" });
//   } catch (error) {
//     console.error("Error updating permissions:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Assign permission to a user
// exports.assignPermission = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { write, edit, delete: remove } = req.body;

//     // Find the user by ID
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         status: "Fail",
//         message: "User not found",
//       });
//     }

//     // Helper function to create or find a permission
//     const getPermission = async (name) => {
//       let permission = await Permission.findOne({ name });

//       if (!permission) {
//         permission = await Permission.create({ name });
//       }
//       // if (permission) {
//       //   permission = await Permission.delete({ name });
//       // }

//       return permission;
//     };

//     // Create or find permissions for each action
//     const writePermission = await getPermission("write");
//     const editPermission = await getPermission("edit");
//     const deletePermission = await getPermission("delete");

//     // Assign permissions to the user
//     if (write) {
//       await UserPermission.create({
//         user: userId,
//         permission: writePermission._id,
//       });
//     }

//     if (edit) {
//       await UserPermission.create({
//         user: userId,
//         permission: editPermission._id,
//       });
//     }

//     if (remove) {
//       await UserPermission.create({
//         user: userId,
//         permission: deletePermission._id,
//       });
//     }

//     res.json({ success: true, message: "Permissions assigned successfully" });
//   } catch (error) {
//     console.error("Error assigning permissions:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// =========================== Remove Permissions ==============================

// exports.removePermission = async (req, res, next) => {
//   try {
//     const { id, permission } = req.params;

//     // Find the user by ID
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({
//         status: "Fail",
//         message: "User not found",
//       });
//     }

//     // Check if the specified permission exists for the user
//     const existingPermission = user.permissions.find((userPermission) =>
//       userPermission._id.equals(permission)
//     );

//     if (!existingPermission) {
//       return res.status(404).json({
//         status: "Fail",
//         message: "Permission not found for the user",
//       });
//     }

//     // Remove the specified permission
//     user.permissions = user.permissions.filter(
//       (userPermission) => !userPermission._id.equals(permission)
//     );

//     // Save the updated user
//     await user.save();

//     res.status(200).json({
//       status: "Success",
//       message: "Permission removed successfully!",
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
// };

// =========================== Find Permissions ==============================
// exports.findPermissions = async (req, res, next) => {
//   try {
//     const { userId } = req.params;

//     // Find the user by ID
//     const user = await User.findById(userId);

//     console.log("User found:", user);

//     if (!user) {
//       return res.status(404).json({
//         status: "Fail",
//         message: "User not found",
//       });
//     }

//     // Populate the permissions for the user
//     await user.populate("permissions").execPopulate();

//     // Extract only the names of permissions for a cleaner response
//     const userPermissions = user.permissions.map(
//       (permission) => permission.name
//     );

//     res.status(200).json({
//       status: "Success",
//       permissions: userPermissions,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Fail",
//       error,
//     });
//   }
// };

// ============================= Permissions ====================================

// exports.getAllUserPermissions = async (req, res) => {
//   try {
//     // Fetch all userPermissions from the database
//     const userPermissions = await UserPermission.find();

//     res.status(200).json({ userPermissions });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.getAllPermissions = async (req, res) => {
//   try {
//     // Fetch all permissions from the database
//     const permissions = await Permission.find();

//     res.status(200).json({ permissions });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// =========================== Change Permissions ====================

// exports.changePermissionNew = async (req, res) => {
//   try {
//     const { userId, permissionId } = req.body; // Extract userId and permissionId from the request body
//     console.log("User Id::", userId);
//     // const adminId = req.params.id; // Extract adminId from req.params

//     // Check if the user who is sending the request is loggedIn
//     // if (adminId !== req.v_id) {
//     //   return res.status(401).json({ message: "Unauthorized. Can't Access" });
//     // }

//     // // and also check if he is an admin
//     // const admin = await User.findById(adminId);

//     // if (!admin.isAdmin) {
//     //   return res
//     //     .status(403)
//     //     .json({ message: "Cannot change permissions. Not authorized." });
//     // }

//     // Check if userId whose permission we about to change (1) exists (2) is admin. If any of them then return
//     const userToUpdate = await User.findById(userId);

//     if (!userToUpdate) {
//       return res
//         .status(403)
//         .json({ message: "Cannot change permissions for Admin users." });
//     }
//     // Check if the UserPermission already exists
//     const existingUserPermission = await UserPermission.findOne({
//       userId: userId,
//       permissionId: permissionId,
//     });

//     if (existingUserPermission) {
//       // If the UserPermission exists, remove it from the UserPermission Collection
//       await UserPermission.findOneAndDelete({
//         userId: userId,
//         permissionId: permissionId,
//       });

//       res.status(200).json({ message: "Permissions removed successfully" });
//     } else {
//       // If the UserPermission does not exist, add a new entry to the UserPermission Collection
//       const newUserPermission = new UserPermission({
//         userId: userId,
//         permissionId: permissionId,
//       });

//       await newUserPermission.save();

//       res.status(200).json({ message: "Permissions added successfully" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.changePermissionNew = async (req, res) => {
//   try {
//     const { userId, permissionId } = req.body; // Extract userId and permissionId from the request body
//     console.log("User Id::", userId);

//     // Check if userId whose permission we about to change (1) exists (2) is admin. If any of them then return
//     const userToUpdate = await User.findById(userId);

//     if (!userToUpdate) {
//       return res
//         .status(403)
//         .json({ message: "Cannot change permissions for Admin users." });
//     }
//     // Check if the UserPermission already exists
//     const existingUserPermission = await UserPermission.findOne({
//       userId: userId,
//       permissionId: permissionId,
//     });

//     if (existingUserPermission) {
//       // If the UserPermission exists, remove it from the UserPermission Collection
//       await UserPermission.findOneAndDelete({
//         userId: userId,
//         permissionId: permissionId,
//       });

//       res.status(200).json({ message: "Permissions removed successfully" });
//     } else {
//       // If the UserPermission does not exist, add a new entry to the UserPermission Collection
//       const newUserPermission = new UserPermission({
//         userId: userId,
//         permissionId: permissionId,
//       });

//       await newUserPermission.save();

//       res.status(200).json({ message: "Permissions added successfully" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// controllers/userController.js

// exports.changePermissionNew = async (req, res) => {
//   try {
//     const { userId, permissionId } = req.body;

//     // Check if userId whose permission we're about to change exists
//     const userToUpdate = await User.findById(userId);

//     if (!userToUpdate) {
//       return res
//         .status(403)
//         .json({ message: "Cannot change permissions for non-existent user." });
//     }

//     // Check if the UserPermission already exists
//     const existingUserPermission = await UserPermission.findOne({
//       userId: userId,
//       permissionId: permissionId,
//     });

//     if (existingUserPermission) {
//       // If the UserPermission exists, remove it from the UserPermission Collection
//       await UserPermission.findOneAndDelete({
//         userId: userId,
//         permissionId: permissionId,
//       });

//       res.status(200).json({ message: "Permissions removed successfully" });
//     } else {
//       // If the UserPermission does not exist, add a new entry to the UserPermission Collection
//       const newUserPermission = new UserPermission({
//         userId: userId,
//         permissionId: permissionId,
//       });

//       await newUserPermission.save();

//       res.status(200).json({ message: "Permissions added successfully" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// Import necessary libraries

// Your existing route definition

// Your updated controller function
// exports.changePermissionNew = async (req, res) => {
//   try {
//     const { userId, permissionId } = req.body;

//     // Check if userId is a valid ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid userId" });
//     }

//     // Now userId is a string, and Mongoose can handle it
//     const userToUpdate = await User.findById(userId);

//     if (!userToUpdate) {
//       return res
//         .status(403)
//         .json({ message: "Cannot change permissions for Admin users." });
//     }

//     const existingUserPermission = await UserPermission.findOne({
//       userId: userId,
//       permissionId: permissionId,
//     });

//     if (existingUserPermission) {
//       await UserPermission.findOneAndDelete({
//         userId: userId,
//         permissionId: permissionId,
//       });

//       res.status(200).json({ message: "Permissions removed successfully" });
//     } else {
//       const newUserPermission = new UserPermission({
//         userId: userId,
//         permissionId: permissionId,
//       });

//       await newUserPermission.save();

//       res.status(200).json({ message: "Permissions added successfully" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// exports.changePermissionNew = async (req, res) => {
//   try {
//     const { userId, permissionId } = req.body;
//     console.log("User Id", userId);
//     console.log("User Id", permissionId);

//     // if (!mongoose.Types.ObjectId.isValid(userId)) {
//     //   return res.status(400).json({ message: "Invalid userId" });
//     // }

//     const existingUserPermission = await UserPermission.findOne({
//       userId: userId,
//       permissionId: permissionId,
//     });

//     if (existingUserPermission) {
//       console.log("1");
//       await UserPermission.findOneAndDelete({
//         userId: userId,
//         permissionId: permissionId,
//       });

//       console.log("2");

//       res.status(200).json({ message: "Permissions removed successfully" });
//       console.log("3");
//     } else {
//       console.log("4");
//       const newUserPermission = new UserPermission({
//         userId: userId,
//         permissionId: permissionId,
//       });

//       await newUserPermission.save();
//       // console.log("saved5", saved);

//       await res.status(200).json({ message: "Permissions added successfully" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
