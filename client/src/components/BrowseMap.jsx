import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Coffee, School, TrainFront, Utensils, ShoppingBag, Hospital, Bus } from "lucide-react";

const BrowseMap = ({ listings, activeId, onMarkerClick }) => {
    const [activeLayer, setActiveLayer] = useState("Standard"); // "Standard", "Lifestyle", "Essentials", "Transit"

    const poiData = useMemo(() => ({
        Lifestyle: [
            { id: 'l1', type: 'Coffee', x: 25, y: 35, name: "Blue Tokai" },
            { id: 'l2', type: 'Utensils', x: 65, y: 15, name: "The Pallet" },
            { id: 'l3', type: 'ShoppingBag', x: 45, y: 75, name: "Nexus Mall" },
        ],
        Essentials: [
            { id: 'e1', type: 'School', x: 15, y: 65, name: "NPS School" },
            { id: 'e2', type: 'Hospital', x: 85, y: 45, name: "Manipal Hospital" },
        ],
        Transit: [
            { id: 't1', type: 'TrainFront', x: 55, y: 85, name: "Indiranagar Metro" },
            { id: 't2', type: 'Bus', x: 35, y: 25, name: "Volvo Bus Stop" },
        ]
    }), []);

    const getPoiIcon = (type) => {
        switch (type) {
            case 'Coffee': return <Coffee size={12} />;
            case 'Utensils': return <Utensils size={12} />;
            case 'ShoppingBag': return <ShoppingBag size={12} />;
            case 'School': return <School size={12} />;
            case 'Hospital': return <Hospital size={12} />;
            case 'TrainFront': return <TrainFront size={12} />;
            case 'Bus': return <Bus size={12} />;
            default: return <MapPin size={12} />;
        }
    };

    return (
        <div className="w-full h-full bg-dark-800 relative overflow-hidden rounded-[2.5rem] border border-white/5 shadow-inner">
            {/* 
        NOTE: Abstract premium map representation.
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

            {/* Neighborhood Layers Selector */}
            <div className="absolute top-8 left-8 right-8 z-20 flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
                {["Standard", "Lifestyle", "Essentials", "Transit"].map((layer) => (
                    <button
                        key={layer}
                        onClick={() => setActiveLayer(layer)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${activeLayer === layer ? "bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-600/30" : "bg-dark-900/80 backdrop-blur-md border-white/10 text-white/40 hover:border-white/20"}`}
                    >
                        {layer}
                    </button>
                ))}
            </div>

            {/* POI Markers */}
            <AnimatePresence>
                {activeLayer !== "Standard" && poiData[activeLayer]?.map((poi) => (
                    <motion.div
                        key={poi.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute z-10"
                        style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                    >
                        <div className="group relative">
                            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all cursor-help">
                                {getPoiIcon(poi.type)}
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                <div className="bg-dark-900 border border-white/10 px-3 py-1.5 rounded-lg shadow-2xl">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">{poi.name}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Property Markers */}
            <div className="relative w-full h-full p-12 mt-12">
                {listings.map((listing) => {
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
                                {/* Dynamic Range Overlay for "Selected" marker */}
                                {activeId === listing.id && activeLayer !== "Standard" && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 0.1 }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-500 rounded-full border-2 border-brand-500/50 -z-10"
                                    />
                                )}
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
