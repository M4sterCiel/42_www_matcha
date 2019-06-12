var express = require('express');
var userController = require('../controllers/userController');

exports.router = (() => {
    var userRouter = express.Router();

    //Register section
    userRouter.route('/register/:key').get(userController.checkValidity);
    userRouter.route('/register/facebook_auth').get(userController.fbCreateUser);
    userRouter.route('/register').post(userController.createUser);

    //Account
    userRouter.route('/account').get(userController.getUserProfile);

    //Login
    userRouter.route('/login').post(userController.login);

    return userRouter;
})();
