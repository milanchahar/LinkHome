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
                { name: "List Room", path: "/list-room" },
                { name: "My Postings", path: "/my-listings" },
            ],
        },
        {
            title: "Company",
            links: [
                { name: "About Us", path: "#" },
                { name: "Careers", path: "#" },
                { name: "Support", path: "#" },
                { name: "Privacy Policy", path: "#" },
            ],
        },
    ];

    return (
        <footer className="pt-24 pb-12 px-6 bg-dark-900 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                                <HomeIcon className="text-white" size={24} />
                            </div>
                            <span className="text-2xl font-display font-bold tracking-tight">
                                Home<span className="text-brand-500">Link</span>
                            </span>
                        </Link>
                        <p className="text-white/40 text-sm leading-relaxed mb-6">
                            Redefining the standard of modern living by bridging the gap between premium properties and design-conscious people.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-brand-500 hover:bg-brand-600/10 transition-all border border-white/5">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map((section, i) => (
                        <div key={i}>
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link, j) => (
                                    <li key={j}>
                                        <Link to={link.path} className="text-white/40 hover:text-brand-500 transition-colors text-sm">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-white/40 text-sm">
                                <Mail size={16} className="text-brand-500" />
                                hello@homelink.premium
                            </li>
                            <li className="flex items-center gap-3 text-white/40 text-sm">
                                <Phone size={16} className="text-brand-500" />
                                +1 (555) 000-LINK
                            </li>
                            <li className="flex items-center gap-3 text-white/40 text-sm">
                                <MapPin size={16} className="text-brand-500" />
                                Design District, Metropolis
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/20 text-xs">
                        © {currentYear} HomeLink Premium. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-white/20 hover:text-white/40 transition-colors text-xs uppercase tracking-widest">Terms</a>
                        <a href="#" className="text-white/20 hover:text-white/40 transition-colors text-xs uppercase tracking-widest">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
