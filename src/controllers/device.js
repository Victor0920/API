"use strict";

const Device = require("../models/device");

const insertOne = async (req, res) => {
  try {
    const device = req.body;

    const insertedDevice = await new Device(device);
    await insertedDevice.save();

    return res.json({ device: insertedDevice });
  } catch (error) {
    return res.status(500).send({
      message: error.toString(),
    });
  }
};

const updateOne = async (req, res) => {
  try {
    const deviceId = req.params.id;
    const updatedDeviceFields = req.body;

    const device = await Device.findById(deviceId);
    device[0] = { ...device[0], ...updatedDeviceFields };
    await device.save();

    return res.json({ device: device[0] });
  } catch (error) {
    return res.status(500).send({
      message: error.toString(),
    });
  }
};

module.exports = {
  insertOne,
  updateOne,
};
