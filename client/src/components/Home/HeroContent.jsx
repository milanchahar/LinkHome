import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ArrowRight } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600607687940-4e527236d89b?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
];

import HeroScene from "./HeroScene";

export default function HeroContent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <HeroScene />

      <AnimatePresence mode="wait">

        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-dark-900/40 z-10" />
          <img
            src={images[index]}
            alt="Luxury Home"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="inline-block px-4 py-1.5 bg-brand-600/20 backdrop-blur-md border border-brand-500/30 rounded-full mb-8"
        >
          <span className="text-brand-100 text-sm font-bold tracking-wider uppercase">
            Luxury Real Estate Reimagined
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-6xl md:text-8xl font-display font-bold leading-tight mb-8 tracking-tighter"
        >
          Experience <span className="text-gradient">Premium</span> <br />
          Living Spaces.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="max-w-3xl mx-auto glass-card rounded-2xl p-2 flex flex-col md:flex-row gap-2"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-white/10">
            <MapPin className="text-brand-500" size={20} />
            <input
              type="text"
              placeholder="Search by location..."
              className="bg-transparent border-none outline-none text-white placeholder:text-white/40 w-full"
            />
          </div>
          <button className="bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all group">
            Search Rooms
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
