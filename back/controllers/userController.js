var UserService     = require('../services/userService');
var userModel       = require('../models/userModel');
var sendmail        = require('../services/mailService');
var input           = require('../services/inputService');
var passwordHash    = require('password-hash');
var jwtCreate       = require('../services/jwtService');

module.exports = {
    login: async (req, res, next) => {

        var user = await UserService.getUser({ login: req.body.login, pwd: req.body.pwd });

        if (user.error)
            return res.status(400).json({ message: user.error });
        else
        {
            var id = user.userData[0]['id'];
            var username = user.userData[0]['username'];
            return res.status(200).json({ message: "Succesfully User Retrieved", token: jwtCreate.tokenGenerator([id, username]) });
        }

        
    },
    
    checkValidity: async (req, res, next) => {
        //console.log(req.params.key);
        var result = await userModel.findOne("key", req.params.key);
        if (result != '')
        {
            var updated = await userModel.updateRegister(req.params.key);
            if (updated)
                return res.status(200).json({ message: "Successfully activated"});
            else return res.status(500).json({ error: "couldn't update status" });
        }
        else return res.status(500).json({ error: "couldn't update status" });
    },

    createUser: async (req, res, next) => {
        //console.log(req.body);

        //Params
        var lastname    = req.body.lastname;
        var firstname   = req.body.firstname;
        var username    = req.body.username;
        var mail        = req.body.mail;
        var pwd1        = req.body.pwd1;
        var pwd2        = req.body.pwd2;

        var err;
        if (err = input.lastname(lastname).error)
            return res.status(400).json({ error: "lastname " + err })
        if (err = input.firstname(firstname).error)
            return res.status(400).json({ error: "firstname " + err });
        if (err = input.password(pwd1).error)
            return res.status(400).json({ error: "password " + err });
        if (err = input.password(pwd2).error)
            return res.status(400).json({ error: "password " + err });

        
        err = await input.username(username)
        if (err.error)
            return res.status(400).json({ error: "username "+ err.error });
        err = await input.mail(mail);
        if (err.error)
            return res.status(400).json({ error: "mail " + err.error });
        
        //Create new user
        var uniqid = (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16);
        var created = await userModel.createOne([lastname, firstname, username, mail, pwd1, uniqid]);
        if (created)
        {
            var link = "http://localhost:3000/users/register/"+ uniqid;
            await sendmail.registerMail(mail, username, link);
            return res.status(200).json({ status: "User created with success"});
        }

        
    }
}

