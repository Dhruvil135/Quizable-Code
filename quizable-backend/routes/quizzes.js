const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// 1. CREATE a new Quiz
router.post('/', async (req, res) => {
  try {
    const { title, subject, questions, createdBy } = req.body;
    
    const newQuiz = new Quiz({
      title,
      subject,
      questions,
      createdBy
    });

    await newQuiz.save();
    res.status(201).json({ msg: 'Quiz created successfully!', quiz: newQuiz });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET ALL Quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 }); // Newest first
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. DELETE a Quiz
router.delete('/:id', async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;