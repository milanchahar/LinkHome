import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, formData);

      if (res.data.token && res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        toast.success(`Account created successfully! Welcome, ${res.data.user.name}! 🎉`);
        window.location.href = "/";
      } else {
        toast.success("Account created successfully! 🎉");
        navigate("/login");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || (err.request ? "Cannot connect to server. Please ensure the backend is running." : "Signup failed. Please try again.");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#fbfbf9] flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white border border-black/5 shadow-2xl rounded-[2.5rem] p-10 relative"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-black/5">
            <UserPlus className="text-black" size={32} />
          </div>
          <h2 className="text-3xl font-display font-black mb-2 uppercase tracking-tight text-black">Create Account</h2>
          <p className="text-zinc-500 text-sm font-medium">Join the elite community of HomeLink.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
              <input
                type="text"
                placeholder="John Doe"
                required
                className="w-full bg-zinc-50 border border-black/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-black font-medium placeholder:text-black/20"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
              <input
                type="email"
                placeholder="name@example.com"
                required
                className="w-full bg-zinc-50 border border-black/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-black font-medium placeholder:text-black/20"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full bg-zinc-50 border border-black/5 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all text-black font-medium placeholder:text-black/20"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black hover:bg-zinc-800 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group shadow-xl shadow-black/10"
          >
            {loading ? "Creating Account..." : "Join HomeLink"}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
            Already have an account?{" "}
            <Link to="/login" className="text-black font-black hover:underline underline-offset-8">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;

