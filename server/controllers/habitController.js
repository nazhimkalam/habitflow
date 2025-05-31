const Habit = require("../models/Habit");

// Create a new habit
exports.createHabit = async (req, res) => {
  try {
    const habit = new Habit({ ...req.body, userId: req.user.uid });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all habits for logged-in user
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.uid });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a habit
exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.uid },
      req.body,
      { new: true }
    );
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.uid
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Check-in and update streak
exports.checkInHabit = async (req, res) => {
    try {
      const habit = await Habit.findOne({ _id: req.params.id, userId: req.user.uid });
      if (!habit) return res.status(404).json({ message: "Habit not found" });
  
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
      if (habit.lastChecked) {
        const last = new Date(habit.lastChecked);
        const lastDate = new Date(last.getFullYear(), last.getMonth(), last.getDate());
  
        const diffDays = (today - lastDate) / (1000 * 60 * 60 * 24);
  
        if (diffDays === 1) {
          habit.streak += 1;
        } else if (diffDays > 1) {
          habit.streak = 1;
        } // else: same day check-in, do nothing
      } else {
        habit.streak = 1;
      }
  
      habit.lastChecked = now;
      await habit.save();
      res.json(habit);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  