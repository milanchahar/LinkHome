import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", formData);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      window.location.href = "/";
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-900 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-10 rounded-[2.5rem] relative"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-600/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-500/20">
            <LogIn className="text-brand-500" size={32} />
          </div>
          <h2 className="text-3xl font-display font-bold mb-2">Welcome Back</h2>
          <p className="text-white/40 text-sm">Enter your credentials to access HomeLink.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="email"
                placeholder="name@example.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 transition-all text-white"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 transition-all text-white"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group shadow-lg shadow-brand-600/20"
          >
            {loading ? "Authenticating..." : "Login to Account"}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-white/40 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-brand-500 font-bold hover:underline underline-offset-4">
              Join HomeLink
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

