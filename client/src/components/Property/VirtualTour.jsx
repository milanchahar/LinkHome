import React, { useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, ChevronDown, Sparkles } from "lucide-react";

const rooms = [
    {
        id: 1,
        name: "The Grand Lounge",
        desc: "Sun-drenched interiors with double-height ceilings and bespoke Italian marble.",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000",
    },
    {
        id: 2,
        name: "Culinary Suite",
        desc: "A chef's dream featuring Gaggenau appliances and a signature floating island.",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=2000",
    },
    {
        id: 3,
        name: "Master Sanctuary",
        desc: "Unparalleled views, private terrace, and a spa-inspired ensuite bathroom.",
        image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=2000",
    },
    {
        id: 4,
        name: "Rooftop Horizon",
        desc: "Infinity pool access and panoramic cityscapes for ultimate entertaining.",
        image: "https://images.unsplash.com/photo-1533779284115-9ad2537a977d?auto=format&fit=crop&q=80&w=2000",
    }
];

const VirtualTour = ({ isOpen, onClose, propertyName }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark-900 overflow-y-auto overflow-x-hidden custom-scrollbar"
            ref={containerRef}
        >
            {/* Top Navigation */}
            <div className="fixed top-0 left-0 right-0 z-[110] p-8 flex justify-between items-center pointer-events-none">
                <div className="pointer-events-auto">
                    <p className="text-[10px] font-black uppercase text-brand-500 tracking-[0.3em] mb-1">Virtual Experience</p>
                    <h2 className="text-xl font-display font-bold text-white uppercase tracking-tighter">{propertyName}</h2>
                </div>
                <button
                    onClick={onClose}
                    className="w-14 h-14 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white transition-all pointer-events-auto active:scale-90 group"
                >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
            </div>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-brand-500 z-[120] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Hero Section */}
            <section className="h-screen relative flex items-center justify-center text-center px-6">
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="max-w-3xl"
                >
                    <Sparkles className="text-brand-500 mx-auto mb-6" size={48} />
                    <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-8 tracking-tighter leading-none">
                        STEP INTO <br /> THE <span className="text-brand-500 italic">FUTURE</span>
                    </h1>
                    <p className="text-white/40 text-lg uppercase tracking-[0.2em] font-medium">Scroll to explore every detail</p>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mt-12 text-white/20"
                    >
                        <ChevronDown size={32} />
                    </motion.div>
                </motion.div>
            </section>

            {/* Rooms Sections */}
            {rooms.map((room, index) => {
                const start = 0.1 + (index * 0.2);
                const end = start + 0.2;

                return (
                    <section key={room.id} className="h-screen relative overflow-hidden bg-dark-800">
                        <motion.div
                            style={{
                                scale: useTransform(scrollYProgress, [start, end], [1.2, 1]),
                                opacity: useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0])
                            }}
                            className="absolute inset-0"
                        >
                            <img
                                src={room.image}
                                className="w-full h-full object-cover"
                                alt={room.name}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/50" />
                        </motion.div>

                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <motion.div
                                style={{
                                    y: useTransform(scrollYProgress, [start, end], [100, -100]),
                                    opacity: useTransform(scrollYProgress, [start + 0.02, start + 0.08, end - 0.08, end - 0.02], [0, 1, 1, 0])
                                }}
                                className="max-w-xl text-center"
                            >
                                <span className="inline-block px-4 py-1.5 bg-brand-600/20 border border-brand-500/30 rounded-full text-[10px] font-black uppercase text-brand-400 tracking-widest mb-6">
                                    {room.name}
                                </span>
                                <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 uppercase tracking-tighter leading-tight">
                                    {room.desc.split(" ").slice(0, 3).join(" ")} <br />
                                    <span className="text-white/40">{room.desc.split(" ").slice(3).join(" ")}</span>
                                </h3>
                            </motion.div>
                        </div>

                        {/* Visual Indicators */}
                        <div className="absolute bottom-12 left-12 flex gap-4">
                            <div className="w-12 h-[2px] bg-white/10 overflow-hidden">
                                <motion.div
                                    className="h-full bg-brand-500 origin-left"
                                    style={{ scaleX: useTransform(scrollYProgress, [start, end], [0, 1]) }}
                                />
                            </div>
                            <span className="text-[10px] font-black text-white/30 tracking-widest uppercase">Room 0{room.id}</span>
                        </div>
                    </section>
                );
            })}

            {/* End Section */}
            <section className="h-screen flex flex-col items-center justify-center px-6 text-center">
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0.9, 0.95], [0, 1]) }}
                >
                    <h2 className="text-5xl font-display font-bold text-white mb-8 uppercase tracking-tighter">Ready to See it in Person?</h2>
                    <button
                        onClick={onClose}
                        className="group relative px-12 py-5 bg-brand-600 text-white rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-brand-600/40 hover:scale-105 active:scale-95 transition-all overflow-hidden"
                    >
                        <span className="relative z-10">Request a Private View</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                    <p className="mt-8 text-white/20 text-[10px] font-bold uppercase tracking-widest">or scroll up to relive the experience</p>
                </motion.div>
            </section>
        </motion.div>
    );
};

export default VirtualTour;
