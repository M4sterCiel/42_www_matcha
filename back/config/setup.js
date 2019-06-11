var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "azerty123",
  port: "3390"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS matcha", function(err, result) {
    if (err) throw err;
  });
  var userTable =
    "CREATE TABLE IF NOT EXISTS users (id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY, lastname VARCHAR(255) NOT NULL,  firstname VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, city VARCHAR(255), `key` VARCHAR(255), status TINYINT(1) NOT NULL DEFAULT 0)";
  require("./database").query(userTable, function(err, result) {
    if (err) throw err;
  });
  console.log("Database created");
});
