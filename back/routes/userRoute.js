var express = require('express');
var userController = require('../controllers/userController');

exports.router = (() => {
    var userRouter = express.Router();

    userRouter.route('/register/:key').get(userController.checkValidity);
    userRouter.route('/login').post(userController.getUser);
    userRouter.route('/register').post(userController.createUser);

    return userRouter;
})();
