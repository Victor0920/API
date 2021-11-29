"use strict";

const mongoose = require("mongoose");

const ConversationSchema = require("./conversation");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String },
  updated_at: { type: Date },
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
  device: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "UserSchema",
  },
  conversation: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "ConversationSchema",
  },
});

UserSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("User", UserSchema);
