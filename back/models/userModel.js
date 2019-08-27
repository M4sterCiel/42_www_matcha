var pool = require("../config/database");
var passwordHash = require("password-hash");

module.exports = {
  findOne: async (field, data) => {
    try {
      var result = await pool.query({
        sql: "SELECT * FROM ?? WHERE ?? = ?",
        values: ["users", field, data]
      });
      if (result) return result;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  getUsernameFromId: async user_id => {
    try {
      var result = await pool.query({
        sql: "SELECT username FROM users WHERE id = ?",
        values: [user_id]
      });
      if (result) return result;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  },

  updateOne: async (id, field, data) => {
    try {
      var result = await pool.query({
        sql: "UPDATE users SET ?? = ? WHERE `id` = ?",
        values: [field, data, id]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateData: async (id, data) => {
    try {
      let update_set = Object.keys(data).map(value => {
        if (data[value] == null) {
          return ` ${value}  = NULL`;
        } else return ` ${value}  = "${data[value]}"`;
      });
      var result = await pool.query({
        sql: "UPDATE users SET " + update_set.join(" ,") + " WHERE `id` = ?",
        values: [id]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  createOne: async data => {
    data[4] = passwordHash.generate(data[4], {
      algorithm: "sha512",
      saltLength: 10,
      iterations: 5
    });
    try {
      var result = await pool.query({
        sql:
          "INSERT INTO users (lastname, firstname, username, mail, password, city, geo_lat, geo_long, `key`) VALUES (?)",
        values: [data]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateRegister: async data => {
    try {
      var result = await pool.query({
        sql: "UPDATE users SET `key` = NULL, status = 1 WHERE `key` = ?",
        values: [data]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  updatePasswordWithId: async (pwd, id) => {
    pwd = passwordHash.generate(pwd, {
      algorithm: "sha512",
      saltLength: 10,
      iterations: 5
    });
    try {
      var result = await pool.query({
        sql: "UPDATE users SET `password` = ? WHERE `id` = ?",
        values: [pwd, id]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  setPasswordResetKey: async (id, key) => {
    try {
      var result = await pool.query({
        sql: "UPDATE users SET `password_key` = ? WHERE `id` = ?",
        values: [key, id]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  updatePasswordWithKey: async (pwd, key) => {
    pwd = passwordHash.generate(pwd, {
      algorithm: "sha512",
      saltLength: 10,
      iterations: 5
    });
    try {
      var result = await pool.query({
        sql: "UPDATE users SET `password` = ? WHERE `password_key` = ?",
        values: [pwd, key]
      });
      try {
        var result2 = await pool.query({
          sql: "UPDATE users SET `password_key`= NULL WHERE `password_key`= ?",
          values: key
        });
        return result.affectedRows + result2.affectedRows;
      } catch (err) {
        throw new Error(err);
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  deleteUser: async user_id => {
    try {
      var result = await pool.query({
        sql: "DELETE FROM users WHERE `id` = ?",
        values: user_id
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  saveStatus: async (status, userID) => {
    try {
      var result = await pool.query({
        sql:
          "UPDATE users SET `online`= ?, `last_connexion` = NOW() WHERE `id`= ?",
        values: [status, userID]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  getStatus: async data => {
    console.log(data);
    try {
      var result = await pool.query({
        sql: "SELECT `id`, online FROM users WHERE `id` IN (?)",
        values: [data]
      });
      //console.log(result);
      if (result) return result;
    } catch (err) {
      console.log("errreur =>>>>>>> ", err);
      throw new Error(err);
    }
  },

  getProfilePicture: async data => {
    try {
      var result = await pool.query({
        sql:
          "SELECT `user_id`, url FROM pictures WHERE `user_id` IN (?) AND profile_picture = 1",
        values: [data]
      });
      if (result) return result;
    } catch (err) {
      console.log("errreur =>>>>>>> ", err);
      throw new Error(err);
    }
  },

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

  getUserScore: async target_id => {
    try {
      var result = await pool.query({
        sql: "SELECT pop_score FROM users WHERE id = ?",
        values: [target_id]
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  increaseScore: async (score, target_id) => {
    try {
      var result = await pool.query({
        sql: "UPDATE users SET pop_score = pop_score + ? WHERE `id`= ?",
        values: [score, target_id]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  decreaseScore: async (score, target_id) => {
    try {
      var result = await pool.query({
        sql: "UPDATE users SET pop_score = pop_score - ? WHERE `id`= ?",
        values: [score, target_id]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  resetUserScore: async target_id => {
    try {
      var result = await pool.query({
        sql: "UPDATE users SET pop_score = 0 WHERE `id`= ?",
        values: [target_id]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  reportUser: async data => {
    try {
      var result = await pool.query({
        sql: "INSERT INTO report (user_id, reporting_id) VALUES (?)",
        values: [data]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  getUserRoomId: async (user_id, target_id) => {
    try {
      var result = await pool.query({
        sql:
          "SELECT room_id FROM matches WHERE user_1 = ? AND user_2 = ? OR user_1 = ? AND user_2 = ?",
        values: [user_id, target_id, target_id, user_id]
      });
      return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  checkUserIsReported: async (user_id, target_id) => {
    try {
      var result = await pool.query({
        sql: "SELECT * FROM report WHERE user_id = ? AND reporting_id = ?",
        values: [target_id, user_id]
      });
      if (result.length > 0) return true;
      return false;
    } catch (err) {
      throw new Error(err);
    }
  },

  blockUser: async (user_id, target_id) => {
    try {
      var result = await pool.query({
        sql: "INSERT INTO block (user_id, blocking_id) VALUES (?, ?)",
        values: [target_id, user_id]
      });
      if (result.affectedRows > 0) return true;
      return false;
    } catch (err) {
      throw new Error(err);
    }
  },

  checkUserIsBlocked: async (user_id, target_id) => {
    try {
      var result = await pool.query({
        sql: "SELECT * FROM block WHERE user_id = ? AND blocking_id = ?",
        values: [target_id, user_id]
      });
      if (result.length > 0) return true;
      return false;
    } catch (err) {
      throw new Error(err);
    }
  },

  unblockUser: async (user_id, target_id) => {
    try {
      var result = await pool.query({
        sql: "DELETE FROM block WHERE user_id = ? AND blocking_id = ?",
        values: [target_id, user_id]
      });
      if (result.affectedRows > 0) return false;
      return true;
    } catch (err) {
      throw new Error(err);
    }
  },

  getBlockedUsersFromMyId: async user_id => {
    try {
      var result = await pool.query({
        sql: "SELECT user_id FROM block WHERE blocking_id = ?",
        values: [user_id]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  }
};
