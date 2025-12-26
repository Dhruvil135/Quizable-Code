const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true }, // Who took it?
  quizId: { type: String, required: true },       // Which quiz?
  quizTitle: { type: String, required: true },    // Helper to show title easily
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);