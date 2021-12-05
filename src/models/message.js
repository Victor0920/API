"use strict";

const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender_type: { type: String },
    sender: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "UserSchema",
    },
    conversation: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ConversationSchema",
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
    speech_confidence: { type: Number },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Message", MessageSchema);
