import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen fade-in">
      <Navbar />

      <div className="flex justify-center items-center h-[80vh]">
        <div className="bg-white p-8 rounded-xl shadow text-center hover:scale-105 transition">
          <h2 className="text-2xl mb-4">🎉 Result</h2>
          <p>Score: {state?.score} / {state?.total}</p>

          <button onClick={() => navigate("/dashboard")}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded btn-press">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;