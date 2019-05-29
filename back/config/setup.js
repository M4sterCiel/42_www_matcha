var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "logitech",
  port: '3390'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE IF NOT EXISTS matcha", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});