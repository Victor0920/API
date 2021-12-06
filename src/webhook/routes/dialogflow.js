"use strict";

const express = require("express");
const router = express.Router();

const dialogflowController = require("../controllers/dialogflow");

router.post("/", dialogflowController.handler);

module.exports = router;
