var pool = require("../config/database");


module.exports = {
    getMatchList: async userID => {
        try {
            var result = await pool.query({
              sql:
                "SELECT * FROM likes WHERE user_1 = ? OR user_2 = ?",
              values: [userID, userID]
            });
            //console.log(result);
            if (result) return result;
          } catch (err) {
            throw new Error(err);
          }
    }
}