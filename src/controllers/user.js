"use strict";

const User = require("../models/user");
const Device = require("../models/device");

const insertOne = async (req, res) => {
  try {
    const user = req.body;
    const userDevice = await Device.findById(user.device);
    let insertedUser;

    if (userDevice) {
      insertedUser = await new User(user);
      await insertedUser.save();

      userDevice.users.push(insertedUser._id);
      await userDevice.save();
    }

    return res.json({ user: insertedUser });
  } catch (error) {
    return res.status(500).send({
      message: error.toString(),
    });
  }
};

const updateOne = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserFields = req.body;

    const user = await User.findById(userId);
    user[0] = { ...user[0], ...updatedUserFields };
    await user.save();

    return res.json({ user: user[0] });
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
