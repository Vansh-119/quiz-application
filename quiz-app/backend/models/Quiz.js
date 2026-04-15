const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  difficulty: String,
  timeLimit: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Quiz", quizSchema);