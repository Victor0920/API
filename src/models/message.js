"use strict";

const UserSchema = require("./user");
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  sender_type: { type: String },
  sender: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "UserSchema",
  },
  messages: {
    message: {
      audio: { type: String },
      text: { type: String },
    },
    payload: { type: Object },
  },
  intent: { type: String },
  language: { type: String },
  speechConfidence: { type: Number },
});

module.exports = mongoose.model("Message", MessageSchema);
