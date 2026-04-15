const router = require("express").Router();
const { createQuiz, getQuizzes } = require("../controllers/quizController");

router.post("/", createQuiz);
router.get("/", getQuizzes);

module.exports = router;