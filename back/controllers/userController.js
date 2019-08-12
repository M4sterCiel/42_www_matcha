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
        username: username,
        token: jwtUtils.tokenGenerator([id, username])
      });
    }
  },

  updateUserField: async (req, res, next) => {
    var err = "";
    switch (req.params.field) {
      case "firstname":
        err = await input.firstname(req.body.data);
        break;
      case "lastname":
        err = await input.lastname(req.body.data);
        break;
      case "mail":
        err = await input.mail(req.body.data);
        break;
      default:
        err = "wrong field";
        break;
    }

    if (err.error) {
      return res
        .status(400)
        .json({ error: `${req.params.field} ` + err.error });
    }
    if (err === "wrong field") {
      return res
        .status(400)
        .json({ error: `${req.params.field} is a wrong field` });
    }

    var result = await userModel.updateOne(
      req.params.id,
      req.params.field,
      req.body.data
    );

    if (result.error) return res.status(401).json({ message: result.error });
    else {
      return res.status(200).json({
        message: `${req.params.field} updated`
      });
    }
  },

  updateUserData: async (req, res, next) => {
    var err;
    if (
      req.body.data.lastname &&
      (err = input.lastname(req.body.data.lastname).error)
    )
      return res.status(400).json({ error: "lastname " + err });
    if (
      req.body.data.firstname &&
      (err = input.firstname(req.body.data.firstname).error)
    )
      return res.status(400).json({ error: "firstname " + err });
    if (req.body.data.bio && (err = input.bio(req.body.data.bio).error))
      return res.status(400).json({ error: "bio " + err });
    if (
      req.body.data.birthdate &&
      (err = input.date(req.body.data.birthdate).error)
    )
      return res.status(400).json({ error: "birthdate " + err });

    var result = await userModel.updateData(req.params.id, req.body.data);

    if (result.error) return res.status(401).json({ message: result.error });
    else {
      return res.status(200).json({
        message: `User data updated`
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

  verifyPasswordWithId: async (req, res, next) => {
    var err;
    if ((err = input.password(req.body.password).error))
      return res.status(400).json({ message: "password " + err });
    var result = await UserService.verifyPasswordWithId(
      req.body.password,
      req.params.id
    );

    if (result.status !== "Password is valid")
      return res.status(401).json({ message: "Password isn't valid" });
    else {
      return res.status(200).json({
        message: "Password is valid"
      });
    }
  },

  updatePasswordWithId: async (req, res, next) => {
    var err;
    if ((err = input.password(req.body.password).error))
      return res.status(400).json({ message: "password " + err });
    var result = await UserService.updatePasswordWithId(
      req.body.password,
      req.params.id
    );
    if (result.status !== "Password updated with success")
      return res.status(401).json({ message: "Couldn't update password" });
    else {
      return res.status(200).json({
        message: "Password updated"
      });
    }
  },

  updatePasswordWithKey: async (req, res, next) => {
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
      return res.status(400).json({ error: "passwords don't match" });

    var ret = await UserService.updatePasswordWithKey(pwd1, key);
    if (ret.status === "Password updated with success")
      return res.status(201).send(ret.status);
    else return res.status(400).send(ret.status);
  },

  checkValidity: async (req, res, next) => {
    //console.log(req.params.key);
    var result = await userModel.findOne("key", req.params.key);
    if (result != "") {
      var updated = await userModel.updateRegister(req.params.key);
      if (updated)
        return res.status(200).json({ message: "Successfully activated" });
      else return res.status(400).json({ message: "couldn't update status" });
    } else return res.status(400).json({ message: "couldn't update status" });
  },

  createUser: async (req, res, next) => {
    //Params
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;
    var username = req.body.username;
    var mail = req.body.email;
    var pwd1 = req.body.pwd1;
    var pwd2 = req.body.pwd2;
    var city = req.body.location["address"]["city"];
    var latitude = req.body.location["coords"]["latitude"];
    var longitude = req.body.location["coords"]["longitude"];

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
      pwd1,
      city,
      latitude,
      longitude
    ]);
    if (ret.status === "User created with success")
      return res.status(201).send(ret.status);
    else return res.status(400).send(ret.status);
  },

  getUserProfile: async (req, res, next) => {
    // Get user id from username
    var userId = await UserService.getUserIdFromUsername(req.params.username);
    if (userId.error) return res.status(401).json({ message: userId.error });

    // Get data from db based on user access rights
    var userData = await UserService.getUserData(userId);
    if (userData.error)
      return res.status(401).json({ message: userData.error });

    var userPictures = await UserService.getUserPictures(userId);
    var userTags = await UserService.getUserTags(userId);

    if (userData.error)
      return res.status(401).json({ message: userData.error });

    return res
      .status(200)
      .json({ data: userData, pictures: userPictures, tags: userTags });
  },

  deleteUser: async (req, res, next) => {
    var authorization = req.headers["authorization"];
    var userId = jwtUtils.getUserId(authorization);

    if (userId != -1) {
      var ret = await userModel.deleteUser(userId);
      //console.log(ret);
    }
    return res.status(200).json({ msg: "Bravoooo!" });
  }
};
