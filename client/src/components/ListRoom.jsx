import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Upload, MapPin, Wallet, Home, Phone, Beef, UserCheck } from "lucide-react";
import { handleImageBatchUpload } from "../utils/imageUpload";

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
    if (!formData.title || !formData.city || !formData.price) {
      toast.error("Title, City, and Price are mandatory!");
      return;
    }

    setLoading(true);

    try {
      await api.post(`/api/listings`, {
        ...formData,
        price: Number(formData.price)
      });
      toast.success("Property listed successfully! 🏠");
      navigate("/browse");
    } catch (err) {
      const errorMessage =
        err.response?.status === 413
          ? "Images are too large. Please select fewer or smaller images."
          : err.response?.data?.detail ||
          err.response?.data?.error ||
          err.message ||
          "Failed to list room. Please ensure you're logged in.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const amenities = [
    { id: "hasWifi", label: "WiFi", icon: "" },
    { id: "hasParking", label: "Parking", icon: "" },
    { id: "hasGym", label: "Gym", icon: "" },
    { id: "hasPool", label: "Pool", icon: "" },
    { id: "hasAC", label: "AC", icon: "" },
    { id: "hasLaundry", label: "Laundry", icon: "" },
    { id: "hasBalcony", label: "Balcony", icon: "" },
    { id: "isFurnished", label: "Furnished", icon: "" },
  ];

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen bg-[#fbfbf9] flex flex-col items-center">
      <div className="max-w-4xl w-full mb-20 text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-black/40" />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/80">The Curator</span>
          <div className="h-[1px] w-12 bg-black/40" />
        </div>
        <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter uppercase text-black">
          List Your <br />
          <span className="font-serif-accent italic font-light text-zinc-500 normal-case tracking-normal">Signature</span> Property
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white border border-black/5 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-black/5"
      >
        <form onSubmit={handleSubmit} className="space-y-16">
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
            {uploading && <p className="text-[10px] font-black uppercase tracking-widest text-black/40 animate-pulse">Uploading to vault...</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60">Listing Title</label>
                <input
                  type="text"
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
                  placeholder="DISTRICT"
                  className="w-full bg-transparent border-b-2 border-black/10 py-4 outline-none focus:border-black transition-all text-lg font-display font-black uppercase tracking-tight placeholder:text-black/30"
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60">Property Narrative</label>
                <textarea
                  placeholder="DESCRIBE THE EXPERIENCE..."
                  rows={4}
                  className="w-full bg-zinc-50 border border-black/10 rounded-[2rem] p-6 outline-none focus:border-black transition-all text-sm font-medium leading-relaxed resize-none placeholder:text-black/30"
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-4 pt-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60">Contact Channel</label>
                <div className="relative">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-black/40" size={16} />
                  <input
                    type="text"
                    placeholder="WHATSAPP NUMBER"
                    className="w-full bg-zinc-50 border border-black/10 rounded-full py-4 pl-16 pr-6 outline-none focus:border-black transition-all text-xs font-black uppercase tracking-widest placeholder:text-black/30"
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between bg-black text-white p-6 rounded-3xl">
                <div className="space-y-1">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Gender Preference</h4>
                  <p className="text-[8px] uppercase tracking-widest text-white/60">Select your ideal host</p>
                </div>
                <select
                  className="bg-white/10 border border-white/10 rounded-full py-2 px-6 outline-none text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-white/20 transition-all"
                  onChange={(e) => setFormData({ ...formData, genderPref: e.target.value })}
                >
                  <option value="Any" className="text-black">Any</option>
                  <option value="Male" className="text-black">Male</option>
                  <option value="Female" className="text-black">Female</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-8 pt-8">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-black">Curated Amenities</label>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {amenities.map((item) => (
                <label key={item.id} className="flex items-center gap-4 p-5 bg-[#fbfbf9] border border-black/5 rounded-2xl cursor-pointer hover:bg-black hover:text-white has-[:checked]:bg-black has-[:checked]:text-white transition-all group">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={(e) => setFormData({ ...formData, [item.id]: e.target.checked })}
                  />
                  <div className="w-5 h-5 rounded-full border border-black/10 peer-checked:bg-white peer-checked:border-white transition-all flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-12 flex flex-col md:flex-row items-center gap-8">
            <label className="flex items-center gap-4 cursor-pointer group bg-[#fbfbf9] border border-black/5 rounded-full px-8 py-4 transition-all hover:border-black/20">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={(e) => setFormData({ ...formData, isPureVeg: e.target.checked })}
                />
                <div className="w-10 h-5 bg-black/10 rounded-full border border-black/5 peer-checked:bg-black transition-all" />
                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-black/60 peer-checked:text-black">Pure Veg Selection</span>
            </label>

            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 w-full md:w-auto py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50 shadow-2xl shadow-black/10"
            >
              {loading ? "Registering Property..." : "Publish Signature Listing"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ListRoom;
