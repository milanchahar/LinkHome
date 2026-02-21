import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart, MapPin } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const SmartRecommendations = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/listings");
                // Simulate "AI Matching" by picking properties with higher price/quality
                setMatches(res.data.slice().sort((a, b) => b.price - a.price).slice(0, 3));
            } catch (err) {
                console.error("Error fetching matches:", err);
            }
        };
        fetchMatches();
    }, []);

    return (
        <section className="py-32 bg-dark-800/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4"
                        >
                            <Sparkles size={12} fill="currentColor" /> AI Smart Matching
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            Your <span className="text-gradient">Perfect Fit</span>
                        </h2>
                        <p className="text-white/40 text-lg leading-relaxed">
                            Our matching engine analyzes your preferences to find properties that align with your lifestyle, budget, and aspirations.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {matches.map((match, i) => (
                        <motion.div
                            key={match.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                        >
                            <Link to={`/property/${match.id}`}>
                                <div className="glass-card rounded-[3rem] p-4 border border-white/5 bg-white/[0.02] hover:border-brand-500/30 transition-all duration-700 shadow-xl overflow-hidden">
                                    <div className="aspect-square rounded-[2.5rem] overflow-hidden relative mb-6">
                                        <img
                                            src={match.imageUrl}
                                            alt={match.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute top-4 right-4 z-10">
                                            <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white/40 hover:text-red-500 hover:bg-white/20 transition-all group/heart">
                                                <Heart size={18} className="group-hover/heart:fill-current" />
                                            </button>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark-900 to-transparent opacity-80" />

                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="flex items-center gap-2 text-brand-400 mb-1">
                                                <MapPin size={12} />
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{match.area}</span>
                                            </div>
                                            <h4 className="text-xl font-bold text-white uppercase tracking-tight line-clamp-1">{match.title}</h4>
                                        </div>
                                    </div>

                                    <div className="px-4 pb-4 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] text-white/20 uppercase font-black tracking-widest block mb-1">Match Score</span>
                                            <div className="flex items-center gap-2">
                                                <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: "95%" }}
                                                        transition={{ duration: 1, delay: 0.5 }}
                                                        className="h-full bg-brand-600 rounded-full"
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-brand-500">95%</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] text-white/20 uppercase font-black tracking-widest block mb-1">Monthly</span>
                                            <span className="text-xl font-display font-bold">₹{match.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Floating Accent */}
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center -rotate-12 shadow-lg shadow-brand-600/30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 group-hover:-translate-y-2 pointer-events-none">
                                <Sparkles className="text-white" size={20} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="inline-flex items-center gap-3 px-8 py-5 bg-white text-dark-900 rounded-2xl font-bold hover:bg-brand-500 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95 group">
                        Update Your Preference Profile <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Background Details */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-600/5 blur-[150px] -z-10 rounded-full translate-x-1/2 -translate-y-1/2" />
        </section>
    );
};

export default SmartRecommendations;
