import { motion } from "framer-motion";
import { Search, PlusCircle } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="relative z-10 text-center px-4">
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter"
      >
        Find Your <span className="text-blue-500">HomeLink</span>
      </motion.h1>
      <div className="flex gap-4 justify-center">
        <button className="px-8 py-4 bg-blue-600 rounded-full font-bold hover:scale-105 transition-transform">
          Find Rooms
        </button>
        <button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          Post Listing
        </button>
      </div>
    </div>
  );
}
