const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  createdBy: { type: String, required: true }, // Stores instructor's email
  questions: [
    {
      q: { type: String, required: true },
      options: [{ type: String, required: true }], // Array of 4 options
      ans: { type: Number, required: true } // Index of correct answer (0-3)
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);