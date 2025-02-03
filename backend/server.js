require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/auth', authRoutes);

// Connect to DB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);  // Stop the app if DB connection fails
  });
