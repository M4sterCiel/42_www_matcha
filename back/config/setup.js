var mysql = require('mysql');

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'logitech',
  port     : '3390'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS matcha", function (err, result) {
    if (err) throw err;
  });
  var userTable = "CREATE TABLE IF NOT EXISTS users (id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY, lastname VARCHAR(255) NOT NULL,  firstname VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, gender ENUM('male', 'female'), orientation ENUM('hetero', 'homo', 'bi') NOT NULL DEFAULT 'bi', city VARCHAR(255), longitude INT(11), lattitude INT(11), `key` VARCHAR(255), status TINYINT(1) NOT NULL DEFAULT 0)";
  require('./database').query(userTable, function (err, result) {
    if (err) throw err;
  });
  console.log("Database created");
});