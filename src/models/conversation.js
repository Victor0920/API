"use strict";

const BotSchema = require("./bot");
const UserSchema = require("./user");
const MessageSchema = require("./message");
const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "UserSchema",
  },
  bot: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "BotSchema",
  },
  messages: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "MessageSchema",
    },
  ],
  updated_at: { type: Date },
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
});

ConversationSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Conversation", ConversationSchema);
