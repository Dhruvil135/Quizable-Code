const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// 1. SAVE a new Result (When student finishes quiz)
router.post('/', async (req, res) => {
  try {
    const { studentEmail, quizId, quizTitle, score, total } = req.body;

    const newResult = new Result({
      studentEmail,
      quizId,
      quizTitle,
      score,
      total
    });

    await newResult.save();
    res.status(201).json({ msg: 'Score saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET Results (For Dashboards)
router.get('/', async (req, res) => {
  try {
    // Return all results, newest first
    const results = await Result.find().sort({ date: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;