const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  avatar: { type: String },
  linkedInUrl: { type: String },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
