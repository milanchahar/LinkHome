import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
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
                setListings(res.data.slice(0, 6));
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
        <section className="section-spacing bg-white border-t border-black/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-12">
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                    >
                        <div className="h-[1px] w-12 bg-black/20" />
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/60">Curated Selection</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter"
                    >
                        Signature <br />
                        <span className="font-serif-accent italic font-light text-zinc-500 normal-case tracking-normal">Collector</span> Items
                    </motion.h2>
                </div>
                <Link to="/browse" className="group flex items-center gap-4 text-black/40 hover:text-black transition-all">
                    <span className="text-[10px] font-black uppercase tracking-widest">Explore Collection</span>
                    <div className="w-12 h-12 border border-black/10 rounded-full flex items-center justify-center group-hover:bg-black group-hover:border-black group-hover:text-white transition-all transform group-hover:rotate-45">
                        <ArrowRight size={18} />
                    </div>
                </Link>
            </div>

            {/* Magnetic Carousel */}
            <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-12 px-6 md:px-[calc((100vw-1280px)/2+24px)] no-scrollbar cursor-grab active:cursor-grabbing pb-16"
            >
                {listings.length === 0 ? (
                    [1, 2, 3].map((n) => (
                        <div key={n} className="min-w-[300px] md:min-w-[500px] aspect-[4/5] bg-zinc-50 rounded-[4rem] animate-pulse" />
                    ))
                ) : (
                    listings.map((listing, i) => (
                        <motion.div
                            key={listing.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="min-w-[320px] md:min-w-[550px] group"
                        >
                            <Link to={`/property/${listing.id}`}>
                                <div className="nama-card p-4 h-full flex flex-col gap-8 bg-[#fdfdfd]">
                                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative">
                                        <img
                                            src={listing?.imageUrl || getPlaceholderImage(listing?.id)}
                                            alt={listing?.title || "Property"}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                                        />
                                        <div className="absolute top-6 right-6">
                                            <div className="px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-black uppercase tracking-widest border border-black/5">
                                                ₹{listing?.price?.toLocaleString() || "N/A"}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-4 pb-4 flex justify-between items-end">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-zinc-600">
                                                <MapPin size={12} />
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{listing?.city || "Luxury Stay"}</span>
                                            </div>
                                            <h3 className="text-2xl font-display font-black uppercase tracking-tight line-clamp-1">{listing?.title || "Signature Estate"}</h3>
                                        </div>
                                        <div className="text-black/30 group-hover:text-black transition-colors">
                                            <ArrowRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Scroll Indicator */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="w-full h-[1px] bg-black/5 relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-black"
                        style={{ scaleX, originX: 0, width: "100%" }}
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-black/20">Slide Discovery</span>
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-black/20">LinkHome Signature</span>
                </div>
            </div>
        </section>
    );
};

export default FeaturedEstates;
