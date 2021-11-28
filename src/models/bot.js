"use strict";

const mongoose = require("mongoose");

const BotSchema = new mongoose.Schema({
  type: { type: String },
  project_id: { type: String },
  private_key_id: { type: String },
  private_key: { type: String },
  client_email: { type: String },
  client_id: { type: String },
  auth_uri: { type: String },
  token_uri: { type: String },
  auth_provider_x509_cert_url: { type: String },
  client_x509_cert_url: { type: String },
});

module.exports = mongoose.model("Bot", BotSchema);
