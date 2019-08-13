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
      var PicIndexAlreadyExists = await pool.query({
        sql: "SELECT * FROM pictures WHERE user_id = ? AND pic_index = ?",
        values: [id, data.pic_index]
      });

      console.log(PicIndexAlreadyExists.length);
      if (PicIndexAlreadyExists.length !== 0) {
        var result = await pool.query({
          sql:
            "UPDATE pictures SET url = ?, profile_picture = ? WHERE user_id = ? AND pic_index = ?",
          values: [data.url, data.profile_picture, id, data.pic_index]
        });
      } else {
        var result = await pool.query({
          sql:
            "INSERT INTO pictures(user_id, url, pic_index, profile_picture) VALUES (?, ?, ?, ?)",
          values: [id, data.url, data.pic_index, data.profile_picture]
        });
      }
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  }
};
