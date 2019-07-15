var jwtService      = require('../services/jwtService');
var chatModel       = require('../models/chatModel');
var matchModel      = require('../models/matchModel');
var userModel       = require('../models/userModel');

module.exports = {
    saveMessage: async data => {
        await chatModel.saveMessage(data);
    },

    getMessages: async (req, res, next) => {
        var room_id = req.params.room_id;
       // console.log('room id = ' + room_id);
        var result = await chatModel.getMessages(room_id);
        return res.status(200).json({ result });
    },

    getMatchList: async (req, res, next) => {
        var userID = jwtService.verifyToken(req.params['token'])['id'];
        var result = await matchModel.getMatchList(userID);
        return res.status(200).json({ result });
    },

    getStatus: (req, res, next) => {
        var tab = req.body.tab;
        console.log(tab);
    },

    saveStatus: async userID => {
        await userModel.saveStatus(userID);
    }
}