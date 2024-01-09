const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route("/").get(userController.allUsers);
router.get("/allpermissions", userController.getAllUserPermissions);
router.put("/updatePermission", userController.changePermissionNew);
router.route("/:user_id").get(userController.singleUser);

module.exports = router;
