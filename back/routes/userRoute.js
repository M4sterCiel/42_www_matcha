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
  userRouter
    .route("/update/:user_id/profile_picture")
    .post(userController.updateUserProfilePicture);
  userRouter.route("/register/:key").get(userController.checkValidity);
  userRouter.route("/profile/:username").get(userController.getUserProfile);
  userRouter
    .route("/profile/id/:user_id")
    .get(userController.getUserProfileFromUserId);
  userRouter
    .route("/profile/:user_id/liked_by/:username")
    .get(userController.checkUserLikedByAndReverse);
  userRouter
    .route("/delete/:user_id/liked_by/:by_id")
    .post(userController.deleteUserLike);
  userRouter
    .route("/create/:user_id/liked_by/:by_id")
    .post(userController.createUserLike);
  userRouter.route("/login").post(userController.login);
  userRouter.route("/forgot-password").post(userController.forgotPassword);
  userRouter
    .route("/reset-password/:key")
    .get(userController.checkPasswordResetKey);
  userRouter
    .route("/reset-password/:key")
    .post(userController.updatePasswordWithKey);
  userRouter.route("/register").post(userController.createUser);
  userRouter
    .route("/notification/main/:userID")
    .get(userController.getMainNotification);
  userRouter
    .route("/read-notification/:userID")
    .post(userController.dismissNotif);
  userRouter.route("/delete/:user_id").post(userController.deleteUser);
  userRouter
    .route("/report/:user_id/:target_id")
    .get(userController.reportUser);
  userRouter
    .route("/get-room-id/:user_id/:target_id")
    .get(userController.getUserRoomId);
  userRouter
    .route("/isreported/:user_id/:target_id")
    .get(userController.checkUserIsReported);
  userRouter.route("/block/:user_id/:target_id").get(userController.blockUser);
  userRouter
    .route("/unblock/:user_id/:target_id")
    .get(userController.unblockUser);
  userRouter
    .route("/isblocked/:user_id/:target_id")
    .get(userController.checkUserIsBlocked);
  return userRouter;
})();
