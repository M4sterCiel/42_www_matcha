var pool = require("../config/database");

module.exports = {
  findOne: async id => {
    try {
      var result = await pool.query({
        sql:
          "SELECT user_tags.tag_id, tags.value FROM user_tags INNER JOIN tags ON user_tags.tag_id = tags.id WHERE user_tags.user_id = ??",
        values: [id]
      });
      if (result) return result;
    } catch (err) {
      throw new Error(err);
    }
  }
};
