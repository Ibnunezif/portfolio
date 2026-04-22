const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  imageUrl: String,
  category: { type: String, enum: ['Web', 'AI/ML', 'Open Source', 'Desktop'], default: 'Web' }
});

module.exports = mongoose.model('Project', projectSchema);
