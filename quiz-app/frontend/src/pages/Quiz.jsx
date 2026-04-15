import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";

function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(60);

  useEffect(() => {
    API.get(`/questions/${id}`).then(res => setQuestions(res.data));
  }, [id]);

  useEffect(() => {
    if (time <= 0) submit();

    const t = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(t);
  }, [time]);

  const select = (qId, i) => {
    setAnswers({ ...answers, [qId]: [i] });
  };

  const submit = async () => {
    const formatted = Object.keys(answers).map(qId => ({
      questionId: qId,
      selected: answers[qId]
    }));

    const res = await API.post("/attempt/submit", {
      quizId: id,
      answers: formatted
    });

    navigate("/result", { state: res.data });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#312e81] text-white">
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-xl mb-4 text-purple-400">⏱ {time}s</h2>

        {questions.map((q, i) => (
          <div
            key={q._id}
            className="bg-white/10 backdrop-blur-lg p-4 mb-4 rounded-xl border border-white/10"
          >
            <h3 className="font-semibold">{i + 1}. {q.question}</h3>

            {q.options.map((opt, idx) => (
              <label key={idx} className="block mt-2 cursor-pointer hover:text-purple-300">
                <input type="radio" name={q._id} onChange={() => select(q._id, idx)} />
                {opt}
              </label>
            ))}
          </div>
        ))}

        <button
          onClick={submit}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Quiz;