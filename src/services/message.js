"use strict";

const dialogflowService = require("./external/dialogflow");

const publishBotMessage = async (user, message, language, typeOfMessage) => {
  let response;
  let audioBase64 = null;

  if (typeOfMessage === "audio") {
    response = await dialogflowService.sendAudioMessage(
      "b-vision-1-kxqg",
      user,
      message,
      language
    );

    audioBase64 = Buffer.from(response.outputAudio).toString("base64");

    return { response, audioBase64 };
  } else if (typeOfMessage === "text") {
    response = await dialogflowService.sendTextMessage(
      "b-vision-1-kxqg",
      user,
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
