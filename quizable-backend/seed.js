const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to DB...'))
  .catch(err => console.log(err));

const sampleQuizzes = [
  {
    title: "C Programming Basics",
    subject: "c",
    createdBy: "system@admin.com",
    questions: [
      { q: "Who is the father of C language?", options: ["Steve Jobs", "James Gosling", "Dennis Ritchie", "Rasmus Lerdorf"], ans: 2 },
      { q: "Which symbol terminates a statement?", options: [":", ";", ".", ","], ans: 1 }
    ]
  },
  {
    title: "Java OOP Concepts",
    subject: "java",
    createdBy: "system@admin.com",
    questions: [
      { q: "Which keyword creates an object?", options: ["class", "struct", "new", "object"], ans: 2 },
      { q: "Java is a ___ language?", options: ["Low-level", "Object-Oriented", "Assembly", "Scripting"], ans: 1 }
    ]
  }
];

const seedDB = async () => {
  await Quiz.deleteMany({}); // Clears old quizzes
  await Quiz.insertMany(sampleQuizzes);
  console.log("Database Seeded with 2 Quizzes! 🌱");
  mongoose.connection.close();
};

seedDB();