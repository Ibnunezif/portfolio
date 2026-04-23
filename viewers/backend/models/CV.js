const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  cvUrl: { type: String, required: true },
});

module.exports = mongoose.model('CV', cvSchema);
