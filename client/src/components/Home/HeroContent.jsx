import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
];

export default function HeroContent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Text Section */}
        <div className="relative z-20 space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="h-[1px] w-12 bg-black/20" />
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/80">
              Luxury Living <span className="font-serif-accent lowercase italic text-black/80 tracking-normal">reimagined</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-display font-black leading-[1.1] tracking-tighter uppercase"
          >
            Elevated <br />
            <span className="font-serif-accent normal-case italic font-light text-zinc-800">Essential</span> <br />
            Spaces.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-black/80 max-w-md font-medium leading-relaxed"
          >
            A curated collection of premium properties designed for those who appreciate the finer details of modern living.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link to="/browse" className="pill-button bg-black text-white px-10 py-5">
              Explore Collection
              <ArrowRight size={16} />
            </Link>
            <Link to="/experience" className="text-[10px] font-bold uppercase tracking-widest hover:underline decoration-black/20 underline-offset-8 transition-all">
              The Experience
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-10 flex items-center gap-12 border-t border-black/5"
          >
            <div>
              <p className="text-2xl font-display font-black">500+</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-black/70">Curated Stays</p>
            </div>
            <div>
              <p className="text-2xl font-display font-black">20+</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-black/70">Posh Localities</p>
            </div>
            <div>
              <p className="text-2xl font-display font-black">4.9/5</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-black/70">Guest Rating</p>
            </div>
          </motion.div>
        </div>

        {/* Image Section */}
        <div className="relative h-[600px] lg:h-[800px] w-full group">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-0 overflow-hidden rounded-[3rem] md:rounded-[5rem] shadow-2xl shadow-black/10"
            >
              <img
                src={images[index]}
                alt="Luxury Home"
                className="h-full w-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pt-32" />
            </motion.div>
          </AnimatePresence>

          {/* Floating UI element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-black/5 z-20 hidden md:block"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center">
                <MapPin size={24} className="text-black" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest">Featured Area</p>
                <p className="font-serif-accent italic text-black">Indiranagar, BLR</p>
              </div>
            </div>
            <p className="text-[10px] text-black/80 uppercase font-black tracking-widest">Trending high-end stays this month</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
