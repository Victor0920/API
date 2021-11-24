"use strict";

const dialogflowService = require("./external/dialogflow");

const publishBotMessage = async (user, message, language, typeOfMessage) => {
  let response;
  let audioBase64 = null;
  let payload = {};

  if (typeOfMessage === "audio") {
    response = await dialogflowService.sendAudioMessage(
      "b-vision-1-kxqg",
      user,
      message,
      language
    );

    audioBase64 = Buffer.from(response.outputAudio).toString("base64");
  } else if (typeOfMessage === "text") {
    response = await dialogflowService.sendTextMessage(
      "b-vision-1-kxqg",
      user,
      message,
      language
    );
  } else {
    return res.status(400).send({
      message: `message.type: '${typeOfMessage}' is not a valid argument`,
    });
  }

  const responseMessages = response.queryResult.fulfillmentMessages;

  for (const [key, value] of Object.entries(
    responseMessages[1].payload.fields
  )) {
    const newPayload = {};
    newPayload[key] = value.boolValue;
    Object.assign(payload, newPayload);
  }

  const botMessage = {
    message: {
      text: responseMessages[0].text?.text[0],
      audio: audioBase64,
    },
    payload,
    request: {
      text: response.queryResult.queryText,
    },
  };

  return botMessage;
};

module.exports = {
  publishBotMessage,
};
