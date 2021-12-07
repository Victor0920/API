"use strict";

const mongoose = require("mongoose");

const TupperSchema = new mongoose.Schema(
  {
    qr_code: { type: String },
    value: { type: String },
    created_by: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "UserSchema",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const DeviceSchema = new mongoose.Schema(
  {
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
    model: { type: String },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Device", DeviceSchema);
