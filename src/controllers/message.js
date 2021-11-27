"use strict";

const Message = require("../models/message");

const messageService = require("../services/message");

const insertOne = async (req, res) => {
  try {
    const userId = req.body.userId;
    const language = req.body.language;
    const typeOfMessage = req.body.message.type;
    const message = req.body.message.message;

    const botResponse = await messageService.publishBotMessage(
      userId,
      message,
      language,
      typeOfMessage
    );

    let insertedBotMessage;
    let insertedUserMessage;

    if (botResponse) {
      const queryResult = botResponse.response.queryResult;
      const responseMessages = queryResult.fulfillmentMessages;

      insertedUserMessage = await new Message({
        messages: {
          message: {
            text: queryResult.queryText,
            audio: message != queryResult.queryText ? message : null,
          },
        },
        sender_type: "User",
        sender: userId,
        intent: queryResult.intent.displayName,
        speechConfidence: queryResult.speechRecognitionConfidence,
        language,
      });
      insertedUserMessage.save();

      let payload = {};
      for (const [key, value] of Object.entries(
        responseMessages[1].payload.fields
      )) {
        const newPayload = {};
        newPayload[key] = value.boolValue;
        Object.assign(payload, newPayload);
      }

      insertedBotMessage = await new Message({
        messages: {
          message: {
            text: responseMessages[0].text?.text[0],
            audio: botResponse.audioBase64,
          },
          payload,
        },
        sender_type: "Bot",
        sender: null, // Update with ObjectId of Bot Schema
        intent: queryResult.intent.displayName,
        speechConfidence: queryResult.speechRecognitionConfidence,
        language,
      });
      insertedBotMessage.save();
    }

    return res.json({
      request: insertedUserMessage.messages,
      response: insertedBotMessage.messages,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.toString(),
    });
  }
};

module.exports = {
  insertOne,
};
