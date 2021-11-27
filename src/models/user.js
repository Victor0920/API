"use strict";

const mongoose = require("mongoose");

const TupperSchema = new mongoose.Schema({
  description: { type: String },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  createdBy: { type: String },
});

const UserSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  updatedAt: { type: Date },
  createdAt: { type: Date },
  storedFood: [TupperSchema],
});

module.exports = mongoose.model("User", UserSchema);
