import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { MapPin, Wallet, MessageSquare, ArrowLeft, Beef, Users, Calendar, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const PropertyView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/listings/${id}`); // Assuming individual fetch exists or filtered from list
                // Since original backend might not have individual endpoint, we fetch all and filter for now if needed, 
                // but it's better to assume /listings/:id works for a premium feel.
                setProperty(res.data);
            } catch (err) {
                // Fallback: fetch all and filter
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

    if (loading) return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
        </div>
    );

    if (!property) return null;

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
                        className="space-y-8"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[4/5] group">
                            <img
                                src={property.imageUrl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80"}
                                alt={property.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                            </div>
                        </div>
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

                        <p className="text-white/40 leading-relaxed mb-10 text-lg">
                            Experience the pinnacle of urban living in this carefully curated space.
                            Designed for luxury and convenience, this property offers everything you need
                            for a premium lifestyle at {property.area}.
                        </p>

                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div className="glass-card p-6 rounded-3xl border border-white/5">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2 block">Monthly Rent</span>
                                <div className="flex items-center gap-3">
                                    <Wallet className="text-brand-500" size={24} />
                                    <span className="text-3xl font-display font-bold">₹{property.price}</span>
                                </div>
                            </div>
                            <div className="glass-card p-6 rounded-3xl border border-white/5">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2 block">Available From</span>
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-brand-500" size={24} />
                                    <span className="text-xl font-bold">Immediately</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-[2rem] border border-brand-500/20 bg-brand-600/5 mb-12">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center">
                                    <ShieldCheck className="text-white" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold">Verified Listing</h4>
                                    <p className="text-white/40 text-xs">Protected by HomeLink Guarantee</p>
                                </div>
                            </div>
                            <a
                                href={`https://wa.me/91${property.phoneNumber}`}
                                target="_blank"
                                className="flex items-center justify-center gap-3 w-full py-5 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-brand-600/20 active:scale-[0.98]"
                            >
                                <MessageSquare size={20} />
                                Connect on WhatsApp
                            </a>
                        </div>

                        <div className="mt-auto pt-8 border-t border-white/5">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/20 mb-4 block">Platform Benefits</span>
                            <div className="flex gap-6">
                                {['Digital Keys', 'Zero Deposit', 'Elite Community'].map((benefit, i) => (
                                    <span key={i} className="text-xs font-bold text-white/40 flex items-center gap-2">
                                        <ShieldCheck size={14} className="text-brand-500/50" />
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PropertyView;
