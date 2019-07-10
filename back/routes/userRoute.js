var express = require("express");
var userController = require("../controllers/userController");

exports.router = (() => {
  var userRouter = express.Router();

  userRouter.route("/register/:key").get(userController.checkValidity);
  userRouter.route("/profile/:username").get(userController.getUserProfile);
  userRouter.route("/login").post(userController.login);
  userRouter.route("/forgot-password").post(userController.forgotPassword);
  userRouter
    .route("/reset-password/:key")
    .get(userController.checkPasswordResetKey);
  userRouter.route("/reset-password/:key").post(userController.updatePassword);
  userRouter.route("/register").post(userController.createUser);
  userRouter.route('/delete-account').delete(userController.deleteUser);

  return userRouter;
})();
