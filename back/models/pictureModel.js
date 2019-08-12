var pool = require("../config/database");

module.exports = {
  findOne: async (field, data) => {
    try {
      var result = await pool.query({
        sql: "SELECT * FROM ?? WHERE ?? = ?",
        values: ["pictures", field, data]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  findProfile: async (field, data) => {
    try {
      var result = await pool.query({
        sql: "SELECT * FROM ?? WHERE ?? = ? AND profile_picture = 1",
        values: ["pictures", field, data]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  }
};
