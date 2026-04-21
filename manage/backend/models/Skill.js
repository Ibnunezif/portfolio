const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true, enum: ['frontend', 'backend', 'tools', 'other'] },
  level: { type: Number, required: true, min: 0, max: 100 }
});

module.exports = mongoose.model('Skill', skillSchema);
