const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true // Firebase UID
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    default: "daily"
  },
  streak: {
    type: Number,
    default: 0
  },
  lastChecked: Date,
}, { timestamps: true });

module.exports = mongoose.model("Habit", habitSchema);
