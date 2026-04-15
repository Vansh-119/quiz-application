const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  submitAttempt,
  getLeaderboard,
  getUserStats // ✅ ADD THIS
} = require("../controllers/attemptController");

// routes
router.post("/submit", auth, submitAttempt);
router.get("/leaderboard", getLeaderboard);
router.get("/stats/:userId", getUserStats);

module.exports = router;