var UserService = require("../services/userService");
var userModel = require("../models/userModel");
var input = require("../services/inputService");
var jwtUtils = require("../services/jwtService");

module.exports = {
  login: async (req, res, next) => {
    var user = await UserService.getUser({
      login: req.body.login,
      pwd: req.body.pwd
    });

    if (user.error) return res.status(401).json({ message: user.error });
    else {
      var id = user.userData[0]["id"];
      var username = user.userData[0]["username"];
      return res.status(200).json({
        message: "Succesfully User Retrieved",
        token: jwtUtils.tokenGenerator([id, username])
      });
    }
  },

  forgotPassword: async (req, res, next) => {
    var user = await UserService.doesUserLoginExist({
      login: req.body.login
    });

    if (user.error) return res.status(401).json({ message: user.error });
    else {
      UserService.resetUserPassword(user.userData);
      return res.status(200).json({
        message: "User does exist"
      });
    }
  },

  checkPasswordResetKey: async (req, res, next) => {
    var result = await userModel.findOne("password_key", req.params.key);
    if (result != "") {
      return res
        .status(200)
        .json({ message: "Successfully reached password reset" });
    } else
      return res
        .status(500)
        .json({ message: "password reset key isn't valid" });
  },

  updatePassword: async (req, res, next) => {
    //Params
    var pwd1 = req.body.pwd1;
    var pwd2 = req.body.pwd2;
    var key = req.body.password_key;

    //Check inputs
    var err;
    if ((err = input.password(pwd1).error))
      return res.status(400).json({ error: "password " + err });
    if ((err = input.password(pwd2).error))
      return res.status(400).json({ error: "password " + err });
    if (pwd1 !== pwd2)
      return res.status(400).json({ error: "passwords don't match"});
      
    var ret = await UserService.updatePasswordWithKey(pwd1, key);
    if (ret.status == "Password updated with success")
      return res.status(201).send(ret.status);
    else 
      return res.status(400).send(ret.status);
},

  checkValidity: async (req, res, next) => {
    //console.log(req.params.key);
    var result = await userModel.findOne("key", req.params.key);
    if (result != "") {
      var updated = await userModel.updateRegister(req.params.key);
      if (updated)
        return res.status(200).json({ message: "Successfully activated" });
      else return res.status(500).json({ message: "couldn't update status" });
    } else return res.status(500).json({ message: "couldn't update status" });
  },

  createUser: async (req, res, next) => {
    //Params
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;
    var username = req.body.username;
    var mail = req.body.email;
    var pwd1 = req.body.pwd1;
    var pwd2 = req.body.pwd2;

    //Check inputs
    var err;
    if ((err = input.lastname(lastname).error))
      return res.status(400).json({ error: "lastname " + err });
    if ((err = input.firstname(firstname).error))
      return res.status(400).json({ error: "firstname " + err });
    if ((err = input.password(pwd1).error))
      return res.status(400).json({ error: "password " + err });
    if ((err = input.password(pwd2).error))
      return res.status(400).json({ error: "password " + err });

    err = await input.username(username);
    if (err.error)
      return res.status(400).json({ error: "username " + err.error });
    err = await input.mail(mail);
    if (err.error) return res.status(400).json({ error: "mail " + err.error });

    //Create new user
    var ret = await UserService.createUser([
      lastname,
      firstname,
      username,
      mail,
      pwd1
    ]);
    if (ret.status == "User created with success")
      return res.status(201).send(ret.status);
    else return res.status(400).send(ret.status);
  },

  getUserProfile: async (req, res, next) => {
    //Check if session is expired
    var headerAuth = req.headers["authorization"];
    var userId = jwtUtils.getUserId(headerAuth);

    if (userId == -1) return res.status(401).json({ error: "Invalid token" });

    //Get data from db
    var userData = await UserService.getUserData(userId);

    return res.status(200).json({ data: userData });
  }
};
