"use strict";

const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
