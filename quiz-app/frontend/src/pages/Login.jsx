import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {
    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("/auth/login", form);

            console.log("LOGIN SUCCESS:", res.data);

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");

        } catch (err) {
            console.log("LOGIN ERROR:", err.response?.data); // 🔥 DEBUG
            alert(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-purple-600 to-blue-500 fade-in">
            <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-xl w-80 text-white transition hover:scale-105">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <input
                    type="email"
                    autoComplete="off"
                    placeholder="Email"
                    className="w-full p-2 mb-3 rounded bg-white/30 outline-none"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    autoComplete="new-password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 rounded bg-white/30 outline-none"
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <form autoComplete="off"></form>

                <button
                    onClick={handleLogin}
                    className="w-full bg-white text-purple-600 py-2 rounded font-bold btn-press hover:bg-gray-200"
                >
                    Login
                </button>

                <p className="mt-4 text-center">
                    New user?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="underline cursor-pointer"
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;