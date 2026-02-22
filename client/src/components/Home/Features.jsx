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
        <section className="section-spacing px-6 bg-white relative">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-12 bg-black/10" />
                            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/40">Excellence</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter">
                            Core <span className="font-serif-accent italic font-light text-zinc-600 normal-case tracking-normal">Signature</span> <br />
                            Features.
                        </h2>
                    </div>
                    <p className="text-zinc-600 max-w-sm font-medium leading-relaxed">
                        Every aspect of HomeLink is engineered for perfection, ensuring your search for
                        the ideal living space is as premium as the properties themselves.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {featureList.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="nama-card p-12 group"
                        >
                            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-10 border border-black/5 group-hover:bg-black group-hover:text-white transition-all duration-500 text-black">
                                {React.cloneElement(feature.icon, { size: 24, strokeWidth: 1.5 })}
                            </div>
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-black underline decoration-black/10 underline-offset-4">{feature.title}</h3>
                            <p className="text-zinc-600 leading-relaxed text-sm font-medium">
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
