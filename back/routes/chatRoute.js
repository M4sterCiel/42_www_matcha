var express = require("express");
var chatController = require("../controllers/chatController");

exports.router = (() => {
  var chatRouter = express.Router();

  chatRouter.route('/room/:room_id').get(chatController.getMessages);


  return chatRouter;
})();
