var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'logitech',
  port     : '3390'
});

connection.connect( (err) => {
    if (err)
        console.log(err);
    else
        console.log("Connected to mysql database");
})

module.exports = connection;