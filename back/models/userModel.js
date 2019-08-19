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
        sql: "UPDATE users SET `online`= ? WHERE `id`= ?",
        values: [status, userID]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  },

  getStatus: async data => {
    //ßconsole.log(data);
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
  }
};
