import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Heart, MapPin } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

import { getPlaceholderImage } from "../../utils/placeholders";

const SmartRecommendations = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings?limit=3&sortBy=price_desc`);
                const validMatches = (res.data || []).filter(item => item && typeof item.price === 'number');
                setMatches(validMatches);
            } catch (err) {
                console.error("Error fetching matches:", err);
            }
        };
        fetchMatches();
    }, []);

    return (
        <section className="section-spacing bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-12 bg-black/10" />
                            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/40">Smart Matching</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter">
                            The <span className="font-serif-accent italic font-light text-zinc-800 normal-case tracking-normal">Perfect</span> <br />
                            Fit.
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {matches.map((match, i) => (
                        <motion.div
                            key={match.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="nama-card p-4 group"
                        >
                            <Link to={`/property/${match.id}`}>
                                <div className="aspect-square rounded-[2rem] overflow-hidden relative mb-8">
                                    <img
                                        src={match?.imageUrl || getPlaceholderImage(match?.id)}
                                        alt={match?.title || "Property"}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                                    />
                                    <div className="absolute top-6 right-6">
                                        <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black text-black uppercase tracking-widest border border-black/5">
                                            98% Match
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 pb-4">
                                    <div className="flex items-center gap-2 text-zinc-800 mb-2">
                                        <MapPin size={12} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{match?.area || "Prime Location"}</span>
                                    </div>
                                    <h4 className="text-xl font-display font-black uppercase tracking-tight line-clamp-1 mb-6 text-black">{match?.title || "Signature Stay"}</h4>

                                    <div className="flex items-center justify-between pt-6 border-t border-black/5">
                                        <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Starting from</span>
                                        <span className="text-lg font-black text-black">₹{match?.price?.toLocaleString() || "N/A"}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-32 text-center">
                    <button className="pill-button justify-center mx-auto bg-black text-white hover:bg-zinc-800">
                        Customize Your Requirements
                        <ArrowRight size={14} strokeWidth={3} />
                    </button>
                    <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-black/20 italic font-serif">A curated journey awaits</p>
                </div>
            </div>
        </section>
    );
};

export default SmartRecommendations;
