import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Zap } from "lucide-react";

const About = () => {
    return (
        <section className="py-24 px-6 bg-dark-900 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                        Redefining the Standard of <span className="text-gradient">Modern Living</span>.
                    </h2>
                    <p className="text-white/60 text-lg mb-10 leading-relaxed">
                        HomeLink isn't just a rental platform. It's a curated ecosystem designed for those who value aesthetics,
                        convenience, and community. We bridge the gap between premium properties and the people who seek them.
                    </p>

                    <div className="space-y-6">
                        {[
                            { icon: <Shield className="text-brand-500" />, title: "Verified Listings", desc: "Every property is personally vetted for quality and safety." },
                            { icon: <Zap className="text-brand-500" />, title: "Seamless Experience", desc: "Book and manage your stay with zero friction." },
                            { icon: <Sparkles className="text-brand-500" />, title: "Premium Design", desc: "Spaces that inspire and reflect your lifestyle." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 * i }}
                                className="flex gap-4"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                    <p className="text-white/40 text-sm">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative group"
                >
                    <div className="absolute -inset-4 bg-gradient-to-tr from-brand-600/20 to-transparent blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/5]">
                        <img
                            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80"
                            alt="Modern Architecture"
                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 hover:scale-110"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
