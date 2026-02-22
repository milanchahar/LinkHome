import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
                const res = await axios.get(`http://localhost:5001/api/listings/${id}`);
                setProperty(res.data);
            } catch (err) {
                try {
                    const resAll = await axios.get("http://localhost:5001/api/listings");
                    const found = resAll.data.find(r => r.id === parseInt(id));
                    if (found) setProperty(found);
                    else throw new Error("Not found");
                } catch (e) {
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

    const allImages = property.images && property.images.length > 0 ? property.images : [property.imageUrl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"];

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
        <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-900">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-12 group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Listings
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[4/5] group shadow-2xl">
                            <img
                                src={allImages[activeImage]}
                                alt={property.title}
                                className="w-full h-full object-cover transition-all duration-700"
                            />
                            <div className="absolute top-6 right-6 flex flex-col gap-3">
                                {property.isPureVeg && (
                                    <div className="px-4 py-2 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-full text-xs font-bold text-green-400 uppercase tracking-widest flex items-center gap-2">
                                        <Beef size={14} />
                                        Pure Veg
                                    </div>
                                )}
                                <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                    <Users size={14} />
                                    {property.genderPref}
                                </div>
                                <button
                                    onClick={() => setIsTourOpen(true)}
                                    className="px-4 py-2 bg-brand-600/20 backdrop-blur-md border border-brand-500/30 rounded-full text-xs font-bold text-brand-400 uppercase tracking-widest flex items-center gap-2 hover:bg-brand-500/30 transition-colors"
                                >
                                    <Sparkles size={14} />
                                    Virtual Tour
                                </button>
                            </div>
                        </div>

                        {allImages.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scroll-hide">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === idx ? 'border-brand-500 scale-95' : 'border-white/10 hover:border-white/30'}`}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt="" />
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
                        <div className="flex items-center gap-2 text-brand-500 mb-4">
                            <MapPin size={18} />
                            <span className="text-sm font-bold uppercase tracking-widest">{property.area}, {property.city}</span>
                        </div>

                        <h1 className="text-5xl font-display font-bold mb-6 leading-tight">{property.title}</h1>

                        <p className="text-white/40 leading-relaxed mb-8 text-lg">
                            {property.description || `Experience the pinnacle of urban living in this carefully curated space at ${property.area}. Designed for luxury and convenience, this property offers everything you need for a premium lifestyle.`}
                        </p>

                        {/* Amenities Badge List */}
                        {amenitiesList.length > 0 && (
                            <div className="flex flex-wrap gap-3 mb-10">
                                {amenitiesList.map(a => (
                                    <div key={a.id} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white/60 flex items-center gap-2">
                                        <span>{a.icon}</span>
                                        {a.label}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div className="glass-card p-6 rounded-3xl border border-white/5">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2 block">Monthly Rent</span>
                                <div className="flex items-center gap-3">
                                    <Wallet className="text-brand-500" size={24} />
                                    <span className="text-3xl font-display font-bold">₹{property.price}</span>
                                </div>
                            </div>
                            <div className="glass-card p-6 rounded-3xl border border-white/5">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2 block">Availability</span>
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-brand-500" size={24} />
                                    <span className="text-xl font-bold">{property.availableFrom || "Immediately"}</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-[2rem] border border-brand-500/20 bg-brand-600/5 mb-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center">
                                    <ShieldCheck className="text-white" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Verified Listing</h4>
                                    <p className="text-white/40 text-xs">Protected by HomeLink Guarantee</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsInquiryOpen(true)}
                                className="flex items-center justify-center gap-3 w-full py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand-600/20 active:scale-[0.98]"
                            >
                                <MessageSquare size={20} />
                                Connect with Owner
                            </button>
                        </div>

                        <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                            <div className="flex gap-4">
                                {['Zero Deposit', 'Elite Community'].map((benefit, i) => (
                                    <span key={i} className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-2">
                                        <ShieldCheck size={12} className="text-brand-500/50" />
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                            {property.phoneNumber && (
                                <span className="text-xs font-bold text-brand-500">
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
