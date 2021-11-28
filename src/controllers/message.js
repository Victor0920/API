"use strict";

const Message = require("../models/message");
const Bot = require("../models/bot");

const messageService = require("../services/message");

const postMessages = async (req, res) => {
  try {
    const botId = req.body.botId || "61a3d16b0ec2d91be729867a";
    const userId = req.body.userId;
    const language = req.body.language;
    const typeOfMessage = req.body.message.type;
    const message = req.body.message.message;

    const bot = await Bot.findById(botId);

    const botResponse = await messageService.publishBotMessage(
      bot,
      userId,
      message,
      language,
      typeOfMessage
    );

    let insertedBotMessage;
    let insertedUserMessage;

    // return res.json(botResponse); // Returns entity sys any

    if (botResponse) {
      const queryResult = botResponse.response
        ? botResponse.response.queryResult
        : botResponse.queryResult;
      const responseMessages = queryResult.fulfillmentMessages;
      const intentName = queryResult.intent.displayName;
      const payload = responseMessages.filter(
        (messages) => messages.message === "payload"
      )[0];

      if (
        intentName.includes("UPDATE-USER-INFO") ||
        intentName.includes("UPDATE-USER-INFO") // chech for intent prefix
      ) {
        // Update user (User.updateOne). Maybe create tupper controller and extract tupper info intent
      }

      insertedUserMessage = await new Message({
        messages: {
          message: {
            text: queryResult.queryText,
            audio: message != queryResult.queryText ? message : null,
          },
        },
        sender_type: "User",
        sender: userId,
        intent: intentName,
        speechConfidence: queryResult.speechRecognitionConfidence,
        language,
      });
      insertedUserMessage.save();

      let beautyPayload = {};
      if (payload) {
        for (const [key, value] of Object.entries(payload)) {
          const newPayload = {};
          newPayload[key] = value.boolValue;
          Object.assign(beautyPayload, newPayload);
        }
      }

      insertedBotMessage = await new Message({
        messages: {
          message: {
            text: responseMessages[0].text?.text[0],
            audio: botResponse.audioBase64,
          },
          payload: payload ? beautyPayload : {},
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
  postMessages,
};
