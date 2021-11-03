const express = require("express");
const logger = require("morgan");
const errorhandler = require("errorhandler");
const dialogflowService = require("./src/services/dialogflow");

let app = express();

app.use(errorhandler());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/accounts", async (req, res) => {
  const response = await dialogflowService.executeQueries(
    "b-vision-1-kxqg",
    "sess_4",
    ["hola"],
    "es-ES"
  );

  res.status(200).send(response);
});

app.post("/accounts", async (req, res) => {
  const texts = req.body.texts;

  const response = await dialogflowService.executeQueries(
    "b-vision-1-kxqg",
    "sess_4",
    [texts],
    "es-ES"
  );

  res.status(200).send(response);
});

// app.put("/accounts/:id", (req, res) => {
//   res.status(200).send({ hay: "id" });
// });

// app.delete("/accounts/:id", (req, res) => {
//   res.status(204).send({ hay: "id" });
// });

app.listen(3000);
