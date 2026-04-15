const Quiz = require("../models/Quiz");

// Create Quiz
exports.createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    const filteredQuizzes = quizzes.filter(quiz =>
      quiz.title && quiz.title.toString().trim() &&
      quiz.category && quiz.category.toString().trim()
    );
    const uniqueQuizzes = filteredQuizzes.filter((quiz, index, self) =>
      self.findIndex(q =>
        q.title.toString().trim() === quiz.title.toString().trim() &&
        q.category.toString().trim() === quiz.category.toString().trim()
      ) === index
    );
    res.json(uniqueQuizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};