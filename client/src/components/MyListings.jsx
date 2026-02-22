import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Trash2, Home, Plus, ExternalLink, ShieldCheck, Shield, Edit2, X, PlusCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BrowseSkeleton } from "./ListingSkeleton";

const MyListings = () => {
  const [myRooms, setMyRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchMyRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/listings");
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
      await axios.delete(`http://localhost:5001/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyRooms(myRooms.filter((room) => room.id !== id));
      toast.success("Listing removed successfully.");
    } catch (err) {
      toast.error("Error deleting listing.");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-display font-bold mb-2 uppercase tracking-tighter"
            >
              My <span className="text-brand-500">Listings</span>
            </motion.h1>
            <p className="text-white/40 font-medium uppercase text-[10px] tracking-[0.3em]">Manage your premium property postings</p>
          </div>
          <Link
            to="/list-room"
            className="flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-600/20"
          >
            <Plus size={18} />
            Add New Property
          </Link>
        </div>

        {loading ? (
          <BrowseSkeleton />
        ) : (
          <div className="space-y-8">
            {myRooms.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-24 glass-card rounded-[3rem] text-center border border-white/5"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                  <Home size={32} className="text-white/20" />
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">No active listings</h3>
                <p className="text-white/40 mb-8 max-w-sm mx-auto text-sm">
                  You haven't shared any properties with the community yet.
                  Start listing to reach premium seekers.
                </p>
                <Link
                  to="/list-room"
                  className="inline-flex items-center gap-2 text-brand-500 font-black uppercase text-xs tracking-widest hover:text-brand-400 transition-colors"
                >
                  Post your first listing <Plus size={18} />
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {myRooms.map((room, i) => (
                    <motion.div
                      key={room.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 group"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={room.imageUrl || (room.images && room.images[0]) || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          alt={room.title}
                        />
                        <div className="absolute top-6 left-6 flex gap-2">
                          <div className="px-3 py-1.5 bg-brand-600/20 backdrop-blur-md border border-brand-500/30 rounded-full text-[10px] font-black text-brand-100 uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck size={12} />
                            Active Listing
                          </div>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="flex items-center gap-2 text-white/30 mb-2">
                          <MapPin size={12} />
                          <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{room.area}, {room.city}</span>
                        </div>
                        <h3 className="text-xl font-display font-bold mb-6 line-clamp-1 uppercase tracking-tight">{room.title}</h3>

                        <div className="flex items-center justify-between gap-4 py-6 border-y border-white/5">
                          <div className="flex items-center gap-2 px-3 py-1 bg-brand-600/10 border border-brand-500/20 rounded-lg">
                            <MessageSquare size={12} className="text-brand-500" />
                            <span className="text-[10px] font-black text-brand-500 uppercase">{(room.id * 7) % 15} Inquiries</span>
                          </div>

                          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${room.id % 2 === 0 ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'}`}>
                            <Shield size={10} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{room.id % 2 === 0 ? 'Verified' : 'Pending'}</span>
                          </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                          <Link
                            to="/messages"
                            className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-center text-[10px] font-black transition-all uppercase tracking-[0.2em] text-white/70"
                          >
                            Chat
                          </Link>
                          {room.id % 2 !== 0 && (
                            <button
                              onClick={() => setIsVerifyModalOpen(room)}
                              className="flex-1 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-center text-[10px] font-black transition-all uppercase tracking-[0.2em] shadow-lg shadow-brand-600/20"
                            >
                              Verify
                            </button>
                          )}
                          <div className="flex gap-2">
                            <Link
                              to={`/edit-room/${room.id}`}
                              className="w-11 h-11 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/60 hover:text-white transition-all"
                            >
                              <Edit2 size={16} />
                            </Link>
                            <button
                              onClick={() => handleDelete(room.id)}
                              className="w-11 h-11 flex items-center justify-center bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-xl transition-all"
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

      {/* Verification Modal (Simulated) */}
      <AnimatePresence>
        {isVerifyModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-dark-900/95 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="w-full max-w-lg bg-dark-800 border border-white/10 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-600/10 blur-[80px]" />

              <button
                onClick={() => setIsVerifyModalOpen(null)}
                className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors p-2"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-5 mb-10">
                <div className="w-16 h-16 bg-brand-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-brand-600/30">
                  <ShieldCheck size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight">Verify Identity</h3>
                  <p className="text-xs text-white/30 font-medium uppercase tracking-widest mt-1">Unlock Elite Community Status</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-10 border-2 border-dashed border-white/10 rounded-[2rem] bg-white/[0.01] text-center group hover:border-brand-500/30 transition-all cursor-pointer">
                  <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/20 group-hover:text-brand-500 group-hover:scale-110 transition-all">
                    <PlusCircle size={28} />
                  </div>
                  <p className="text-sm font-black text-white mb-2 uppercase tracking-widest">Upload Ownership Records</p>
                  <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium leading-relaxed">Secure PDF or Image format accepted <br /> (Max 15MB)</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mb-2" />
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">70% Higher Visibility</p>
                  </div>
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mb-2" />
                    <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Priority Support</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    toast.success("Verification documents submitted successfully!");
                    setIsVerifyModalOpen(null);
                  }}
                  className="w-full py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-2xl shadow-brand-600/40 transition-all active:scale-[0.98] mt-4"
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
