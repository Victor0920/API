"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/device");

router.post("/device", controller.insertOne);

module.exports = router;
