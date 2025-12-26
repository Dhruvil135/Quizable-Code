const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  verified: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'blocked'], default: 'active' }
});

module.exports = mongoose.model('User', userSchema);
