"use strict";

const dialogflowService = require("./external/dialogflow");

const publishBotMessage = async (
  bot,
  userId,
  message,
  language,
  typeOfMessage
) => {
  const sessionId = userId;
  let response;
  let audioBase64 = null;

  if (typeOfMessage === "audio") {
    response = await dialogflowService.sendAudioMessage(
      bot,
      sessionId,
      message,
      language
    );

    audioBase64 = Buffer.from(response.outputAudio).toString("base64");

    return { response, audioBase64 };
  } else if (typeOfMessage === "text") {
    response = await dialogflowService.sendTextMessage(
      bot,
      sessionId,
      message,
      language
    );

    return response;
  } else {
    return res.status(400).send({
      message: `message.type: '${typeOfMessage}' is not a valid argument`,
    });
  }
};

module.exports = {
  publishBotMessage,
};
