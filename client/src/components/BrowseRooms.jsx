import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MapPin, Wallet, Beef, Users, MessageSquare } from "lucide-react";

const BrowseRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [genderFilter, setGenderFilter] = useState("Any");
  const [maxPrice, setMaxPrice] = useState(50000);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/listings");
        setRooms(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      (room.city || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (room.area || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVeg = vegOnly ? room.isPureVeg : true;
    const matchesGender = genderFilter === "Any" ? true : room.genderPref === genderFilter;
    const matchesPrice = Number(room.price) <= maxPrice;
    return matchesSearch && matchesVeg && matchesGender && matchesPrice;
  });

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-brand-600/20 backdrop-blur-md border border-brand-500/30 rounded-full mb-6"
          >
            <span className="text-brand-100 text-xs font-bold tracking-wider uppercase">
              Curated Selection
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-display font-bold mb-6"
          >
            Discover Your <span className="text-gradient">Elite Stay</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-3xl mb-12 flex flex-col lg:flex-row gap-6 items-center"
        >
          <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
            <input
              type="text"
              placeholder="Search by city or area..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 transition-all text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <Users className="text-brand-500" size={20} />
              <select
                className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none text-white text-sm"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="Any">All Genders</option>
                <option value="Male">Male Only</option>
                <option value="Female">Female Only</option>
              </select>
            </div>

            <div className="flex flex-1 flex-col gap-2 min-w-[200px]">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-white/40">
                <span>Max Price</span>
                <span className="text-brand-500">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                className="w-full accent-brand-500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                />
                <div className="w-10 h-5 bg-white/10 rounded-full border border-white/10 peer-checked:bg-brand-600 transition-all" />
                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5" />
              </div>
              <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">Veg Only</span>
            </label>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredRooms.map((room, i) => (
              <motion.div
                key={room.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative"
              >
                <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 group-hover:border-brand-500/40 transition-all duration-500 shadow-xl">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                      {room.isPureVeg && (
                        <div className="px-3 py-1 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-widest">
                          Pure Veg
                        </div>
                      )}
                      <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                        {room.genderPref}
                      </div>
                    </div>
                    <img
                      src={room.imageUrl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={room.title}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark-900 to-transparent opacity-60" />
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-2 text-brand-500 mb-3">
                      <MapPin size={16} />
                      <span className="text-xs font-bold uppercase tracking-widest">{room.area}, {room.city}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 line-clamp-1">{room.title}</h3>

                    <div className="flex items-center justify-between mb-8">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-1">Monthly Rent</span>
                        <span className="text-3xl font-display font-bold text-white">₹{room.price}</span>
                      </div>
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-brand-600 transition-all duration-500 group-hover:rotate-12">
                        <Wallet className="text-white" size={20} />
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/91${room.phoneNumber}`}
                      target="_blank"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white hover:text-dark-900 transition-all active:scale-95 text-sm"
                    >
                      <MessageSquare size={18} />
                      Inquire on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredRooms.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/5 rounded-full mb-8 border border-white/10">
              <Search size={40} className="text-white/20" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No matching stays found</h3>
            <p className="text-white/40 max-w-sm mx-auto">Try adjusting your filters or expanding your search area.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrowseRooms;

