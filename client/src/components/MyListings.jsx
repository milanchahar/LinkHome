import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Trash2, Home, Plus, ExternalLink, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyListings = () => {
  const [myRooms, setMyRooms] = useState([]);
  const [loading, setLoading] = useState(true);
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
              className="text-4xl md:text-5xl font-display font-bold mb-2"
            >
              My <span className="text-gradient">Listings</span>
            </motion.h1>
            <p className="text-white/40">Manage your premium property postings.</p>
          </div>
          <Link
            to="/list-room"
            className="flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95"
          >
            <Plus size={20} />
            Add New Property
          </Link>
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="w-12 h-12 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white/40">Loading your empire...</p>
          </div>
        ) : (
          <>
            {myRooms.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-24 glass-card rounded-[2.5rem] text-center border border-white/5"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
                  <Home size={32} className="text-white/20" />
                </div>
                <h3 className="text-2xl font-bold mb-4">No active listings</h3>
                <p className="text-white/40 mb-8 max-w-sm mx-auto">
                  You haven't shared any properties with the community yet.
                  Start listing to reach premium seekers.
                </p>
                <Link
                  to="/list-room"
                  className="inline-flex items-center gap-2 text-brand-500 font-bold hover:underline underline-offset-4"
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
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: i * 0.1 }}
                      className="glass-card rounded-[2rem] overflow-hidden border border-white/5 group relative"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={room.imageUrl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"}
                          className="w-full h-full object-cover"
                          alt={room.title}
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <div className="px-3 py-1 bg-brand-600/20 backdrop-blur-md border border-brand-500/30 rounded-full text-[10px] font-bold text-brand-100 uppercase tracking-widest flex items-center gap-1.5">
                            <ShieldCheck size={12} />
                            Active
                          </div>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="flex items-center gap-2 text-white/40 mb-2">
                          <MapPin size={14} />
                          <span className="text-[10px] uppercase font-bold tracking-widest">{room.area}, {room.city}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-6 line-clamp-1">{room.title}</h3>

                        <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/5">
                          <div className="flex gap-4">
                            <Link
                              to={`/property/${room.id}`}
                              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                            >
                              <ExternalLink size={16} />
                              View
                            </Link>
                            <Link
                              to={`/edit-room/${room.id}`}
                              className="flex items-center gap-2 text-sm text-white/40 hover:text-brand-500 transition-colors"
                            >
                              Edit
                            </Link>
                          </div>
                          <button
                            onClick={() => handleDelete(room.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 rounded-xl text-xs font-bold transition-all"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyListings;

