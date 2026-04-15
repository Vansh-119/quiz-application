const express = require("express");
const router = express.Router();
const Question = require("../models/Question");


// 🔥 SHUFFLE FUNCTION (IMPORTANT)
function shuffleOptions(question) {
  const options = [...question.options];

  // Get correct option values
  const correctTexts = question.correctAnswers.map(
    (i) => options[i]
  );

  // Fisher-Yates shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  // Recalculate correct indexes
  const newCorrect = correctTexts.map((text) =>
    options.indexOf(text)
  );

  return {
    ...question._doc,
    options,
    correctAnswers: newCorrect,
  };
}


// ✅ CREATE QUESTION
router.post("/", async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ GET QUESTIONS (WITH RANDOMIZATION)
router.get("/:quizId", async (req, res) => {
  try {
    let questions = await Question.find({
      quizId: req.params.quizId,
    });

    // 🔥 Shuffle question order
    questions = questions.sort(() => Math.random() - 0.5);

    // 🔥 Shuffle options for each question
    const shuffledQuestions = questions.map((q) =>
      shuffleOptions(q)
    );

    res.json(shuffledQuestions);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;