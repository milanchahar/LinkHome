import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Shield, Zap, Globe, Heart, Award } from "lucide-react";

const Stats = [
    { label: "Luxury Stays", value: "500+" },
    { label: "Happy Seekers", value: "2k+" },
    { label: "Verified Owners", value: "150+" },
    { label: "Cities Covered", value: "12" },
];

const Experience = () => {
    return (
        <div className="pt-32 pb-24 bg-[#fbfbf9] overflow-hidden">
            <section className="px-6 mb-32 relative">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600/10 border border-brand-500/20 rounded-full text-brand-500 text-xs font-bold uppercase tracking-widest mb-8"
                    >
                        <Sparkles size={14} /> The HomeLink Story
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-display font-black mb-8 leading-tight text-black"
                    >
                        Redefining <br />
                        <span className="text-gradient">Modern Living</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-black/60 text-xl max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        We didn't just build a rental platform. We crafted an ecosystem for those who
                        value aesthetic, transparency, and the feeling of home, anywhere in the world.
                    </motion.p>
                </div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-600/5 blur-[120px] -z-10 rounded-full" />
            </section>

            <section className="px-6 mb-40 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"
                                alt="Luxury Interior"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12">
                                <div className="glass-card p-8 rounded-3xl border border-black/5 bg-white/60 backdrop-blur-md shadow-xl">
                                    <Heart className="text-black mb-4" size={32} />
                                    <h4 className="text-2xl font-black uppercase tracking-tight mb-2">Heart-First Design</h4>
                                    <p className="text-black/60 text-sm font-medium">Every listing is curated to meet the highest aesthetic and functional standards.</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-12">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-display font-black mb-6 uppercase tracking-tighter">Our DNA is built on <span className="font-serif-accent italic font-light text-zinc-500 normal-case tracking-normal">Excellence</span>.</h2>
                                <p className="text-black/60 leading-relaxed text-lg font-medium">
                                    Born from the frustration of generic rental platforms, LinkHome was
                                    conceived as a sanctuary for the modern nomad. We believe your surroundings
                                    dictate your mood, your productivity, and your peace.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { icon: Shield, title: "Total Trust", desc: "100% verified properties and secure payments." },
                                    { icon: Zap, title: "Speed", desc: "Find and book your dream stay in under 5 minutes." },
                                    { icon: Globe, title: "Community", desc: "Join an elite network of residents and owners." },
                                    { icon: Award, title: "Quality", desc: "Only the top 5% of property submissions are accepted." },
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-6 rounded-2xl bg-white border border-black/5 shadow-sm"
                                    >
                                        <item.icon className="text-black mb-4" size={24} />
                                        <h4 className="font-black uppercase tracking-widest text-[11px] mb-2">{item.title}</h4>
                                        <p className="text-black/60 text-[10px] font-medium leading-relaxed uppercase tracking-widest">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-6 mb-40">
                <div className="max-w-7xl mx-auto py-24 border-y border-white/5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {Stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-5xl md:text-7xl font-display font-black text-gradient mb-4 uppercase tracking-tighter">{stat.value}</div>
                                <div className="text-black/40 uppercase tracking-widest text-[10px] font-black">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6">
                <div className="max-w-5xl mx-auto glass-card rounded-[4rem] p-16 md:p-24 text-center border border-brand-500/20 bg-brand-600/5 relative overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-black mb-8 uppercase tracking-tighter text-black">Ready to <span className="font-serif-accent italic font-light text-zinc-500 normal-case tracking-normal">elevate</span> your <br /> lifestyle?</h2>
                        <p className="text-black/60 mb-12 text-lg max-w-xl mx-auto font-medium leading-relaxed">
                            Join the LinkHome family today and discover what it means to live with zero compromise.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 z-10 relative">
                            <Link to="/browse" className="pill-button bg-black text-white hover:bg-zinc-800 text-center justify-center">
                                Explore Stays
                            </Link>
                            <Link to="/list-room" className="pill-button bg-white text-black border border-black/10 hover:bg-zinc-50 text-center justify-center">
                                Become a Host
                            </Link>
                        </div>
                    </motion.div>

                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-600/20 blur-[100px] rounded-full" />
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-600/10 blur-[100px] rounded-full" />
                </div>
            </section>
        </div>
    );
};

export default Experience;
