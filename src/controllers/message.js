"use strict";

const messageService = require("../services/message");

const insertOne = async (req, res) => {
  try {
    const userId = req.body.userId;
    const language = req.body.language;
    const typeOfMessage = req.body.message.type;
    const message = req.body.message.message;

    const response = await messageService.publishBotMessage(
      userId,
      message,
      language,
      typeOfMessage
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
