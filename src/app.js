const express = require("express");
const logger = require("morgan");
const errorhandler = require("errorhandler");

const routes = require("./routes");

const app = express();

app.use(errorhandler());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routes);

module.exports = app;
