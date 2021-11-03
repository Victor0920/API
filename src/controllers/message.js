"use strict";

const messageService = require("../services/message");

const insertOne = async (req, res) => {
  const text = req.body.text;
  try {
    const response = await messageService.publishBotMessage(
      "user_0",
      text,
      "es-ES"
    );

    return res.json(response);
  } catch (error) {
    return res.status(500).send({
      message: error.toString(),
    });
  }
};

module.exports = {
  insertOne,
};
