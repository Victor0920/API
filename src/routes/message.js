"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/message");

const messageRules = require("../middlewares/message");

router.post(
  "/messages",
  messageRules,
  controller.postMessages // Name not clear
);

module.exports = router;
