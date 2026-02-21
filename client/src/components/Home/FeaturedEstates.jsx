import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedEstates = () => {
    const [listings, setListings] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        const fetchTopListings = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/listings");
                // Taking top 6 for the "Featured" section
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
        <section className="py-32 bg-dark-900 border-t border-white/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-brand-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4"
                    >
                        <Star size={14} fill="currentColor" /> The Signature Selection
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-display font-bold"
                    >
                        Featured <span className="text-gradient">Estates</span>
                    </motion.h2>
                </div>
                <Link to="/browse" className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors">
                    <span className="text-sm font-bold uppercase tracking-widest">Explore All</span>
                    <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-brand-600 group-hover:border-brand-600 transition-all">
                        <ArrowRight size={18} />
                    </div>
                </Link>
            </div>

            {/* Magnetic Carousel */}
            <div
                ref={carouselRef}
                className="flex overflow-x-auto gap-8 px-6 md:px-[calc((100vw-1280px)/2+24px)] no-scrollbar cursor-grab active:cursor-grabbing pb-12"
            >
                {listings.length === 0 ? (
                    // Placeholder items if no data
                    [1, 2, 3, 4].map((n) => (
                        <div key={n} className="min-w-[300px] md:min-w-[450px] aspect-[4/5] bg-white/5 rounded-[3rem] animate-pulse" />
                    ))
                ) : (
                    listings.map((listing, i) => (
                        <motion.div
                            key={listing.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="min-w-[320px] md:min-w-[500px] group relative"
                        >
                            <Link to={`/property/${listing.id}`}>
                                <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-white/5 relative shadow-2xl">
                                    <img
                                        src={listing.imageUrl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"}
                                        alt={listing.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />

                                    <div className="absolute top-8 left-8">
                                        <div className="px-4 py-2 bg-brand-600 backdrop-blur-md rounded-2xl text-[10px] font-bold text-white uppercase tracking-widest">
                                            ₹{listing.price}/mo
                                        </div>
                                    </div>

                                    <div className="absolute bottom-10 left-10 right-10">
                                        <div className="flex items-center gap-2 text-brand-500 mb-2">
                                            <MapPin size={14} />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{listing.area}</span>
                                        </div>
                                        <h3 className="text-3xl font-display font-bold text-white line-clamp-1 group-hover:text-brand-400 transition-colors uppercase tracking-tight">{listing.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Scroll Indicator */}
            <div className="max-w-7xl mx-auto px-6 mt-12">
                <div className="w-full h-px bg-white/5 relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-brand-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                        style={{ scaleX, originX: 0, width: "100%" }}
                    />
                </div>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-600/5 blur-[120px] -z-10 rounded-full" />
        </section>
    );
};

export default FeaturedEstates;
