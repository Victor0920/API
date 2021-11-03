const express = require("express");
const logger = require("morgan");
const errorhandler = require("errorhandler");
const dialogflowService = require("./src/services/external/dialogflow");

const app = require("./src/app");

app.listen(3000);
