const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz"
  },
  question: String,
  options: [String],
  correctAnswers: [Number], // index of correct options
  type: {
    type: String,
    enum: ["mcq", "multi", "truefalse"]
  }
});

module.exports = mongoose.model("Question", questionSchema);