"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/message");
// const allowAuthenticated = require('../middlewares/allowAuthenticated');

// const {
//     queryValidator,
//     postBodyValidator,
// } = require('../validators/message');

// router.get(
//     '/messages',
//     // allowAuthenticated,
//     // queryValidator,
//     controller.find,
// );

router.post(
  "/messages",
  // allowAuthenticated,
  // postBodyValidator,
  controller.postMessages // Name not clear
);

module.exports = router;
