import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, MapPin, Wallet, Beef, Users, MessageSquare, SlidersHorizontal, ArrowRight, Star, LayoutGrid, Map as MapIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { BrowseSkeleton } from "./ListingSkeleton";
import BrowseMap from "./BrowseMap";

import { getPlaceholderImage } from "../utils/placeholders";

const BrowseRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [genderFilter, setGenderFilter] = useState("Any");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "split"
  const [activePropertyId, setActivePropertyId] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings`);
        setRooms(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchRooms();
  }, []);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const city = (room.city || "").toLowerCase();
      const area = (room.area || "").toLowerCase();
      const search = searchTerm.toLowerCase();

      const matchesSearch = city.includes(search) || area.includes(search);
      const matchesVeg = vegOnly ? room.isPureVeg : true;
      const matchesGender = genderFilter === "Any" ? true : room.genderPref === genderFilter;
      const matchesPrice = Number(room.price) <= maxPrice;

      return matchesSearch && matchesVeg && matchesGender && matchesPrice;
    });
  }, [rooms, searchTerm, vegOnly, genderFilter, maxPrice]);

  return (
    <div className={`pt-40 pb-24 px-6 min-h-screen bg-[#fbfbf9] transition-all duration-700 ${viewMode === 'split' ? 'xl:pr-0' : ''}`}>
      <div className={`${viewMode === 'split' ? 'max-w-none' : 'max-w-7xl mx-auto'}`}>
        {/* Header & View Toggle */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-black/20" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/60">The Collection</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter uppercase text-black">
              Discovery <br />
              <span className="font-serif-accent italic font-light text-zinc-500 normal-case tracking-normal">Experience</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-white border border-black/5 p-1 rounded-full flex shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-black/30 hover:text-black'}`}
              >
                <LayoutGrid size={14} /> Grid
              </button>
              <button
                onClick={() => setViewMode("split")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'split' ? 'bg-black text-white shadow-xl shadow-black/10' : 'text-black/30 hover:text-black'}`}
              >
                <MapIcon size={14} /> Split
              </button>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <motion.div
          layout
          className={`bg-white p-6 rounded-[2rem] mb-20 border border-black/5 flex flex-col xl:flex-row gap-8 items-center sticky top-28 z-40 backdrop-blur-md shadow-2xl shadow-black/5 ${viewMode === 'split' ? 'mr-6' : ''}`}
        >
          <div className="flex-1 w-full relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-black/10 group-focus-within:text-black transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search by city or neighborhood..."
              className="w-full bg-[#fbfbf9] border border-black/5 rounded-full py-4 pl-16 pr-6 outline-none focus:border-black/20 focus:bg-white transition-all text-black text-xs font-black uppercase tracking-widest placeholder:text-black/40"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-8 w-full xl:w-auto">
            <div className="flex items-center gap-4 bg-[#fbfbf9] border border-black/5 rounded-full px-6 py-3.5">
              <Users className="text-black/40" size={14} />
              <select
                className="bg-transparent outline-none text-black text-[10px] font-black uppercase tracking-widest cursor-pointer appearance-none pr-6"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="Any">All Genders</option>
                <option value="Male">Males Only</option>
                <option value="Female">Females Only</option>
              </select>
            </div>

            <div className="flex flex-1 flex-col gap-3 min-w-[200px] bg-[#fbfbf9] border border-black/5 rounded-full px-8 py-3.5">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-black/60">
                <span>Budget</span>
                <span className="text-black font-black">₹{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="5000"
                className="w-full accent-black h-[2px] bg-black/10 rounded-full appearance-none cursor-pointer"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <label className="flex items-center gap-4 cursor-pointer group bg-[#fbfbf9] border border-black/5 rounded-full px-8 py-3.5 transition-all hover:bg-black hover:text-white">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                />
                <div className="w-10 h-5 bg-black/10 rounded-full border border-black/5 peer-checked:bg-white/20 transition-all peer-hover:bg-black/20" />
                <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-all peer-checked:translate-x-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-black/60 group-hover:text-white transition-colors">Pure Veg</span>
            </label>
          </div>
        </motion.div>

        {/* Discovery View Layout */}
        <div className={`flex flex-col xl:flex-row gap-8 ${viewMode === 'split' ? '' : 'max-w-7xl mx-auto'}`}>
          <div className={`transition-all duration-700 flex-1 ${viewMode === 'split' ? 'xl:max-w-[45vw] xl:h-[calc(100vh-250px)] xl:overflow-y-auto xl:pr-6 custom-scrollbar' : ''}`}>
            <LayoutGroup>
              {loading ? (
                <BrowseSkeleton />
              ) : (
                <motion.div
                  layout
                  className={`grid gap-10 ${viewMode === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}
                >
                  <AnimatePresence mode="popLayout">
                    {filteredRooms.map((room, i) => (
                      <motion.div
                        key={room.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onMouseEnter={() => setActivePropertyId(room.id)}
                        onMouseLeave={() => setActivePropertyId(null)}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className={`group ${activePropertyId === room.id ? "z-10" : "z-0"}`}
                      >
                        <Link to={`/property/${room.id}`} className="block">
                          <div className={`nama-card p-4 h-full flex flex-col gap-6 bg-white ${activePropertyId === room.id ? "shadow-2xl shadow-black/10 scale-[1.02]" : ""}`}>
                            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative">
                              <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                                {room.isPureVeg && (
                                  <div className="px-3 py-1 bg-white/90 backdrop-blur-md border border-black/5 rounded-full text-[9px] font-black text-black uppercase tracking-widest flex items-center gap-1.5">
                                    <Beef size={10} /> Pure Veg
                                  </div>
                                )}
                              </div>
                              <img
                                src={room?.imageUrl || (room?.images && room?.images[0]) || getPlaceholderImage(room?.id)}
                                alt={room?.title || "Signature Property"}
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                              />
                            </div>

                            <div className="px-2 pb-2">
                              <div className="flex items-center gap-2 text-zinc-500 mb-2">
                                <MapPin size={12} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{room.area}, {room.city}</span>
                              </div>
                              <h3 className="text-xl font-display font-black text-black mb-6 line-clamp-1 uppercase tracking-tight">{room.title}</h3>
                              <div className="flex items-center justify-between pt-6 border-t border-black/5">
                                <span className="text-lg font-black text-black">₹{room.price.toLocaleString()}<span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest ml-1">/mo</span></span>
                                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-xl shadow-black/20">
                                  <ArrowRight size={16} strokeWidth={3} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </LayoutGroup>
          </div>

          {/* Discovery Map Sidebar */}
          {viewMode === 'split' && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden xl:block flex-1 h-[calc(100vh-250px)] sticky top-28"
            >
              <BrowseMap
                listings={filteredRooms}
                activeId={activePropertyId}
                onMarkerClick={(id) => setActivePropertyId(id)}
              />
            </motion.div>
          )}
        </div>

        {/* Empty State */}
        {!loading && filteredRooms.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-32 text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-10 border border-black/5 shadow-xl shadow-black/5">
              <Search size={32} className="text-black/10" />
            </div>
            <h3 className="text-3xl font-display font-black mb-4 uppercase tracking-tighter">No results found</h3>
            <p className="text-zinc-600 max-w-sm mx-auto text-[11px] font-black uppercase tracking-widest leading-relaxed opacity-80">
              We couldn't find any properties matching your quest. Try adjusting your preferences.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setMaxPrice(50000); setVegOnly(false); setGenderFilter("Any"); }}
              className="mt-12 pill-button mx-auto bg-black text-white hover:bg-zinc-800"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrowseRooms;
