"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const tripSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
});

const tripModel = mongoose.model("Contact", tripSchema);

module.exports = tripModel;
