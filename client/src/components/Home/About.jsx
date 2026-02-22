import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Zap } from "lucide-react";

const About = () => {
    return (
        <section className="section-spacing px-6 bg-[#fbfbf9] relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <div className="flex items-center gap-3 mb-10">
                        <div className="h-[1px] w-12 bg-black/10" />
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/60">Our Philosophy</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-display font-black mb-10 uppercase tracking-tighter leading-tight">
                        Redefining the <br />
                        <span className="font-serif-accent italic font-light text-zinc-600 normal-case tracking-normal">Standard</span> <br />
                        of Living.
                    </h2>

                    <p className="text-zinc-700 text-lg mb-12 leading-relaxed font-medium">
                        HomeLink is a curated ecosystem for those who value aesthetics and artisanal quality.
                        We don't just list properties; we curate experiences that blend modern functionality
                        with timeless elegance.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {[
                            { title: "Vetted Collection", desc: "Every property is personally audited for design and safety." },
                            { title: "Boutique Experience", desc: "A customized journey from discovery to settlement." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 * i }}
                                className="space-y-3"
                            >
                                <h4 className="text-[11px] font-black uppercase tracking-widest text-black underline decoration-black/10 underline-offset-4">{item.title}</h4>
                                <p className="text-zinc-600 text-xs leading-relaxed font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16">
                        <button className="pill-button">
                            Learn About Us
                            <Sparkles size={14} />
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative"
                >
                    <div className="aspect-[4/5] overflow-hidden rounded-[4rem] shadow-2xl shadow-black/5 border border-black/5 bg-white p-4">
                        <img
                            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80"
                            alt="Modern Architecture"
                            className="w-full h-full object-cover rounded-[3rem] grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>

                    {/* Floating detail */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full border border-black/5 shadow-2xl flex items-center justify-center p-8 text-center hidden xl:flex">
                        <p className="text-[9px] font-black uppercase tracking-widest leading-tight">Hand-picked <br /> <span className="text-zinc-600">Curations</span></p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
