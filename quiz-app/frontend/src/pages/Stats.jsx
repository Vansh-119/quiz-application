import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Stats() {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalScore: 0,
    totalQuestions: 0,
    averageScore: 0
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;

    API.get(`/attempt/stats/${userId}`)
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] text-white">
      <Navbar />

      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">📊 Your Stats</h2>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10">
          <p>Total Quizzes: <span className="text-purple-300">{stats.totalQuizzes}</span></p>
          <p>Total Score: <span className="text-green-400">{stats.totalScore}</span></p>
          <p>Total Questions: <span className="text-blue-400">{stats.totalQuestions}</span></p>
          <p>Average Score: <span className="text-pink-400">{stats.averageScore?.toFixed(2)}</span></p>
        </div>
      </div>
    </div>
  );
}

export default Stats;