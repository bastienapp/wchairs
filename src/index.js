const express = require("express");
var cors = require('cors');

require('dotenv').config();

const connection = require('./config/mysql');

const app = express();
const port = process.env.PORT;

var corsOptions = {
  origin: process.env.FRONTEND_URL
}
app.use(cors(corsOptions));

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
