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
        <section className="section-spacing px-6 bg-[#fbfbf9]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="h-[1px] w-12 bg-black/10" />
                            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/40">Voices</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter">
                            Guest <span className="font-serif-accent italic font-light text-zinc-600 normal-case tracking-normal">Experiences.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-white p-12 rounded-[3.5rem] border border-black/5 shadow-2xl shadow-black/5 flex flex-col justify-between"
                        >
                            <Quote size={32} className="text-zinc-200 mb-8" />

                            <p className="text-black/70 mb-10 font-serif italic text-lg leading-relaxed">
                                "{review.text}"
                            </p>

                            <div className="pt-8 border-t border-black/5 flex items-center gap-4">
                                <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full grayscale" />
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-black">{review.name}</h4>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{review.role}</p>
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
