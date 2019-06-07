var UserService = require('../services/userService');
var userModel   = require('../models/userModel');
var sendmail    = require('../services/mail');
var input       = require('../services/inputService');

module.exports = {
    getUser: async (req, res, next) => {
        console.log(req.body);
        try {
            var user = await UserService.getUser();
            return res.status(200).json({ status: 200, data: user, message: "Succesfully User Retrieved" });
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
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

        
       // console.log(err.error);
        err = await input.username(username)
        if (err.error)
            return res.status(400).json({ error: "username "+ err.error });
        err = await input.mail(mail);
        if (err.error)
            return res.status(400).json({ error: "mail " + err.error });
        /* var plop = await input.mail(mail);
        console.log(plop);
        if (pwd1 != pwd2)
            return res.status(400).json({ error: "passwords have to be identicals" });
        if (!input.password(pwd1))
            return res.status(400).json({ error: "invalid password" });
        if (!input.password(pwd2))
            return res.status(400).json({ error: "invalid password" });
        if (input.lastname(lastname) == 0)
            return res.status(400).json({ error: "invalid lastname" });
        if (!input.firstname(firstname))
            return res.status(400).json({ error: "invalid firstname" });
        if (input.username(username) == 0)
            return res.status(400).json({ error: "invalid username" });
        if (input.mail(mail) == 0)
            return res.status(400).json({ error: "invalid mail" }); */
        /* input.username(username).then((value) => {
            if (value == 0)
                return res.status(400).json({ error: "invalid username" });
        });
        input.mail(mail).then((value) => {
            if (value == 0)
                return res.status(400).json({ error: "invalid mail" });
        }); */
    

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

