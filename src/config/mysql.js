const mysql = require('mysql2');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_NAME
});

connection.connect(function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log("success");
  }
});

//export default connection;
module.exports = connection;