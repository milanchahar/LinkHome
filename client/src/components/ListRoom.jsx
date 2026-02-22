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
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

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
        data.append("upload_preset", "ml_default"); // User might need to change this
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
        imageUrl: uploadedImages[0] || "" // Set first image as primary
      });
      toast.success("Images uploaded! 📸");
    } catch (err) {
      toast.error("Upload failed. Please try again.");
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
    if (!formData.title || !formData.city || !formData.price) {
      toast.error("Title, City, and Price are mandatory!");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5001/api/listings", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Property listed successfully! 🏠");
      navigate("/browse");
    } catch (err) {
      const errorMessage = err.response?.data?.detail || err.response?.data?.error || "Failed to list room. Please ensure you're logged in.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const amenities = [
    { id: "hasWifi", label: "WiFi", icon: "🌐" },
    { id: "hasParking", label: "Parking", icon: "🚗" },
    { id: "hasGym", label: "Gym", icon: "🏋️" },
    { id: "hasPool", label: "Pool", icon: "🏊" },
    { id: "hasAC", label: "AC", icon: "❄️" },
    { id: "hasLaundry", label: "Laundry", icon: "🧺" },
    { id: "hasBalcony", label: "Balcony", icon: "🌅" },
    { id: "isFurnished", label: "Furnished", icon: "🛋️" },
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-900 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full glass-card p-8 md:p-12 rounded-[2.5rem] relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4">List Your <span className="text-gradient">Premium</span> Property</h2>
          <p className="text-white/40 text-sm italic">Showcase your space to the most discernable seekers.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Title *</label>
              <div className="relative">
                <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="text"
                  placeholder="e.g. Modern Penthouse"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 transition-all text-white"
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Monthly Rent *</label>
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
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">City *</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input
                  type="text"
                  placeholder="City Name"
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
                placeholder="Locality"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-500 transition-all text-white"
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Full Address</label>
            <input
              type="text"
              placeholder="Detailed Address"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-500 transition-all text-white"
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Description</label>
            <textarea
              placeholder="Tell us about your property..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-brand-500 transition-all text-white resize-none"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Photos */}
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
                  <span className="text-[10px] font-bold text-white/40">Upload</span>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploading} />
                </label>
              )}
            </div>
            {uploading && <p className="text-xs text-brand-500 animate-pulse">Uploading images...</p>}
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-brand-500 ml-1">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {amenities.map((item) => (
                <label key={item.id} className="flex items-center gap-3 p-4 bg-white/3 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 transition-all group">
                  <input
                    type="checkbox"
                    className="sr-only peer"
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

          {/* Preferences */}
          <div className="flex flex-wrap items-center gap-8 py-4 bg-white/3 p-6 rounded-3xl border border-white/5">
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
                  placeholder="WhatsApp Number"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 transition-all text-white text-sm"
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
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
