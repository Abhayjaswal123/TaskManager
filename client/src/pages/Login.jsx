import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login } from "../api/api.auth";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, AlertCircle } from "../components/icons";

const inputClass = `w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-white placeholder-[#4a5a72]
    bg-white/[0.05] border border-white/[0.08]
    focus:outline-none focus:border-[#00FFC6]/40 focus:bg-white/[0.07]
    transition-all duration-200`;

const Login = () => {
    const navigate = useNavigate();
    const { login: authLogin } = useContext(AuthContext);

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await login(form);
            if (res?.accessToken) {
                authLogin(res);
                navigate("/dashboard");
            } else {
                setError(res?.message || "Login failed.");
            }
        } catch {
            setError("Invalid credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050818] relative overflow-hidden px-4">

            {/* Orbs */}
            <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,255,198,0.12), transparent 70%)", filter: "blur(80px)" }} />
            <div className="absolute bottom-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,184,255,0.10), transparent 70%)", filter: "blur(80px)" }} />

            {/* Grid */}
            <div className="fixed inset-0 pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(rgba(0,255,198,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,198,0.025) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }} />

            {/* Card */}
            <div className="relative w-full max-w-sm z-10">

                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#00FFC6] to-[#00B8FF] bg-clip-text text-transparent">
                        TaskFlow
                    </h1>
                    <p className="text-[#4a5a72] text-xs mt-1 tracking-wide">Smart task management</p>
                </div>

                <div className="p-7 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl
                    shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

                    <h2 className="text-white text-lg font-semibold mb-1">Welcome back</h2>
                    <p className="text-[#4a5a72] text-sm mb-6">Sign in to your account to continue</p>

                    {/* Error */}
                    {error && (
                        <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 mb-5">
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <p className="text-red-400 text-xs">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Email */}
                        <div>
                            <label className="text-xs font-medium text-[#7a8ba6] mb-1.5 block">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5a72]" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs font-medium text-[#7a8ba6] mb-1.5 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4a5a72]" />
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 w-full py-2.5 mt-1 rounded-lg
                            font-semibold text-sm text-[#050818] cursor-pointer
                            bg-gradient-to-r from-[#00FFC6] to-[#00B8FF]
                            hover:opacity-90 active:scale-[0.98]
                            disabled:opacity-50 disabled:cursor-not-allowed
                            transition-all duration-200 shadow-[0_0_20px_rgba(0,255,198,0.2)]"
                        >
                            {loading ? "Signing in..." : (<>Sign In <ArrowRight className="w-4 h-4" /></>)}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-white/[0.06]" />
                        <span className="text-[#4a5a72] text-xs">or</span>
                        <div className="flex-1 h-px bg-white/[0.06]" />
                    </div>

                    <p className="text-[#4a5a72] text-sm text-center">
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-[#00FFC6] cursor-pointer hover:underline font-medium"
                        >
                            Create one
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;