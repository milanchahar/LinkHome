import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchWithTiming } from "../utils/fetchWithTiming";
import { motion } from "framer-motion";
import { MapPin, Wallet, MessageSquare, ArrowLeft, Beef, Users, Calendar, ShieldCheck, Star, Share2, Shield, Coffee, Sparkles } from "lucide-react";
import { DetailSkeleton } from "../components/ListingSkeleton";
import InquirySuite from "../components/InquirySuite";
import { toast } from "react-hot-toast"; // Assuming toast is available, if not, it needs to be imported
import VirtualTour from "../components/Property/VirtualTour";

const PropertyView = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [isTourOpen, setIsTourOpen] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const { data, duration } = await fetchWithTiming(`${import.meta.env.VITE_API_URL}/api/listings/${id}`);
                setProperty(data);
                console.log(`Fetched property in ${duration}ms`);
            } catch {
                try {
                    const resAll = await axios.get(`${import.meta.env.VITE_API_URL}/api/listings`);
                    const found = resAll.data.find(r => r.id === parseInt(id));
                    if (found) setProperty(found);
                    else throw new Error("Not found");
                } catch {
                    toast.error("Property not found.");
                    navigate("/browse");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id, navigate]);

    if (loading) return <DetailSkeleton />;
    if (!property) return null;

    let imagesSource = [];
    if (Array.isArray(property.images)) {
        imagesSource = property.images;
    } else if (typeof property.images === "string") {
        try { imagesSource = JSON.parse(property.images); } catch { imagesSource = []; }
    }

    const allImages = imagesSource.length > 0 ? imagesSource : [property.imageUrl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"];

    const amenitiesList = [
        { id: "hasWifi", label: "WiFi", icon: "🌐" },
        { id: "hasParking", label: "Parking", icon: "🚗" },
        { id: "hasGym", label: "Gym", icon: "🏋️" },
        { id: "hasPool", label: "Pool", icon: "🏊" },
        { id: "hasAC", label: "AC", icon: "❄️" },
        { id: "hasLaundry", label: "Laundry", icon: "🧺" },
        { id: "hasBalcony", label: "Balcony", icon: "🌅" },
        { id: "isFurnished", label: "Furnished", icon: "🛋️" },
    ].filter(a => property[a.id]);

    return (
        <div className="pt-40 pb-32 px-6 min-h-screen bg-white">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-3 text-black/50 hover:text-black transition-all mb-16 group"
                >
                    <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Collection</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div className="nama-card p-4 bg-[#fdfdfd]">
                            <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] group shadow-2xl shadow-black/5">
                                <img
                                    src={allImages[activeImage]}
                                    alt={property.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                                />
                                <div className="absolute top-8 right-8 flex flex-col gap-3">
                                    {property.isPureVeg && (
                                        <div className="px-5 py-2.5 bg-white/90 backdrop-blur-md border border-black/5 rounded-full text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-black/5">
                                            <Beef size={14} strokeWidth={2.5} />
                                            Pure Veg
                                        </div>
                                    )}
                                    <div className="px-5 py-2.5 bg-white/90 backdrop-blur-md border border-black/5 rounded-full text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-black/5">
                                        <Users size={14} strokeWidth={2.5} />
                                        {property.genderPref}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsTourOpen(true)}
                                    className="absolute bottom-8 left-8 right-8 px-6 py-4 bg-black/90 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-black/20 group/tour overflow-hidden"
                                >
                                    <Sparkles size={16} strokeWidth={2} className="group-hover:scale-125 transition-transform" />
                                    Launch Virtual Experience
                                </button>
                            </div>
                        </div>

                        {allImages.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-24 h-24 rounded-[1.5rem] overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === idx ? 'border-black scale-95' : 'border-transparent hover:border-black/10'}`}
                                    >
                                        <img src={img} className={`w-full h-full object-cover transition-all duration-500 ${activeImage === idx ? 'grayscale-0' : 'grayscale'}`} alt="" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <div className="flex items-center gap-3 text-zinc-700 mb-6 font-medium">
                            <MapPin size={16} />
                            <span className="text-[11px] font-black uppercase tracking-[0.2em]">{property.area}, {property.city}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-black mb-10 leading-[1] uppercase tracking-tighter text-black">
                            {property.title}
                        </h1>

                        <p className="text-black leading-relaxed mb-12 text-sm font-medium border-l border-black/10 pl-8 font-serif italic">
                            {property.description || `Experience the pinnacle of urban living in this carefully curated space at ${property.area}. Designed for luxury and convenience, this property offers everything you need for a premium lifestyle.`}
                        </p>

                        {/* Amenities Badge List */}
                        {amenitiesList.length > 0 && (
                            <div className="flex flex-wrap gap-3 mb-12">
                                {amenitiesList.map(a => (
                                    <div key={a.id} className="px-5 py-2.5 bg-[#fbfbf9] border border-black/10 rounded-full text-[9px] font-black text-black/80 uppercase tracking-widest flex items-center gap-2">
                                        <span>{a.icon}</span>
                                        {a.label}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div className="bg-[#fbfbf9] p-8 rounded-[2rem] border border-black/10">
                                <span className="text-[9px] uppercase font-black tracking-[0.2em] text-black/60 mb-4 block">Monthly Investment</span>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-display font-black text-black">
                                        ₹{typeof property.price === 'number' ? property.price.toLocaleString() : property.price || '0'}
                                    </span>
                                    <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-1">/mo</span>
                                </div>
                            </div>
                            <div className="bg-[#fbfbf9] p-8 rounded-[2rem] border border-black/10">
                                <span className="text-[9px] uppercase font-black tracking-[0.2em] text-black/60 mb-4 block">Availability</span>
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-black/40" size={20} />
                                    <span className="text-xs font-black uppercase tracking-widest text-black">{property.availableFrom || "Immediate"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-2xl shadow-black/5 mb-12">
                            <div className="flex items-center gap-5 mb-8">
                                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-xl shadow-black/10">
                                    <ShieldCheck className="text-white" size={24} strokeWidth={1.5} />
                                </div>
                                <div className="space-y-1 flex flex-col justify-center">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-black">Listed By: {property.owner?.name || property.ownerName || 'HomeLink Agent'}</h4>
                                    <p className="text-zinc-700 text-[9px] font-black uppercase tracking-widest">{property.owner?.phone || property.phoneNumber || 'Contact via Secure Inquiry'}</p>
                                    {property.owner?.email && <p className="text-zinc-500 text-[10px] font-bold tracking-wider">{property.owner.email}</p>}
                                </div>
                            </div>
                            <button
                                onClick={() => setIsInquiryOpen(true)}
                                className="pill-button w-full justify-center bg-black text-white hover:bg-zinc-800 shadow-xl shadow-black/10"
                            >
                                <MessageSquare size={16} strokeWidth={2.5} />
                                Secure Inquiry
                            </button>
                        </div>

                        <div className="mt-auto pt-8 border-t border-black/5 flex items-center justify-between">
                            <div className="flex gap-8">
                                {['Equity Trust', 'Boutique Service'].map((benefit, i) => (
                                    <span key={i} className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-black/20 rounded-full" />
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                            {property.phoneNumber && (
                                <span className="text-[10px] font-black text-black uppercase tracking-widest opacity-40">
                                    {property.phoneNumber}
                                </span>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <InquirySuite
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
                property={property}
            />

            <VirtualTour
                isOpen={isTourOpen}
                onClose={() => setIsTourOpen(false)}
                propertyName={property.title}
            />
        </div>
    );
};

export default PropertyView;
