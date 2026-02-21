import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Save, ArrowLeft, Home, MapPin, Wallet, Phone, Upload } from "lucide-react";

const EditRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        city: "",
        area: "",
        price: "",
        isPureVeg: false,
        genderPref: "Any",
        imageUrl: "",
        phoneNumber: "",
    });

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/listings");
                const found = res.data.find(r => r.id === parseInt(id));
                if (found) {
                    setFormData({
                        title: found.title || "",
                        city: found.city || "",
                        area: found.area || "",
                        price: found.price || "",
                        isPureVeg: found.isPureVeg || false,
                        genderPref: found.genderPref || "Any",
                        imageUrl: found.imageUrl || "",
                        phoneNumber: found.phoneNumber || "",
                    });
                } else {
                    toast.error("Property not found.");
                    navigate("/my-listings");
                }
            } catch (err) {
                toast.error("Failed to load property details.");
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const token = localStorage.getItem("token");

        try {
            await axios.put(`http://localhost:5001/api/listings/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Listing updated successfully! ✨");
            navigate("/my-listings");
        } catch (err) {
            toast.error("Failed to update listing.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-900 flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full glass-card p-12 rounded-[2.5rem] relative"
            >
                <button
                    onClick={() => navigate(-1)}
                    className="absolute -top-12 left-0 flex items-center gap-2 text-white/40 hover:text-white transition-colors"
                >
                    <ArrowLeft size={18} /> Back
                </button>

                <div className="text-center mb-12">
                    <h2 className="text-4xl font-display font-bold mb-4">Edit <span className="text-gradient">Property</span></h2>
                    <p className="text-white/40 text-sm">Update your property details with ease.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Title</label>
                        <div className="relative">
                            <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                            <input
                                type="text"
                                value={formData.title}
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
                                    value={formData.city}
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
                                value={formData.area}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-500 transition-all text-white"
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Monthly Rent</label>
                            <div className="relative">
                                <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                <input
                                    type="number"
                                    value={formData.price}
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
                                    value={formData.phoneNumber}
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
                                value={formData.imageUrl}
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
                                    checked={formData.isPureVeg}
                                    onChange={(e) => setFormData({ ...formData, isPureVeg: e.target.checked })}
                                />
                                <div className="w-10 h-5 bg-white/10 rounded-full border border-white/10 peer-checked:bg-brand-600 transition-all" />
                                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5" />
                            </div>
                            <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">Pure Veg Property</span>
                        </label>

                        <div className="flex items-center gap-3">
                            <select
                                className="bg-dark-800 border border-white/10 rounded-xl py-2 px-3 outline-none text-white text-xs font-bold"
                                value={formData.genderPref}
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
                        disabled={saving}
                        className="w-full py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-[1.5rem] font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-brand-600/20"
                    >
                        <Save size={20} />
                        {saving ? "Saving Changes..." : "Update Listing"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default EditRoom;
