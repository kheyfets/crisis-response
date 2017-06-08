const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  priority: Number,
  issueType: String,
  flightNumber: String,
  crewId: Number,
  comments: String,
  status: {
    type: String,
    default: 'Unresolved'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Alert', AlertSchema);