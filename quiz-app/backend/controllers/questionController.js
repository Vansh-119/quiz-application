const Question = require("../models/Question");

// Add question
exports.addQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get questions by quiz
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ quizId: req.params.quizId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};