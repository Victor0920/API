"use strict";
const { WebhookClient } = require("dialogflow-fulfillment");

const tupperService = require("../services/tupper");
const userService = require("../services/user");

const handler = async (req, res) => {
  const agent = new WebhookClient({
    request: req,
    response: res,
  });

  let intentMap = new Map();

  intentMap.set(
    "00_INIT_BOT-FWU-YES-NAME-PHONE-EMAIL-FINISH",
    userService.updateOne
  );

  intentMap.set("SAVE_NEW_TUPPER-FWU-FOOD-SUCCESS", tupperService.insertOne);

  intentMap.set("GET-TUPPERS-INFO-ALL", tupperService.findAll);

  intentMap.set(
    "GET-TUPPER-INFO-SPECIFIC-FWU-CAM-SUCCESS",
    tupperService.findOne
  );

  intentMap.set(
    "DELETE-TUPPER-SPECIFIC-FWU-CAM-SUCCESS",
    tupperService.deleteOne
  );

  intentMap.set("DELETE-TUPPERS-ALL-FWU-YES", tupperService.deleteAll);

  agent.handleRequest(intentMap);
};

module.exports = {
  handler,
};
