"use strict";

const express = require("express");
const router = express.Router();

const controller = require("../controllers/user");

const userRules = require("../middlewares/user");

router.post("/user", userRules, controller.insertOne);

router.put("/user/:id", userRules, controller.updateOne);

module.exports = router;
