var userModel       = require('../models/userModel');
var pictureModel    = require('../models/pictureModel');
var passwordHash    = require('password-hash');
var sendmail        = require('../services/mailService');


module.exports = {
    getUser: async (data) => {

        var user    = data.login;
        var pwd     = data.pwd;

        if (user.match(/@/))
        {
            var result = await userModel.findOne('mail', user);
            if (result != '')
            {
                var hashed = result[0]['password'];
                if (result[0]['status'] == 0)
                    return ({ error: "Inactive account" });
                if (passwordHash.verify(pwd, hashed))
                    return ({ message: "Succesfully User Retrieved", userData: result });
                else
                    return ({ error: "Incorrect login/password" });
            }
            else
                return ({ error: "Incorrect login/password" });
        }
        else
        {
            var result = await userModel.findOne('username', user);
            if (result != '')
            {
                var hashed = result[0]['password'];
                if (result[0]['status'] == 0)
                    return ({ error: "Inactive account" });
                if (passwordHash.verify(pwd, hashed))
                    return ({ message: "Succesfully User Retrieved", userData: result });
                else
                    return ({ error: "Incorrect login/password" });
            }
            else
                return ({ error: "Incorrect login/password" });
        }
    },

    getUserData: async (id) => {
        try {
            var result = await userModel.findOne('id', id);
            return result[0];
        } catch(err) {
            console.log(err);
            return ({ error: err });
        }
    },

    getAllPictures: async (id) => {
        try {
            var result = await pictureModel.findOne('user_id', id);
            return result[0];
        } catch(err) {
            console.log(err);
            return ({ error: err });
        }
    },

    createUser: async (data) => {
        
        var uniqid = (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16);
        data.push(uniqid);
        var created = await userModel.createOne(data);
        if (created)
        {
            var link = "https://localhost:3000/users/register/"+ uniqid;
            await sendmail.registerMail(data[3], data[2], link);
            return ({ status: "User created with success"});
        }
        return ({ status: "An error has occurred"});
    }
}

