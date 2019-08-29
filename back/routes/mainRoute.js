var express = require("express");
var mainController = require("../controllers/mainController");

exports.router = (() => {
  var mainRouter = express.Router();

  mainRouter.route('/list/:user_id').get(mainController.getList);

  return mainRouter;
})();
