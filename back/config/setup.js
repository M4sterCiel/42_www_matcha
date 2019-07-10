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
    "CREATE TABLE IF NOT EXISTS users (id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY, lastname VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, mail VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, city VARCHAR(255), `key` VARCHAR(255), password_key VARCHAR(255), status TINYINT(1) NOT NULL DEFAULT 0)";
  require("./database").query(userTable, function(err, result) {
    if (err) throw err;
  });
  var pictureTable =
    "CREATE TABLE IF NOT EXISTS pictures (id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL,  user_id int(11) NOT NULL, base64 LONGTEXT NOT NULL, profile_picture BOOLEAN NOT NULL DEFAULT FALSE)";
  require("./database").query(pictureTable, function(err, result) {
    if (err) throw err;
  });
  var historyTable =
    "CREATE TABLE IF NOT EXISTS history (id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY, user_id int(11) NOT NULL, visitor_id int(11) NOT NULL, date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)";
  require("./database").query(historyTable, function(err, result) {
    if (err) throw err;
  });
  var likesTable =
    "CREATE TABLE IF NOT EXISTS likes (id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY, user_1 int(11) NOT NULL, user_2 int(11) NOT NULL, date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)";
  require("./database").query(likesTable, function(err, result) {
    if (err) throw err;
  });
  var messageTable =
    "CREATE TABLE IF NOT EXISTS messages (id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY, content MEDIUMTEXT NOT NULL, user_from int(11) NOT NULL, user_to int(11) NOT NULL, date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)";
  require("./database").query(messageTable, function(err, result) {
    if (err) throw err;
  });
  console.log("Database created");
});
