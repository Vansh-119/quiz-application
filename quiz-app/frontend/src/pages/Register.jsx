import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 fade-in">
      
      <form
        onSubmit={handleRegister}
        autoComplete="off"
        className="bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-xl w-80 text-white transition hover:scale-105"
      >
        <h2 className="text-2xl mb-4 text-center font-bold">Register</h2>

        {/* Hidden inputs to prevent autofill */}
        <input type="text" name="fakeuser" style={{ display: "none" }} />
        <input type="password" name="fakepass" style={{ display: "none" }} />

        <input
          type="text"
          placeholder="Name"
          autoComplete="off"
          className="w-full p-2 mb-2 rounded bg-white/30 outline-none"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          autoComplete="new-email"
          className="w-full p-2 mb-2 rounded bg-white/30 outline-none"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          className="w-full p-2 mb-4 rounded bg-white/30 outline-none"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-white text-purple-600 py-2 rounded font-bold btn-press hover:bg-gray-200 transition"
        >
          Register
        </button>

        {/* ✅ ADDED BACK LOGIN LINK */}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="underline cursor-pointer hover:text-gray-200"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;