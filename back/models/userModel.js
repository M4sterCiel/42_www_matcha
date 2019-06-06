var mysql   = require('mysql');
var pool     = require('../config/database');

module.exports = {
    findOne: async (field, data) => {
        var plop;
        var sql = "SELECT * FROM ?? WHERE ?? = ?";
        var inserts = ['users', field, data];
        sql = mysql.format(sql, inserts);
        pool.query(sql, [field, data], (error, results, fields) => {
            if (error)
                throw error;
            console.log(results);
            plop = results;
        });
        return plop;
    }
}