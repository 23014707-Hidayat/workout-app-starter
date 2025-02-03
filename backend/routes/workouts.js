const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Workout = require('../models/Workout');

const router = express.Router();

// Get all workouts for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  const workouts = await Workout.find({ user: req.user });
  res.json(workouts);
});

// Add a workout
router.post('/', authMiddleware, async (req, res) => {
  const workout = new Workout({ ...req.body, user: req.user });
  await workout.save();
  res.json(workout);
});

// Update a workout
router.put('/:id', authMiddleware, async (req, res) => {
  const workout = await Workout.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    req.body,
    { new: true }
  );
  res.json(workout);
});

// Delete a workout
router.delete('/:id', authMiddleware, async (req, res) => {
  await Workout.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ msg: 'Workout deleted' });
});

module.exports = router;
