var pool            = require('../config/database');

module.exports = {
    findOne: async (field, data) => {
        try {
            var result = await pool.query({
                sql: "SELECT * FROM ?? WHERE ?? = ?",
                values: ['pictures', field, data]
            });
            if (result) return (result);
        } catch(err) {
            throw new Error(err)
        };
    }
}