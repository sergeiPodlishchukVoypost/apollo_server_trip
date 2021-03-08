"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const tripSchema = new Schema({
  from: { name: { type: String, required: true } },
  to: { name: { type: String, required: true } },
});

const tripModel = mongoose.model("Trip", tripSchema);

module.exports = tripModel;
