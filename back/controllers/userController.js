var UserService = require('../services/userService');
var userModel   = require('../models/userModel');

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

    createUser: async (req, res, next) => {
        //console.log(req.body);

        //Params
        var lastname    = req.body.lastname;
        var firstname   = req.body.firstname;
        var username    = req.body.username;
        var mail        = req.body.mail;
        var pwd1        = req.body.pwd1;
        var pwd2        = req.body.pwd2;

        //Pattern control
        if (/\s/.test(firstname) || /\s/.test(lastname) || /\s/.test(mail) || /\s/.test(pwd1) || /\s/.test(pwd2))
            return res.status(400).json({ error: "spaces are forbidden" });
        if (lastname == null || firstname == null || mail == null || pwd1 == null || pwd2 == null)
            return res.status(400).json({ error: "missing parameters" });
        if (lastname.length < 2 || firstname.length < 2 || username.length < 3)
            return res.status(400).json({ error: "parameters are too short" });

        var pwdPattern = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
        if (!pwdPattern.test(pwd1) || !pwdPattern.test(pwd2))
            return res.status(400).json({ error: "wrong password pattern" });
        if (pwd1 != pwd2)
            return res.status(400).json({ error: "passwords have to be identicals" });

        var mailPattern = /^([a-zA-Z0-9]+(?:[\.\-\_]?[a-zA-Z0-9]+)*)@([a-zA-Z0-9]+(?:[\.\-\_]?[a-zA-Z0-9]+)*)\.([a-zA-Z]{2,})+$/;
        if (!mailPattern.test(mail))
            return res.status(400).json({ error: "incorrect mail" });

        //Check if user already exists
        var result = await userModel.findOne("mail", mail);

        
        return res.json({ status: "success"});
    }
}

