const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseName: { type: String, index: 'text' },
  instructor: String,
  credits: Number
});

module.exports = mongoose.model('Course', courseSchema);