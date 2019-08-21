var pool = require("../config/database");


module.exports = {
    getNotification: async userID => {
        try {
          var result = await pool.query({
            sql:
              "SELECT * FROM notification WHERE `user_id` = ? AND type != 2 ORDER BY date DESC",
            values: [userID]
          });
          //console.log(result);
          if (result) return result;
        } catch (err) {
          throw new Error(err);
        }
      },
    
    dismissNotif: async userID => {
        try {
          var result = await pool.query({
            sql: "UPDATE notification SET `isRead`= 1 WHERE `user_id`= ?",
            values: [userID]
          });
          return result.affectedRows;
        } catch (err) {
          throw new Error(err);
        }
      },

    alreadyExists: async (type, user_id, target_id) => {
        try {
            var result = await pool.query({
              sql:
                "SELECT * FROM notification WHERE `user_id` = ? AND `sender_id` = ? AND type = ?",
              values: [target_id, user_id, type]
            });
            console.log(result);
            if (result) return result;
          } catch (err) {
            throw new Error(err);
          }
    }
};