var express = require("express");
var userController = require("../controllers/userController");

exports.router = (() => {
  var userRouter = express.Router();

  userRouter
    .route("/verify/:id/password")
    .post(userController.verifyPasswordWithId);
  userRouter
    .route("/update/:id/password")
    .post(userController.updatePasswordWithId);
  userRouter
    .route("/update/:id/custom/:field")
    .post(userController.updateUserField);
  userRouter.route("/update/:id").post(userController.updateUserData);
  userRouter.route("/delete/:user_id/tag").post(userController.deleteUserTag);
  userRouter.route("/create/:user_id/tag").post(userController.createUserTag);
  userRouter
    .route("/delete/:user_id/picture")
    .post(userController.deleteUserPicture);
  userRouter
    .route("/update/:user_id/picture")
    .post(userController.updateUserPicture);
  userRouter.route("/register/:key").get(userController.checkValidity);
  userRouter.route("/profile/:username").get(userController.getUserProfile);
  userRouter.route("/login").post(userController.login);
  userRouter.route("/forgot-password").post(userController.forgotPassword);
  userRouter
    .route("/reset-password/:key")
    .get(userController.checkPasswordResetKey);
  userRouter
    .route("/reset-password/:key")
    .post(userController.updatePasswordWithKey);
  userRouter.route("/register").post(userController.createUser);
  userRouter.route("/delete-account").delete(userController.deleteUser);

  return userRouter;
})();
