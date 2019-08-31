var express = require("express");
var mainController = require("../controllers/mainController");

exports.router = (() => {
  var mainRouter = express.Router();

  mainRouter.route('/list/:user_id').get(mainController.getList);
  mainRouter.route('/suggestions/:uid').get(mainController.getSuggestions);

  return mainRouter;
})();
