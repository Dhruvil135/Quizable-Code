require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database'); // Import DB config

// Import Routes
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Define Routes
app.use('/api/auth', authRoutes);

// Start Server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));