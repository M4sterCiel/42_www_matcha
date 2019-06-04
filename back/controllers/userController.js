var UserService = require('../services/userService');

exports.getUser = async (req, res, next) => {
    console.log(req.body);
    try {
        var user = await UserService.getUser()
        return res.status(200).json({ status: 200, data: user, message: "Succesfully User Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.createUser = async (req, res, next) => {
    console.log(req.body);
    return res.json({ status: "success"});
}