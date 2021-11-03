"use strict";

const insertOne = async (req, res) => {
  try {
    console.log("hola message");

    return res.json({
      text: "heyy",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.toString(),
    });
  }
};

module.exports = {
  insertOne,
};
