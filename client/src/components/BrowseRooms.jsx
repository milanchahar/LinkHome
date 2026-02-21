import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Search, MapPin, Wallet, Beef, Users, MessageSquare, SlidersHorizontal, ArrowRight, Star, LayoutGrid, Map as MapIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { BrowseSkeleton } from "./ListingSkeleton";
import BrowseMap from "./BrowseMap";

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
        const res = await axios.get("http://localhost:5001/api/listings");
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
    <div className={`pt-32 pb-24 px-6 min-h-screen bg-dark-900 transition-all duration-700 ${viewMode === 'split' ? 'xl:pr-0' : ''}`}>
      <div className={`${viewMode === 'split' ? 'max-w-none' : 'max-w-7xl mx-auto'}`}>
        {/* Header & View Toggle */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-brand-600/10 border border-brand-500/20 rounded-full text-brand-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
            >
              <Star size={12} /> Curated Stays
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
              Find Your <br />
              <span className="text-gradient">Epicenter</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/5 border border-white/10 p-1.5 rounded-2xl flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'grid' ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'text-white/40 hover:text-white'}`}
              >
                <LayoutGrid size={16} /> Grid
              </button>
              <button
                onClick={() => setViewMode("split")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'split' ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20' : 'text-white/40 hover:text-white'}`}
              >
                <MapIcon size={16} /> Discovery
              </button>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <motion.div
          layout
          className={`glass-card p-4 md:p-6 rounded-[2.5rem] mb-16 border border-white/5 flex flex-col xl:flex-row gap-6 items-center sticky top-28 z-40 backdrop-blur-2xl shadow-2xl shadow-black/50 ${viewMode === 'split' ? 'mr-6' : ''}`}
        >
          <div className="flex-1 w-full relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-500 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search city, area or landmark..."
              className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] py-5 pl-16 pr-6 outline-none focus:border-brand-500/50 focus:bg-white/[0.07] transition-all text-white font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 w-full xl:w-auto">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5">
              <Users className="text-brand-500" size={18} />
              <select
                className="bg-transparent outline-none text-white text-xs font-bold uppercase tracking-widest cursor-pointer appearance-none pr-4"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="Any" className="bg-dark-800">All Genders</option>
                <option value="Male" className="bg-dark-800">Males Only</option>
                <option value="Female" className="bg-dark-800">Females Only</option>
              </select>
            </div>

            <div className="flex flex-1 flex-col gap-2 min-w-[150px] bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.1em] text-white/30">
                <span>Max Price</span>
                <span className="text-brand-500">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="50000"
                step="500"
                className="w-full accent-brand-500 h-1 bg-white/10 rounded-full appearance-none cursor-pointer"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <label className="flex items-center gap-4 cursor-pointer group bg-white/5 border border-white/10 rounded-2xl px-6 py-4 transition-colors hover:bg-white/[0.08]">
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
              <span className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Pure Veg</span>
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
                          <div className={`glass-card rounded-[3rem] overflow-hidden border transition-all duration-700 shadow-2xl relative h-full ${activePropertyId === room.id ? "border-brand-500 scale-[1.02]" : "border-white/5"}`}>
                            <div className="aspect-[4/5] relative overflow-hidden">
                              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                                {room.isPureVeg && (
                                  <div className="px-3 py-1 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-widest flex items-center gap-1.5">
                                    <Beef size={12} /> Pure Veg
                                  </div>
                                )}
                                <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                                  {room.genderPref}
                                </div>
                              </div>
                              <img
                                src={room.imageUrl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                alt={room.title}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent opacity-80" />

                              <div className="absolute bottom-8 left-8 right-8">
                                <div className="flex items-center gap-2 text-brand-400 mb-2">
                                  <MapPin size={14} />
                                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{room.area}, {room.city}</span>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white mb-4 line-clamp-1">{room.title}</h3>
                                <div className="flex items-center justify-between">
                                  <span className="text-3xl font-display font-bold">₹{room.price}<span className="text-sm font-sans text-white/40">/mo</span></span>
                                  <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-brand-600/30">
                                    <ArrowRight className="text-white" size={20} />
                                  </div>
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
            <div className="inline-flex items-center justify-center w-32 h-32 bg-white/[0.03] rounded-[2.5rem] mb-10 border border-white/5 relative">
              <Search size={48} className="text-white/10" />
              <div className="absolute inset-0 bg-brand-500/10 blur-[40px] rounded-full" />
            </div>
            <h3 className="text-3xl font-display font-bold mb-4">No results for your quest</h3>
            <p className="text-white/40 max-w-sm mx-auto text-lg">
              Even the finest explorers need to expand their search. Try adjusting the filters.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setMaxPrice(50000); setVegOnly(false); setGenderFilter("Any"); }}
              className="mt-12 text-brand-500 font-bold hover:underline underline-offset-8 transition-all"
            >
              Reset all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrowseRooms;
