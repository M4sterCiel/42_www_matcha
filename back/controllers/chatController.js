var jwtService      = require('../services/jwtService');
var chatModel       = require('../models/chatModel');

module.exports = {
    respond: (socket_io) => {
       // console.log('Ca passe dans le controller');
      //  console.log(endpoint);
        //console.log(socket_io);
    },

    saveMessage: async data => {
        await chatModel.saveMessage(data);
    },

    getMessages: async (req, res, next) => {
        var room_id = req.params.room_id;
       // console.log('room id = ' + room_id);
        var result = await chatModel.getMessages(room_id);
        return res.status(200).json({ result });
    }
}