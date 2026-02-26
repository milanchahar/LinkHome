import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, MapPin, Building, Star } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

import { getPlaceholderImage } from "../../utils/placeholders";

const FeaturedEstates = () => {
    const [listings, setListings] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchTopListings = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings`);
                // Get exactly 8 items for a lush collection
                setListings((res.data || []).slice(0, 8));
            } catch (err) {
                console.error("Error fetching featured estates:", err);
            }
        };
        fetchTopListings();
    }, []);

    const { scrollXProgress } = useScroll({
        container: carouselRef,
    });

    const scaleX = useSpring(scrollXProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section className="bg-white pt-32 pb-40 relative overflow-hidden">
            {/* Elegant Background Accents */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-50/50 -skew-x-12 origin-top-right transform z-0" />

            <div className="max-w-[90rem] mx-auto px-6 md:px-12 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10 relative z-10">
                <div className="space-y-6 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                    >
                        <span className="flex h-6 w-6 rounded-full bg-black/5 items-center justify-center">
                            <Star size={10} className="text-black" fill="currentColor" />
                        </span>
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                            The LinkHome Collection
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-display font-medium tracking-tight text-zinc-900 leading-[1.1]"
                    >
                        Handpicked <br />
                        <span className="font-serif-accent italic font-light text-zinc-400">Residences</span>
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex-shrink-0"
                >
                    <Link to="/browse" className="group inline-flex items-center gap-5 hover:bg-zinc-50 px-6 py-4 rounded-full transition-all border border-transparent hover:border-zinc-200">
                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-800">View Directory</span>
                        <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </motion.div>
            </div>

            <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-8 md:gap-10 px-6 md:px-12 xl:px-[calc((100vw-90rem)/2+48px)] no-scrollbar cursor-grab active:cursor-grabbing pb-16 snap-x snap-mandatory relative z-10"
            >
                {listings.length === 0 ? (
                    [1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className="shrink-0 w-[85vw] sm:w-[340px] lg:w-[400px] h-[500px] bg-zinc-100 rounded-[2.5rem] animate-pulse snap-center" />
                    ))
                ) : (
                    listings.map((listing, i) => (
                        <motion.div
                            key={listing.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ margin: "-50px" }}
                            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.21, 1.02, 0.73, 1] }}
                            className="shrink-0 w-[85vw] sm:w-[340px] lg:w-[380px] snap-center group"
                        >
                            {/* Card Container - White with subtle shadow */}
                            <Link to={`/property/${listing.id}`} className="block w-full h-full relative outline-none focus-visible:ring-4 ring-zinc-200 rounded-[2.5rem] bg-white border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col p-2">

                                {/* Image Container */}
                                <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-zinc-100 relative mb-6 shrink-0">
                                    <img
                                        src={listing?.imageUrl || (listing?.images && listing?.images[0]) || getPlaceholderImage(listing?.id)}
                                        alt={listing?.title || "Property"}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                                    />

                                    {/* Subtle Top Gradient for Badge readability */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent h-24 pointer-events-none" />

                                    {/* Clean Price Badge */}
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="px-4 py-2 bg-white/95 backdrop-blur-md rounded-2xl text-xs font-bold text-zinc-900 tracking-wide shadow-sm flex items-center gap-1">
                                            ₹ {listing?.price?.toLocaleString() || "N/A"}
                                        </div>
                                    </div>

                                    {/* Category Badge overlay on image bottom */}
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <div className="w-10 h-10 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center text-zinc-900 shadow-sm transform group-hover:-translate-y-1 transition-transform">
                                            <Building size={16} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Details */}
                                <div className="px-6 pb-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 text-zinc-400 mb-3">
                                        <MapPin size={14} className="shrink-0" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest truncate">
                                            {listing?.city || "Premium Location"}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-display font-medium text-zinc-900 leading-tight line-clamp-2 mb-4 group-hover:text-zinc-600 transition-colors">
                                        {listing?.title || "Modern Signature Estate"}
                                    </h3>

                                    <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between text-zinc-500 text-xs">
                                        <span className="flex items-center gap-1.5 font-medium">
                                            Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <span className="font-serif-accent italic">{listing?.category || 'Estate'}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Premium Scroll Progress Indicator */}
            <div className="max-w-[90rem] mx-auto px-6 md:px-12 mt-8 hidden md:flex items-center gap-6 relative z-10">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 w-16 shrink-0">Drag</span>
                <div className="flex-1 h-[2px] bg-zinc-100 relative rounded-full overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-zinc-900 rounded-full"
                        style={{ scaleX, originX: 0 }}
                    />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 w-16 shrink-0 text-right">View All</span>
            </div>
        </section>
    );
};

export default FeaturedEstates;
