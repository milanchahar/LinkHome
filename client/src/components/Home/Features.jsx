import React from "react";
import { motion } from "framer-motion";
import { Home, Search, Heart, Key, CreditCard, Clock } from "lucide-react";

const featureList = [
    { icon: <Home />, title: "Premium Spaces", desc: "Access to elite villas and luxury apartments worldwide." },
    { icon: <Search />, title: "Smart Discovery", desc: "AI-powered filters to find your perfect match instantly." },
    { icon: <Heart />, title: "Curated Selection", desc: "Only the most aesthetic and comfortable spaces made the cut." },
    { icon: <Key />, title: "Easy Access", desc: "Digital keys and seamless check-ins for every property." },
    { icon: <CreditCard />, title: "Secure Payments", desc: "Encrypted transactions with multiple payment options." },
    { icon: <Clock />, title: "24/7 Support", desc: "Our concierge team is always available for your needs." }
];

const Features = () => {
    return (
        <section className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold mb-4"
                    >
                        Exclusive <span className="text-gradient">Core Features</span>
                    </motion.h2>
                    <p className="text-white/40 max-w-2xl mx-auto">
                        Everything you need to find, book, and enjoy your next luxury living experience without any compromise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featureList.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="glass-card p-8 rounded-3xl group border border-white/5 hover:border-brand-500/30 transition-all duration-500"
                        >
                            <div className="w-14 h-14 bg-brand-600/10 rounded-2xl flex items-center justify-center mb-6 border border-brand-500/20 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-500 text-brand-500">
                                {React.cloneElement(feature.icon, { size: 28 })}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-white/40 leading-relaxed text-sm">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
