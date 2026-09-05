import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import API_BASE_URL from "../api/config";
import logoImg from "../assets/pragya-logo.png";

function AdminLogin() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setErrorMessage("");
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!loginData.email.trim() || !loginData.password) {
            toast.error("Please enter both email and password");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${API_BASE_URL}/api/admin/login`, {
                email: loginData.email.trim(),
                password: loginData.password
            });

            const data = res.data;
            const token = data?.token || (typeof data === "string" ? data : "");

            if (!token) {
                throw new Error("No authentication token received");
            }

            localStorage.setItem("adminToken", token);
            if (data?.username || data?.email) {
                localStorage.setItem("adminUser", JSON.stringify({
                    email: data.email,
                    username: data.username,
                    role: data.role
                }));
            }

            toast.success("Login successful! Welcome back.");
            navigate("/admin/dashboard");
        } catch (err) {
            console.error("Login Error:", err);
            const msg = err.response?.data?.message || "Invalid email or password";
            setErrorMessage(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,163,23,0.12),_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(27,79,114,0.35),_transparent_55%)]" />

            <div className="relative w-full max-w-md">
                <div className="text-center mb-6">
                    <Link to="/" className="inline-flex flex-col items-center gap-2">
                        <img
                            src={logoImg}
                            alt="Pragya Shipping and Logistics Logo"
                            className="h-16 w-auto object-contain drop-shadow-md"
                        />
                        <div className="flex flex-col leading-tight text-center">
                            <span className="font-display text-base sm:text-lg font-bold text-signal">
                                Pragya Shipping and Logistics
                            </span>
                            <span className="text-xs font-semibold tracking-wider text-orange-400">
                                International Freight Forwarders
                            </span>
                            <span className="text-xs font-semibold text-orange-400">
                                प्रज्ञा शिपिंग आणि लॉजिस्टिक्स
                            </span>
                        </div>
                    </Link>
                    <div className="flex items-center justify-center gap-1.5 mt-2 text-white/60 text-xs tracking-wide uppercase font-semibold">
                        <svg className="w-3.5 h-3.5 text-signal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Secure Admin Portal</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white text-slate-900 p-8 md:p-10 shadow-2xl space-y-5 rounded-2xl border border-slate-100">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-slate-900">Sign in</h1>
                        <p className="text-slate-500 text-xs mt-1 font-medium">Enter your authorized administrator credentials</p>
                    </div>

                    {errorMessage && (
                        <div className="p-3 text-xs bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start gap-2 rounded-r">
                            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="admin@pragyashipping.com"
                            value={loginData.email}
                            onChange={handleChange}
                            className="input-field"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                value={loginData.password}
                                onChange={handleChange}
                                className="input-field pr-10"
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 focus:outline-none"
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 !py-3 font-bold"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-[#0a1628]" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                                <span>Authenticating...</span>
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <Link to="/" className="hover:text-slate-900 font-semibold transition">
                            ← Back to website
                        </Link>
                        <span className="text-[11px] text-slate-400 font-medium">Protected by Rate-Limiting</span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
