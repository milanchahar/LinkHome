import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Upload, MapPin, Wallet, Home, Phone, Beef, UserCheck } from "lucide-react";

const ListRoom = () => {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    area: "",
    price: "",
    isPureVeg: false,
    genderPref: "Any",
    imageUrl: "",
    phoneNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5001/api/listings", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Property listed successfully! 🏠");
      navigate("/browse");
    } catch (err) {
      toast.error("Failed to list room. Please ensure you're logged in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-900 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full glass-card p-12 rounded-[2.5rem] relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4">List Your <span className="text-gradient">Premium</span> Property</h2>
          <p className="text-white/40 text-sm italic">Showcase your space to the most discernable seekers.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Title</label>
            <div className="relative">
              <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="text"
                placeholder="e.g. Modern Penthouse with View"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 transition-all text-white"
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">City</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="text"
                  placeholder="Metropolis"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 transition-all text-white"
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Area</label>
              <input
                type="text"
                placeholder="Downtown"
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-500 transition-all text-white"
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Full Address</label>
            <input
              type="text"
              placeholder="e.g. Flat 402, Elite Heights, Sector 5..."
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-500 transition-all text-white"
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Monthly Rent</label>
              <div className="relative">
                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="number"
                  placeholder="15000"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 transition-all text-white"
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">WhatsApp</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="text"
                  placeholder="9876543210"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 transition-all text-white"
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Image URL</label>
            <div className="relative">
              <Upload className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 transition-all text-white"
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-8 py-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={(e) => setFormData({ ...formData, isPureVeg: e.target.checked })}
                />
                <div className="w-10 h-5 bg-white/10 rounded-full border border-white/10 peer-checked:bg-brand-600 transition-all" />
                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5" />
              </div>
              <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">Pure Veg Property</span>
            </label>

            <div className="flex items-center gap-3">
              <UserCheck className="text-brand-500" size={18} />
              <select
                className="bg-dark-800 border border-white/10 rounded-xl py-2 px-3 outline-none text-white text-xs font-bold"
                onChange={(e) => setFormData({ ...formData, genderPref: e.target.value })}
              >
                <option value="Any">All Invited</option>
                <option value="Male">Males Only</option>
                <option value="Female">Females Only</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-[1.5rem] font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-brand-600/20"
          >
            {loading ? "Submitting..." : "Publish Listing"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ListRoom;

