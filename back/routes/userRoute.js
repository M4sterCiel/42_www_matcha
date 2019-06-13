var express = require("express");
var userController = require("../controllers/userController");

exports.router = (() => {
  var userRouter = express.Router();

  userRouter.route("/register/:key").get(userController.checkValidity);
  userRouter.route("/my_profile").get(userController.getUserProfile);
  userRouter.route("/login").post(userController.login);
  userRouter.route("/forgot-password").post(userController.forgotPassword);
  userRouter
    .route("/reset-password/:key")
    .post(userController.checkPasswordResetKey);
  userRouter.route("/register").post(userController.createUser);

  return userRouter;
})();
