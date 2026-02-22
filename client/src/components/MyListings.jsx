import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Trash2, Home, Plus, ExternalLink, ShieldCheck, Shield, Edit2, X, PlusCircle, MessageSquare, Save, ArrowLeft, Wallet, Phone, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BrowseSkeleton } from "./ListingSkeleton";
import { getPlaceholderImage } from "../utils/placeholders";

const MyListings = () => {
  const [myRooms, setMyRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchMyRooms = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings`);
        const filtered = res.data.filter(
          (room) => Number(room.ownerId) === Number(user.id)
        );
        setMyRooms(filtered);
      } catch (err) {
        toast.error("Failed to load your listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyRooms();
  }, [user.id]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this listing?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyRooms(myRooms.filter((room) => room.id !== id));
      toast.success("Listing removed successfully.");
    } catch (err) {
      toast.error("Error deleting listing.");
    }
  };

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-black/20" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/60">Your Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter uppercase text-black">
              Property <br />
              <span className="font-serif-accent italic font-light text-zinc-500 normal-case tracking-normal">Management</span>
            </h1>
          </div>
          <Link
            to="/list-room"
            className="flex items-center gap-4 px-10 py-5 bg-black text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] transition-all hover:bg-zinc-800 active:scale-95 shadow-2xl shadow-black/10"
          >
            <Plus size={16} strokeWidth={3} />
            Add New Property
          </Link>
        </div>

        {loading ? (
          <div className="py-32 flex justify-center">
            <div className="w-12 h-12 border-4 border-black/5 border-t-black rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-12">
            {myRooms.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-32 bg-white border border-black/5 rounded-[3rem] text-center shadow-2xl shadow-black/5"
              >
                <div className="w-24 h-24 bg-[#fbfbf9] rounded-full flex items-center justify-center mx-auto mb-10 border border-black/5">
                  <Home size={32} className="text-black/10" />
                </div>
                <h3 className="text-3xl font-display font-black mb-4 uppercase tracking-tighter">No active listings</h3>
                <p className="text-zinc-500 mb-12 max-w-sm mx-auto text-[11px] font-black uppercase tracking-widest leading-relaxed">
                  You haven't shared any properties with the community yet.
                  Start listing to reach seekers.
                </p>
                <Link
                  to="/list-room"
                  className="pill-button mx-auto justify-center bg-black text-white"
                >
                  List your first property
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence>
                  {myRooms.map((room, i) => (
                    <motion.div
                      key={room.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.1 }}
                      className="nama-card p-4 group bg-white border border-black/5"
                    >
                      <div className="aspect-[4/5] relative overflow-hidden rounded-[2rem]">
                        <img
                          src={room.imageUrl || (room.images && room.images[0]) || getPlaceholderImage(room.id)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                          alt={room.title}
                        />
                        <div className="absolute top-6 left-6">
                          <div className="px-4 py-2 bg-white/90 backdrop-blur-md border border-black/5 rounded-full text-[9px] font-black text-black uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck size={12} className="text-zinc-500" />
                            Active Listing
                          </div>
                        </div>
                      </div>

                      <div className="px-2 pt-6 pb-2">
                        <div className="flex items-center gap-2 text-zinc-500 mb-2">
                          <MapPin size={12} />
                          <span className="text-[10px] uppercase font-black tracking-[0.2em]">{room.area}, {room.city}</span>
                        </div>
                        <h3 className="text-xl font-display font-black mb-6 line-clamp-1 uppercase tracking-tight text-black">{room.title}</h3>

                        <div className="flex items-center justify-between gap-4 py-6 border-y border-black/5">
                          <div className="flex items-center gap-2">
                            <MessageSquare size={12} className="text-zinc-400" />
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{(room.id * 7) % 15} Inquiries</span>
                          </div>

                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${room.id % 2 === 0 ? 'bg-zinc-100 border-black/5 text-black' : 'bg-black text-white border-black'}`}>
                            <span className="text-[8px] font-black uppercase tracking-widest">{room.id % 2 === 0 ? 'Verified' : 'Pending'}</span>
                          </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                          <Link
                            to="/messages"
                            className="flex-1 py-4 bg-[#fbfbf9] border border-black/5 rounded-full text-center text-[9px] font-black transition-all uppercase tracking-[0.2em] text-black/60 hover:bg-black hover:text-white"
                          >
                            Inquiries
                          </Link>
                          <div className="flex gap-2">
                            <Link
                              to={`/edit-room/${room.id}`}
                              className="w-12 h-12 flex items-center justify-center bg-[#fbfbf9] border border-black/5 rounded-full text-black/40 hover:text-black hover:border-black/20 transition-all"
                            >
                              <Edit2 size={16} />
                            </Link>
                            <button
                              onClick={() => handleDelete(room.id)}
                              className="w-12 h-12 flex items-center justify-center bg-red-50 hover:bg-red-500 hover:text-white text-red-400 rounded-full border border-red-100 transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isVerifyModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="w-full max-w-lg bg-white border border-black/5 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setIsVerifyModalOpen(null)}
                className="absolute top-8 right-8 text-black/20 hover:text-black transition-colors p-2"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 bg-black rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-black/10">
                  <ShieldCheck size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-black text-black uppercase tracking-tight">Identity</h3>
                  <p className="text-[10px] text-black/40 font-black uppercase tracking-widest mt-1">Verification Status</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-10 border-2 border-dashed border-black/10 rounded-[2rem] bg-zinc-50 text-center group hover:border-black/30 transition-all cursor-pointer">
                  <div className="w-14 h-14 bg-white rounded-full border border-black/5 flex items-center justify-center mx-auto mb-6 text-black/20 group-hover:text-black group-hover:scale-110 transition-all">
                    <PlusCircle size={28} />
                  </div>
                  <p className="text-sm font-black text-black mb-2 uppercase tracking-widest">Ownership Records</p>
                  <p className="text-[10px] text-black/40 uppercase tracking-[0.2em] font-medium leading-relaxed">PDF or Image (Max 15MB)</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-50 border border-black/5 rounded-2xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-black mb-2" />
                    <p className="text-[10px] font-black text-black/60 uppercase tracking-widest">Visibility +70%</p>
                  </div>
                  <div className="p-4 bg-zinc-50 border border-black/5 rounded-2xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-black mb-2" />
                    <p className="text-[10px] font-black text-black/60 uppercase tracking-widest">Priority Care</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    toast.success("Identity verified successfully!");
                    setIsVerifyModalOpen(null);
                  }}
                  className="w-full py-5 bg-black text-white rounded-full font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl shadow-black/10 transition-all active:scale-[0.98]"
                >
                  Confirm & Submit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyListings;
