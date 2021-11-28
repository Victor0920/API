"use strict";

const User = require("../models/user");

const insertOne = async (req, res) => {
  try {
    const user = req.body;
    console.log({ user });

    const insertedUser = await new User(user);
    insertedUser.save();

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
    user.save();

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
