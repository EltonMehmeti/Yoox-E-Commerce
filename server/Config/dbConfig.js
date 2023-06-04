const mysql = require("mysql");

const dbConfig = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "Lab-Project",
});

module.exports = dbConfig;
