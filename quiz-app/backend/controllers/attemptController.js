const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const User = require("../models/User");

// ✅ Submit Attempt
exports.submitAttempt = async (req, res) => {
  try {
    console.log("🔥 API HIT:", req.body);

    const userId = req.user.id; // 🔥 from token
    const { quizId, answers } = req.body;

    if (!quizId || !answers) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const questions = await Question.find({ quizId });

    let score = 0;

    questions.forEach((q) => {
      const userAns = answers.find(
        (a) => a.questionId === q._id.toString()
      );

      if (userAns) {
        const correct = [...q.correctAnswers].sort();
        const selected = [...userAns.selected].sort();

        if (JSON.stringify(correct) === JSON.stringify(selected)) {
          score++;
        }
      }
    });

    await Attempt.create({
      userId,
      quizId,
      answers,
      score,
      total: questions.length,
    });

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 🔥 Points
    user.points = (user.points || 0) + score;

    // 🔥 Streak
    const today = new Date().toDateString();
    const last = user.lastAttemptDate
      ? new Date(user.lastAttemptDate).toDateString()
      : null;

    if (last !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (last === yesterday.toDateString()) {
        user.streak = (user.streak || 0) + 1;
      } else {
        user.streak = 1;
      }

      user.lastAttemptDate = new Date();
    }

    await user.save();

    res.json({
      message: "Quiz submitted",
      score,
      total: questions.length,
      points: user.points,
      streak: user.streak,
    });

  } catch (err) {
    console.error("🔥 ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🏆 Leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Attempt.find()
      .sort({ score: -1 })
      .limit(10)
      .populate("userId", "name email"); // ✅ FIX

    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.params.userId;

    const attempts = await Attempt.find({ userId });

    const totalQuizzes = attempts.length;
    const totalScore = attempts.reduce((sum, a) => sum + a.score, 0);
    const totalQuestions = attempts.reduce((sum, a) => sum + a.total, 0);

    res.json({
      totalQuizzes,
      totalScore,
      totalQuestions,
      averageScore: totalQuizzes
        ? totalScore / totalQuizzes
        : 0,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};