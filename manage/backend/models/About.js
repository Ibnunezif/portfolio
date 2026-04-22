const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  paragraphs: [{
    text: { type: String, required: true },
    boldSegments: [{
      start: Number,
      end: Number
    }]
  }]
});

module.exports = mongoose.model('About', aboutSchema);
