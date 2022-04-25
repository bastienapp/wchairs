const express = require("express");
const app = express();
const port = 5000;

const hairSalon = [
  {
    id: 12,
    name: "Tiff'haine",
  },
  {
    id: 28,
    name: "Adult'hair",
  },
  {
    id: 3,
    name: "Ryan'hair",
  },
  {
    id: 15,
    name: "La casa de pelos",
  },
  {
    id: 42,
    name: "Apéritiff",
  },
];

app.get("/", (request, response) => {
  response.status(200).send("Hello WCS!");
});

app.get("/salons", function (request, response) {
  response.send(hairSalon);
});

app.get("/salons/:id", (request, response) => {
  // récupérer la valeur de :id
  const salonId = parseInt(request.params.id);
  // trouver l'élément qui à l'identifiant id
  const salon = hairSalon.find((salon) => salon.id === salonId);
  if (salon) {
    response.send(salon);
  } else {
    response.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
