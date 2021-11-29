"use strict";

const User = require("../models/user");

module.exports = async function (req, res, next) {
  try {
    const userId = req.body.user;

    if (!userId) {
      return res.status(404).send({
        message: "Must create user before starting a conversation",
      });
    }

    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).send({
        message:
          "User not found. Must create user before starting a conversation",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "The server can't process the request",
    });
  }
};
