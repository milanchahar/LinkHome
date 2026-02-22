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
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        city: "",
        area: "",
        price: "",
        isPureVeg: false,
        genderPref: "Any",
        imageUrl: "",
        images: [],
        phoneNumber: "",
        address: "",
        description: "",
        hasWifi: false,
        hasParking: false,
        hasGym: false,
        hasPool: false,
        hasAC: false,
        hasLaundry: false,
        hasBalcony: false,
        isFurnished: false,
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
                        images: found.images || [],
                        phoneNumber: found.phoneNumber || "",
                        address: found.address || "",
                        description: found.description || "",
                        hasWifi: found.hasWifi || false,
                        hasParking: found.hasParking || false,
                        hasGym: found.hasGym || false,
                        hasPool: found.hasPool || false,
                        hasAC: found.hasAC || false,
                        hasLaundry: found.hasLaundry || false,
                        hasBalcony: found.hasBalcony || false,
                        isFurnished: found.isFurnished || false,
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

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length + formData.images.length > 5) {
            toast.error("Maximum 5 images allowed");
            return;
        }

        setUploading(true);
        const uploadedImages = [...formData.images];

        try {
            for (const file of files) {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "ml_default");
                data.append("cloud_name", "dqs5rvi8b");

                const res = await axios.post(
                    "https://api.cloudinary.com/v1_1/dqs5rvi8b/image/upload",
                    data
                );
                uploadedImages.push(res.data.secure_url);
            }
            setFormData({
                ...formData,
                images: uploadedImages,
                imageUrl: uploadedImages[0] || ""
            });
            toast.success("Images uploaded! 📸");
        } catch (err) {
            toast.error("Upload failed.");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            images: newImages,
            imageUrl: newImages[0] || ""
        });
    };

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

    const amenitiesList = [
        { id: "hasWifi", label: "WiFi", icon: "🌐" },
        { id: "hasParking", label: "Parking", icon: "🚗" },
        { id: "hasGym", label: "Gym", icon: "🏋️" },
        { id: "hasPool", label: "Pool", icon: "🏊" },
        { id: "hasAC", label: "AC", icon: "❄️" },
        { id: "hasLaundry", label: "Laundry", icon: "🧺" },
        { id: "hasBalcony", label: "Balcony", icon: "🌅" },
        { id: "isFurnished", label: "Furnished", icon: "🛋️" },
    ];

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
                className="max-w-3xl w-full glass-card p-8 md:p-12 rounded-[2.5rem] relative"
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

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-500 transition-all text-white"
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Full Address</label>
                        <input
                            type="text"
                            value={formData.address}
                            placeholder="Detailed Address"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-500 transition-all text-white"
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Description</label>
                        <textarea
                            value={formData.description}
                            placeholder="Tell us about the property..."
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-500 transition-all text-white resize-none"
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Property Photos (Up to 5)</label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {formData.images.map((img, index) => (
                                <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                                    <img src={img} className="w-full h-full object-cover" alt="Property" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            {formData.images.length < 5 && (
                                <label className="aspect-square rounded-xl border-2 border-dashed border-white/10 hover:border-brand-500/50 flex flex-col items-center justify-center cursor-pointer transition-all bg-white/3">
                                    <Upload className="text-white/20 mb-2" size={24} />
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                                </label>
                            )}
                        </div>
                        {uploading && <p className="text-xs text-brand-500 animate-pulse">Uploading...</p>}
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Amenities</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {amenitiesList.map((item) => (
                                <label key={item.id} className="flex items-center gap-3 p-4 bg-white/3 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 transition-all group">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData[item.id]}
                                        onChange={(e) => setFormData({ ...formData, [item.id]: e.target.checked })}
                                    />
                                    <div className="w-5 h-5 border-2 border-white/20 rounded-md peer-checked:bg-brand-600 peer-checked:border-brand-600 transition-all flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">
                                        {item.icon} {item.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 py-4 bg-white/3 p-6 rounded-3xl border border-white/5">
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
                            <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">Pure Veg</span>
                        </label>

                        <div className="flex items-center gap-3">
                            <select
                                className="bg-dark-800 border border-white/10 rounded-xl py-2 px-3 outline-none text-white text-xs font-bold"
                                value={formData.genderPref}
                                onChange={(e) => setFormData({ ...formData, genderPref: e.target.value })}
                            >
                                <option value="Any">All Genders</option>
                                <option value="Male">Males Only</option>
                                <option value="Female">Females Only</option>
                            </select>
                        </div>

                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                <input
                                    type="text"
                                    value={formData.phoneNumber}
                                    placeholder="WhatsApp"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 transition-all text-white text-sm"
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={saving || uploading}
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
