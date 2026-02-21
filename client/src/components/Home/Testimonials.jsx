import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
        name: "Alexander Rossi",
        role: "Digital Nomad",
        text: "The quality of properties on HomeLink is unmatched. It's the first place I check when planning my long-term stays.",
        avatar: "https://i.pravatar.cc/150?u=alex"
    },
    {
        name: "Sarah Jenkins",
        role: "Architect",
        text: "I appreciate the attention to design. Every space I've booked through them has been an architectural inspiration.",
        avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        name: "Marcus Thorne",
        role: "Art Director",
        text: "Seamless experience from start to finish. The custom cursor and overall aesthetic made me trust them instantly.",
        avatar: "https://i.pravatar.cc/150?u=marcus"
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 px-6 bg-dark-900/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-left">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-display font-bold mb-4"
                        >
                            What Our <span className="text-gradient">Elite Members</span> Say
                        </motion.h2>
                        <p className="text-white/40">Real stories from our community of design-conscious travelers.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="glass-card p-10 rounded-3xl relative"
                        >
                            <Quote className="absolute top-8 right-8 text-brand-500/20" size={40} />
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={16} className="fill-brand-500 text-brand-500" />
                                ))}
                            </div>
                            <p className="text-white/60 mb-8 italic leading-relaxed">
                                "{review.text}"
                            </p>
                            <div className="flex items-center gap-4">
                                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border border-white/10" />
                                <div>
                                    <h4 className="font-bold text-white text-sm">{review.name}</h4>
                                    <p className="text-brand-500 text-xs font-medium">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
