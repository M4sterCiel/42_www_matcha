var userModel       = require('../models/userModel');
var passwordHash    = require('password-hash');


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
                if (passwordHash.verify(pwd, hashed))
                    return ({ message: "Succesfully User Retrieved", userData: result });
                else
                    return ({ error: "Incorrect login/password" });
            }
            else
                return ({ error: "Incorrect login/password" });
        }
    }
}

/* exports.getUser = () => {

    try {
        //var user = await User.find(query)
        var user = 'ralleman';
        return user;
    } catch (e) {
        throw Error('Error while Paginating Users');
    }
}
 */