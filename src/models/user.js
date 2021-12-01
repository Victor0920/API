"use strict";

const mongoose = require("mongoose");

const ConversationSchema = require("./conversation");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
    email: { type: String },
    device: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "UserSchema",
    },
    conversation: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "ConversationSchema",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("User", UserSchema);
