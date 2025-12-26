const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*
-------------------------------------------------
REGISTER CONTROLLER
Purpose:
Frontend → Backend → MongoDB
This is what you will DEMO to mam
-------------------------------------------------
*/
exports.register = async (req, res) => {
  try {
    // 🔹 STEP 3 PROOF LINE (VERY IMPORTANT FOR PRESENTATION)
    console.log("📩 Register API called from frontend");
    console.log("📦 Data received:", req.body);

    const { email, password, role } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Encrypt password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      passwordHash,
      role
    });

    // Save to MongoDB Atlas
    await newUser.save();

    console.log("✅ User saved in MongoDB Atlas");

    res.status(201).json({
      msg: 'User registered successfully'
    });

  } catch (err) {
    console.error("❌ Register error:", err.message);
    res.status(500).json({
      msg: 'Server error',
      error: err.message
    });
  }
};

/*
-------------------------------------------------
LOGIN CONTROLLER
Purpose:
Frontend → Backend → JWT Token
-------------------------------------------------
*/
exports.login = async (req, res) => {
  try {
    console.log("🔐 Login API called from frontend");
    console.log("📦 Data received:", req.body);

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    console.log("✅ Login successful, token generated");

    res.json({
      token,
      user: {
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({
      msg: 'Server error',
      error: err.message
    });
  }
};
