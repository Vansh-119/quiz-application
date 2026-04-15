import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-white/10 backdrop-blur-md shadow-lg p-4 flex justify-between items-center sticky top-0 z-50 border-b border-white/10">
      <h1 className="text-xl font-bold text-purple-400">QuizApp 🚀</h1>

      <div className="space-x-6">
        <Link to="/dashboard" className="hover:text-purple-400 transition">
          Dashboard
        </Link>
        <Link to="/leaderboard" className="hover:text-purple-400 transition">
          Leaderboard
        </Link>
        <Link to="/stats" className="hover:text-purple-400 transition">
          Stats
        </Link>

        <button
          onClick={logout}
          className="bg-red-500/80 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;