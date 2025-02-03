// routes/workouts.js
const express = require('express');
const Workout = require('../models/workoutModel');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// GET all workouts (user-specific)
router.get('/', verifyToken, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST a new workout (user-specific)
router.post('/', verifyToken, async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = new Workout({ title, reps, load, user: req.user });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT (update) a workout
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { title: req.body.title, reps: req.body.reps, load: req.body.load },
      { new: true }
    );
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a workout
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!workout) return res.status(404).json({ error: 'Workout not found' });
    res.status(200).json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
