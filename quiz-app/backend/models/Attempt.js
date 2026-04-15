const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"   // 🔥 ADD THIS
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz"
  },
  answers: [
    {
      questionId: String,
      selected: [Number]
    }
  ],
  score: Number,
  total: Number
}, { timestamps: true });

module.exports = mongoose.model("Attempt", attemptSchema);