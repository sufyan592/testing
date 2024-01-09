const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");
const userController = require("../controller/userController");

router
  .route("/")
  .post(userController.auth, blogController.createBlog)
  .get(userController.auth, blogController.allblogs);
// router.route("/findBlog").get(blogController.loginUserBlog);
router
  .route("/:id")
  .get(userController.auth, blogController.singleBlog)
  .patch(userController.auth, blogController.updateblog)
  .delete(userController.auth, blogController.deletblog);
// router.route("/userLoginBlog").post(blogController.userLoginCreateBlog);

module.exports = router;
