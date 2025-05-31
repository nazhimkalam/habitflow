const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");

// Base path: /api/habits
router.post("/", habitController.createHabit);
router.get("/", habitController.getHabits);
router.put("/:id", habitController.updateHabit);
router.delete("/:id", habitController.deleteHabit);
router.patch("/:id/checkin", habitController.checkInHabit);


module.exports = router;
