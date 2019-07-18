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
        var status = [];

        for (var i=0;i<result.length;i++) {
            status[i] = result[i]['user_1'] != userID ? result[i]['user_1'] : result[i]['user_2'];
        }
        status = await userModel.getStatus(status);
        //console.log({ status });
        return res.status(200).json({ result, status });
    },

    getStatus: (req, res, next) => {
        var tab = req.body.tab;
        //console.log(tab);
        return res.status(200).json({ Message: 'ok' });
    },

    onlineStatus: async userID => {
        await userModel.saveStatus(1, userID);
    },
    
    offlineStatus: async userID => {
        await userModel.saveStatus(0, userID);
    }
}