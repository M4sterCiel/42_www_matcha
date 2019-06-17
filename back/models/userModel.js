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
          "INSERT INTO users (lastname, firstname, username, mail, password, `key`) VALUES (?)",
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
  }
};
