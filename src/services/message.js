"use strict";

const dialogflowService = require("./external/dialogflow");

const publishBotMessage = async (
  user = "user111",
  message,
  language = "es-ES"
) => {
  const response = await dialogflowService.sendMessage(
    "b-vision-1-kxqg",
    "user",
    [message],
    "es-ES"
  );

  return response;
};

module.exports = {
  publishBotMessage,
};
