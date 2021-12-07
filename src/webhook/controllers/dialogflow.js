"use strict";
const { WebhookClient } = require("dialogflow-fulfillment");

const tupperService = require("../services/tupper");

const handler = async (req, res) => {
  // if (!req.body.queryResult.fulfillmentMessages) {
  //   return;
  // }

  // req.body.queryResult.fulfillmentMessages =
  //   req.body.queryResult.fulfillmentMessages.map((m) => {
  //     console.log({ m });
  //     if (!m.platform) m.platform = "PLATFORM_UNSPECIFIED";
  //     return m;
  //   });

  const agent = new WebhookClient({
    request: req,
    response: res,
  });

  let intentMap = new Map();

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
