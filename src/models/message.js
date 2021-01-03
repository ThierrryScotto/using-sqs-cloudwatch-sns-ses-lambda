'use strict';

// imports
const mongoose  = require('../services/db/index');

const Schema = mongoose.Schema;

const messaseSchema = new Schema({
  messageId:   { type: String, required: true },
  messageBody: { type: Object, required: true },
  createAt:    { type: Date, default: Date.now },
});


module.exports = mongoose.model('Message', messaseSchema);