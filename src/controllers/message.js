"use strict";

const Message = require("../models/message");
const User = require("../models/user");
const Bot = require("../models/bot");
const Conversation = require("../models/conversation");
const Device = require("../models/device");

const messageService = require("../services/message");

const postMessages = async (req, res) => {
  try {
    const botId = req.body.botId || "61a3d16b0ec2d91be729867a";
    const userId = req.body.user;
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
    let insertedConversation;

    if (botResponse) {
      const queryResult = botResponse.response
        ? botResponse.response.queryResult
        : botResponse.queryResult;
      const responseMessages = queryResult.fulfillmentMessages;
      const intentName = queryResult.intent.displayName || "";
      const payload = responseMessages.filter(
        (messages) => messages.message === "payload"
      )[0];

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
        speech_confidence: queryResult.speechRecognitionConfidence,
        language,
      });

      let beautyPayload = {};
      if (payload) {
        for (const [key, value] of Object.entries(payload.payload.fields)) {
          const newPayload = {};
          newPayload[key] = value.boolValue;
          Object.assign(beautyPayload, newPayload);
        }
      }

      insertedBotMessage = await new Message({
        messages: {
          message: {
            text: responseMessages[0].text
              ? responseMessages[0].text.text[0]
              : "",
            audio: botResponse.audioBase64,
          },
          payload: payload ? beautyPayload : {},
        },
        sender_type: "Bot",
        sender: botId,
        intent: queryResult.intent.displayName,
        speech_confidence: queryResult.speechRecognitionConfidence,
        language,
      });

      insertedConversation = await Conversation.findOne({ user: userId });

      if (!insertedConversation) {
        insertedConversation = await new Conversation({
          user: userId,
          bot: botId,
          messages: [],
        });
      }

      const user = await User.findById(userId);

      if (user) {
        user.conversation = insertedConversation._id;
        await user.save();
      }

      insertedBotMessage.conversation = insertedConversation._id;
      insertedUserMessage.conversation = insertedConversation._id;

      insertedConversation.messages.push(insertedUserMessage._id);
      insertedConversation.messages.push(insertedBotMessage._id);

      await insertedUserMessage.save();
      await insertedBotMessage.save();
      await insertedConversation.save();
    }

    return res.json({
      request: insertedUserMessage.messages,
      response: insertedBotMessage.messages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.toString(),
    });
  }
};

module.exports = {
  postMessages,
};
