var pool = require("../config/database");


module.exports = {
    saveMessage: async (data) => {
        try {
            var result = await pool.query({
              sql:
                "INSERT INTO messages (content, user_id, room_id) VALUES (?)",
              values: [data]
            });
            return result.affectedRows;
          } catch (err) {
            throw new Error(err);
          }
    },

    getMessages: async (room_id) => {
        try {
            var result = await pool.query({
              sql: "SELECT * FROM messages WHERE room_id = ?",
              values: [room_id]
            });
            //console.log(result);
            if (result) return result;
          } catch (err) {
            throw new Error(err);
          }
    },

    saveNotification: async data => {
      try {
        var result = await pool.query({
          sql:
            "INSERT INTO notification (user_id, sender_id, type, data, reference) VALUES (?)",
          values: [data]
        });
        return result.affectedRows;
      } catch (err) {
        throw new Error(err);
      }
    },

    getCountNotification: async userID => {
      try {
        var result = await pool.query({
          sql: "SELECT COUNT (*) FROM notification WHERE `user_id` = ? AND type = 2 AND `isRead` = 0",
          values: [userID]
        });
        //console.log(result);
        if (result) return result;
      } catch (err) {
        throw new Error(err);
      }
    },
    
    getListNotification: async userID => {
      try {
        var result = await pool.query({
          sql: "SELECT * FROM notification WHERE `user_id` = ? AND type = 2 AND `isRead` = 0",
          values: [userID]
        });
        //console.log(result);
        if (result) return result;
      } catch (err) {
        throw new Error(err);
      }
    },

    readNotification: async (type, ref, userID) => {
      try {
        var result = await pool.query({
          sql: "DELETE FROM notification WHERE type = ? AND reference = ? AND user_id = ?",
          values: [type, ref, userID]
        });
        //console.log(result);
        if (result) return result;
      } catch (err) {
        throw new Error(err);
      }
    }
}