const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  points: [{ type: String }],
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Education', EducationSchema);
