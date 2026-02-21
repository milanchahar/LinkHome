import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const BrowseMap = ({ listings, activeId, onMarkerClick }) => {
    return (
        <div className="w-full h-full bg-dark-800 relative overflow-hidden rounded-[2.5rem] border border-white/5 shadow-inner">
            {/* 
        NOTE: In a real app, this would be Google Maps or Mapbox.
        We are creating a highly stylized, abstract "Awwwards-style" map 
        representation using SVG and CSS to maintain the premium look.
      */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 100 Q 200 50 400 150 T 800 100" stroke="white" strokeWidth="0.5" />
                    <path d="M0 300 Q 250 350 500 250 T 800 300" stroke="white" strokeWidth="0.5" />
                    <path d="M0 500 Q 300 450 600 550 T 800 500" stroke="white" strokeWidth="0.5" />
                    <path d="M100 0 Q 150 200 50 400 T 100 600" stroke="white" strokeWidth="0.5" />
                    <path d="M400 0 Q 350 250 450 500 T 400 600" stroke="white" strokeWidth="0.5" />
                    <path d="M700 0 Q 650 300 750 600" stroke="white" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Stylized Markers */}
            <div className="relative w-full h-full p-12">
                {listings.map((listing, i) => {
                    // Pseudo-random but consistent positions for the mock map
                    const x = (listing.id * 137) % 80 + 10;
                    const y = (listing.id * 223) % 80 + 10;

                    return (
                        <motion.button
                            key={listing.id}
                            onClick={() => onMarkerClick(listing.id)}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: activeId === listing.id ? 1.2 : 1,
                                opacity: 1,
                                x: `${x}%`,
                                y: `${y}%`
                            }}
                            className={`absolute z-10 group`}
                        >
                            <div className="relative">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${activeId === listing.id ? "bg-brand-600 shadow-brand-600/50" : "bg-dark-900 border border-white/20 group-hover:bg-brand-600/20"}`}>
                                    <MapPin size={16} className={activeId === listing.id ? "text-white" : "text-brand-500"} />
                                </div>
                                {activeId === listing.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 whitespace-nowrap"
                                    >
                                        <div className="glass-card px-4 py-2 border border-brand-500/30 rounded-xl">
                                            <p className="text-[10px] font-black uppercase text-white tracking-widest">₹{listing.price}</p>
                                        </div>
                                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-brand-500/30 mx-auto" />
                                    </motion.div>
                                )}
                            </div>
                        </motion.button>
                    )
                })}
            </div>

            {/* Map Gradient Glare */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/10 blur-[100px] -z-10 rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-500/5 blur-[100px] -z-10 rounded-full" />

            {/* Zoom Mock UI */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-2">
                <div className="w-10 h-20 bg-dark-900/80 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col p-1.5">
                    <button className="flex-1 flex items-center justify-center text-white/40 hover:text-white">+</button>
                    <div className="h-px bg-white/5 mx-2" />
                    <button className="flex-1 flex items-center justify-center text-white/40 hover:text-white">-</button>
                </div>
            </div>
        </div>
    );
};

export default BrowseMap;
