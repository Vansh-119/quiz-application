import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/attempt/leaderboard").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] text-white">
      <Navbar />

      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">🏆 Leaderboard</h2>

        {users.map((u, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-lg p-4 mb-2 rounded-xl flex justify-between border border-white/10"
          >
            <span>{i + 1}. {u.userId?.name}</span>
            <span className="text-green-400">{u.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;