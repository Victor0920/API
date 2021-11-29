"use strict";

const Device = require("../models/device");

module.exports = async function (req, res, next) {
  try {
    const deviceId = req.body.device;

    if (!deviceId) {
      return res.status(404).send({
        message: "Must assign a valid device key to create user",
      });
    }

    const device = await Device.findById(deviceId).lean();

    if (!device) {
      return res.status(404).send({
        message:
          "Device key is not valid. Must assign a valid device key to create user",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "The server can't process the request",
    });
  }
};
