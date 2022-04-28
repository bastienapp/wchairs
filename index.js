const express = require("express");
var cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

connection.connect(function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log("success");
  }
});

const app = express();
const port = 5000;

var corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(cors(corsOptions));

app.get("/", (request, response) => {
  response.status(200).send("Hello WCS!");
});

app.get("/salons", function (request, response) {
  connection.query(
    'SELECT id, name FROM `salon`',
    function(error, results) {
      if (error) {
        response.status(500).send(error);
      } else {
        response.send(results);
      }
    }
  );
});

app.get("/salons/:id", (request, response) => {
  // récupérer la valeur de :id
  const salonId = request.params.id;

  connection.query(
    "SELECT id, name FROM salon where id = ?",
    [salonId],
    function(error, results) {
      console.log(results);
      if (error) {
        response.status(500).send(error);
      } else if (results.length === 0) {
        response.sendStatus(404);
      } else {
        response.send(results[0]);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
