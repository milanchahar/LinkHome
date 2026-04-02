import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Save, ArrowLeft, Home, MapPin, Wallet, Phone, Upload } from "lucide-react";
import { handleImageBatchUpload } from "../utils/imageUpload";
import { getPlaceholderImage } from "../utils/placeholders";

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
                const res = await api.get(`/api/listings/${id}`);
                const found = res.data;
                if (found) {
                    setFormData({
                        title: found.title || "",
                        city: found.city || "",
                        area: found.area || "",
                        price: found.price || "",
                        isPureVeg: found.isPureVeg || false,
                        genderPref: found.genderPref || "Any",
                        imageUrl: found.imageUrl || "",
                        images: Array.isArray(found.images) ? found.images : [],
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
                }
            } catch (err) {
                toast.error("Failed to load property details.");
                navigate("/my-listings");
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
    }, [id, navigate]);

    const handleImageUpload = async (e) => {
        setUploading(true);
        try {
            const updatedImages = await handleImageBatchUpload(e.target.files, formData.images);
            setFormData({
                ...formData,
                images: updatedImages,
                imageUrl: updatedImages[0] || ""
            });
            if (updatedImages.length > formData.images.length) {
                toast.success("Images uploaded! 📸");
            }
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

        try {
            await api.put(`/api/listings/${id}`, {
                ...formData,
                price: Number(formData.price)
            });
            toast.success("Listing updated successfully! ✨");
            navigate("/my-listings");
        } catch (err) {
            const errorMessage =
                err.response?.status === 413
                    ? "Images are too large. Please select fewer or smaller images."
                    : err.response?.data?.detail ||
                    err.response?.data?.error ||
                    err.message ||
                    "Failed to update listing. Please ensure you're logged in.";
            toast.error(errorMessage);
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
        <div className="min-h-screen bg-[#fbfbf9] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-black/5 border-t-black rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="pt-40 pb-24 px-6 min-h-screen bg-[#fbfbf9] flex flex-col items-center">
            <div className="max-w-4xl w-full mb-20 text-center space-y-6 relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-3 text-black/60 hover:text-black transition-all group"
                >
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                        <ArrowLeft size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">Back</span>
                </button>

                <div className="flex items-center justify-center gap-3">
                    <div className="h-[1px] w-12 bg-black/40" />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/80">The Update</span>
                    <div className="h-[1px] w-12 bg-black/40" />
                </div>
                <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter uppercase text-black">
                    Refine Your <br />
                    <span className="font-serif-accent italic font-light text-zinc-800 normal-case tracking-normal">Signature</span>
                </h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full bg-white border border-black/5 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-black/5"
            >
                <form onSubmit={handleSubmit} className="space-y-16">
                    {/* Photos */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-black">Property Imagery</label>
                            <span className="text-[9px] font-black uppercase tracking-widest text-black/40">{formData.images.length}/5 Uploaded</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {formData.images.map((img, index) => (
                                <div key={index} className="relative aspect-square rounded-[1.5rem] overflow-hidden border border-black/5 group">
                                    <img src={img} className="w-full h-full object-cover" alt="Property" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <span className="font-black">Delete</span>
                                    </button>
                                </div>
                            ))}
                            {formData.images.length < 5 && (
                                <label className="aspect-square rounded-[1.5rem] border-2 border-dashed border-black/20 hover:border-black/50 hover:bg-zinc-50 flex flex-col items-center justify-center cursor-pointer transition-all">
                                    <Upload className="text-black/40 mb-3" size={24} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-black/60">Add Photo</span>
                                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                                </label>
                            )}
                        </div>
                        {uploading && <p className="text-[10px] font-black uppercase tracking-widest text-black/60 animate-pulse">Uploading...</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {/* Basic Info */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60">Listing Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    placeholder="e.g. THE SKY PENTHOUSE"
                                    required
                                    className="w-full bg-transparent border-b-2 border-black/10 py-4 outline-none focus:border-black transition-all text-lg font-display font-black uppercase tracking-tight placeholder:text-black/30"
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60">Monthly Investment</label>
                                <div className="relative">
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xl font-display font-black">₹</span>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        placeholder="AMOUNT"
                                        required
                                        className="w-full bg-transparent border-b-2 border-black/10 py-4 pl-6 outline-none focus:border-black transition-all text-xl font-display font-black uppercase tracking-tight placeholder:text-black/30"
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60">City</label>
                                <input
                                    type="text"
                                    value={formData.city}
                                    placeholder="LOCATION"
                                    required
                                    className="w-full bg-transparent border-b-2 border-black/10 py-4 outline-none focus:border-black transition-all text-lg font-display font-black uppercase tracking-tight placeholder:text-black/30"
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60">Neighborhood / Area</label>
                                <input
                                    type="text"
                                    value={formData.area}
                                    placeholder="DISTRICT"
                                    className="w-full bg-transparent border-b-2 border-black/10 py-4 outline-none focus:border-black transition-all text-lg font-display font-black uppercase tracking-tight placeholder:text-black/30"
                                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60">Property Narrative</label>
                                <textarea
                                    value={formData.description}
                                    placeholder="DESCRIBE THE EXPERIENCE..."
                                    rows={4}
                                    className="w-full bg-[#fbfbf9] border border-black/10 rounded-[2rem] p-6 outline-none focus:border-black transition-all text-sm font-medium leading-relaxed resize-none placeholder:text-black/30"
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4 pt-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60">Contact Channel</label>
                                <div className="relative">
                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-black/40" size={16} />
                                    <input
                                        type="text"
                                        value={formData.phoneNumber}
                                        placeholder="WHATSAPP NUMBER"
                                        className="w-full bg-[#fbfbf9] border border-black/10 rounded-full py-4 pl-16 pr-6 outline-none focus:border-black transition-all text-xs font-black uppercase tracking-widest placeholder:text-black/30"
                                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-black text-white p-6 rounded-3xl">
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Gender Preference</h4>
                                    <p className="text-[8px] uppercase tracking-widest text-white/40">Select your ideal host</p>
                                </div>
                                <select
                                    className="bg-white/10 border border-white/10 rounded-full py-2 px-6 outline-none text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-white/20 transition-all"
                                    value={formData.genderPref}
                                    onChange={(e) => setFormData({ ...formData, genderPref: e.target.value })}
                                >
                                    <option value="Any" className="text-black">Any</option>
                                    <option value="Male" className="text-black">Male</option>
                                    <option value="Female" className="text-black">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Amenities Grid */}
                    <div className="space-y-8 pt-8">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-black">Curated Amenities</label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {amenitiesList.map((item) => (
                                <label key={item.id} className="flex items-center gap-4 p-5 bg-[#fbfbf9] border border-black/10 rounded-2xl cursor-pointer hover:bg-black hover:text-white has-[:checked]:bg-black has-[:checked]:text-white transition-all group">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData[item.id]}
                                        onChange={(e) => setFormData({ ...formData, [item.id]: e.target.checked })}
                                    />
                                    <div className="w-5 h-5 rounded-full border border-black/20 peer-checked:bg-white peer-checked:border-white transition-all flex items-center justify-center">
                                        <div className="w-2 h-2 bg-black rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pt-12 flex flex-col md:flex-row items-center gap-8">
                        <label className="flex items-center gap-4 cursor-pointer group bg-[#fbfbf9] border border-black/10 rounded-full px-8 py-4 transition-all hover:border-black/30">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={formData.isPureVeg}
                                    onChange={(e) => setFormData({ ...formData, isPureVeg: e.target.checked })}
                                />
                                <div className="w-10 h-5 bg-black/10 rounded-full border border-black/10 peer-checked:bg-black transition-all" />
                                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-black/60 peer-checked:text-black">Pure Veg Selection</span>
                        </label>

                        <button
                            type="submit"
                            disabled={saving || uploading}
                            className="flex-1 w-full md:w-auto py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 shadow-2xl shadow-black/10"
                        >
                            {saving ? "Registering Changes..." : "Update Signature Listing"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditRoom;
