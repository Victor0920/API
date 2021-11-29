"use strict";

const mongoose = require("mongoose");

const TupperSchema = new mongoose.Schema({
  description: { type: String },
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
  created_by: { type: String },
});

const DeviceSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "UserSchema",
      default: () => [],
    },
  ],
  bot: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "UserSchema",
  },
  active_tuppers: [
    {
      type: TupperSchema,
      default: () => [],
    },
  ],
  updated_at: { type: Date },
  created_at: {
    type: Date,
    default: () => Date.now(),
  },
  model: { type: String },
});

DeviceSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Device", DeviceSchema);
