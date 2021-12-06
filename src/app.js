const express = require("express");
const logger = require("morgan");
const errorhandler = require("errorhandler");

const routes = require("./routes");
const webhookRoutes = require("./webhook/routes");

const app = express();

app.use(errorhandler());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routes);
app.use("/webhook", webhookRoutes);

module.exports = app;
