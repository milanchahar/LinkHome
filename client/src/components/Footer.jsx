import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home as HomeIcon, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: "Navigation",
            links: [
                { name: "Home", path: "/" },
                { name: "Browse", path: "/browse" },
                { name: "Experience", path: "/experience" },
                { name: "Messages", path: "/messages" },
            ],
        },
        {
            title: "Collection",
            links: [
                { name: "Posh Estates", path: "/browse" },
                { name: "Modern Villas", path: "/browse" },
                { name: "Studio Lofts", path: "/browse" },
                { name: "Penthouses", path: "/browse" },
            ],
        },
    ];

    return (
        <footer className="pt-32 pb-16 px-6 bg-white border-t border-black/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
                    <div className="col-span-1 lg:col-span-1 space-y-8">
                        <Link to="/" className="flex items-center gap-3 group">
                            <span className="text-xl font-display font-black tracking-[0.2em] uppercase">
                                Link<span className="text-zinc-400 font-light">Home</span>
                            </span>
                        </Link>
                        <p className="text-zinc-800 text-[11px] font-medium leading-relaxed uppercase tracking-widest">
                            A boutique collection of premium <br /> living spaces for the <br /> discerning individual.
                        </p>
                        <div className="flex gap-6">
                            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="text-black/40 hover:text-black transition-all">
                                    <Icon size={16} strokeWidth={1.5} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map((section, i) => (
                        <div key={i}>
                            <h4 className="text-[10px] font-black mb-10 uppercase tracking-[0.3em] text-black underline decoration-black/20 underline-offset-8">{section.title}</h4>
                            <ul className="space-y-6">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        <Link to={link.path} className="text-zinc-600 hover:text-black transition-colors text-[10px] uppercase font-black tracking-[0.2em]">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h4 className="text-[10px] font-black mb-10 uppercase tracking-[0.3em] text-black underline decoration-black/20 underline-offset-8">Information</h4>
                        <ul className="space-y-6">
                            <li className="flex items-center gap-4 text-zinc-800 text-[10px] uppercase font-black tracking-widest">
                                <Mail size={12} strokeWidth={2} />
                                concierge@linkhome.in
                            </li>
                            <li className="flex items-center gap-4 text-zinc-800 text-[10px] uppercase font-black tracking-widest">
                                <Phone size={12} strokeWidth={2} />
                                +91 800 000 0000
                            </li>
                            <li className="flex items-center gap-4 text-zinc-800 text-[10px] uppercase font-black tracking-widest">
                                <MapPin size={12} strokeWidth={2} />
                                Indiranagar, BLR
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em]">
                        © {currentYear} LinkHome Collection. Crafted for Excellence.
                    </p>
                    <div className="flex gap-12">
                        <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
                            <a href="#" className="hover:text-black transition-colors">Terms</a>
                            <a href="#" className="hover:text-black transition-colors">Privacy</a>
                            <a href="#" className="hover:text-black transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
