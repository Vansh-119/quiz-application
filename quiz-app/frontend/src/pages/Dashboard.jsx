import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/quiz").then(res => setQuizzes(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] text-white">
      <Navbar />

      <div className="p-6 grid md:grid-cols-3 gap-6">
        {quizzes.map(q => (
          <div
            key={q._id}
            className="bg-white/10 backdrop-blur-lg p-5 rounded-xl shadow-lg border border-white/10 hover:scale-105 transition"
          >
            <h2 className="text-xl font-bold text-purple-300">{q.title}</h2>
            <p className="text-gray-300">{q.category}</p>

            <button
              onClick={() => navigate(`/quiz/${q._id}`)}
              className="mt-4 w-full bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded"
            >
              Start Quiz 🚀
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;