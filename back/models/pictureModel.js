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
  },

  deleteOne: async (id, pic_index) => {
    try {
      var result = await pool.query({
        sql: "DELETE FROM pictures WHERE user_id = ? AND pic_index = ?",
        values: [id, pic_index]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  },

  updateOne: async (id, data) => {
    try {
      var result = await pool.query({
        sql:
          "IF EXISTS(SELECT * FROM pictures WHERE user_id = ? AND pic_index = ? UPDATE pictures SET url = ??, profile_picture = ?? WHERE user_id = ? AND pic_index = ? ELSE INSERT INTO pictures(user_id, url, pic_index, profile_picture) VALUES (" +
          id +
          ", " +
          url +
          ", " +
          pic_index +
          ", " +
          profile_picture +
          ")",
        values: [
          id,
          data.pic_index,
          data.url,
          data.profile_picture,
          id,
          data.pic_index
        ]
      });
      return result.affectedRows;
    } catch (err) {
      throw new Error(err);
    }
  }
};

/* .pic_index,
      req.body.data.url,
      req.body.data.profile_picture */
