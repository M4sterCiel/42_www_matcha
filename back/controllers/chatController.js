var jwtService = require("../services/jwtService");
var chatModel = require("../models/chatModel");
var matchModel = require("../models/matchModel");
var userModel = require("../models/userModel");

module.exports = {
  saveMessage: async data => {
    //console.log(data);
    await chatModel.saveMessage(data);
    await matchModel.updateNbMsg(data[2]);
  },

  getMessages: async (req, res, next) => {
    var room_id = req.params.room_id;
    // console.log('room id = ' + room_id);
    var result = await chatModel.getMessages(room_id);
    //console.log(result);
    return res.status(200).json({ result });
  },

  getMatchList: async (req, res, next) => {
    var userID = jwtService.verifyToken(req.params["token"])["id"];
    var result = await matchModel.getMatchList(userID);
    var status = [];
    for (var i = 0; i < result.length; i++) {
      status[i] =
        result[i]["user_1"] != userID
          ? result[i]["user_1"]
          : result[i]["user_2"];
    }
    if (status.length > 0) status = await userModel.getStatus(status);

    var blocked =  await userModel.getBlockedUsersFromMyId(userID);

    return res.status(200).json({ result, status });
  },

  onlineStatus: async userID => {
    await userModel.saveStatus(1, userID);
  },

  offlineStatus: async userID => {
    await userModel.saveStatus(0, userID);
  },

  readMessage: async (data, userID) => {
    await chatModel.readNotification(2, data, userID);
  },

  saveNotification: async (user_id, sender_id, type, data, reference) => {
    await chatModel.saveNotification([
      user_id,
      sender_id,
      type,
      data,
      reference
    ]);
  },

  getCountMsgNotification: async (req, res, next) => {
    var userID = req.params.userID;
    var result = await chatModel.getCountNotification(userID);
    return res.status(200).json({ notification: result });
  },

  getListNotification: async (req, res, next) => {
    var userID = req.params.userID;
    var result = await chatModel.getListNotification(userID);
    return res.status(200).json({ notification: result });
  },

  createChatRoom: async (user_id, target_id, username) => {
    var uniqid = (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16);
    var username_1 = username;
    var username_2 = await userModel.getUsernameFromId(target_id);
    username_2 = username_2[0].username;
    await chatModel.createChatRoom([uniqid, user_id, target_id, username_1, username_2]);
    return (uniqid);
  }
};
