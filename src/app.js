const express = require("express");
const logger = require("morgan");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");

const routes = require("./routes");
const webhookRoutes = require("./webhook/routes");

const app = express();

app.use(errorhandler());
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());

app.use("/api", routes);
app.use("/webhook", webhookRoutes);

module.exports = app;
