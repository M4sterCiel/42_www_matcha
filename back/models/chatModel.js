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
            if (result) return result;
          } catch (err) {
            throw new Error(err);
          }
    }
}