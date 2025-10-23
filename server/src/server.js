// server/src/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const medicineRoutes = require('./routes/medicineRoutes.js');
const reminderScheduler = require('./jobs/reminderScheduler.js');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json()); // Allows parsing of JSON request bodies
app.use(cors()); // Enables Cross-Origin Resource Sharing for frontend communication

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/medicine', medicineRoutes);

// Start the cron job for reminders
reminderScheduler;

const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});