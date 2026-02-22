import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home as HomeIcon, Compass, PlusCircle, User, LogOut, Sparkles, MessageSquare } from "lucide-react";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Browse", path: "/browse" },
        { name: "Experience", path: "/experience" },
        { name: "Messages", path: "/messages" },
        { name: "List Room", path: "/list-room" },
    ];

    if (user) {
        navLinks.push({ name: "My Postings", path: "/my-listings" });
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4 bg-white/90 backdrop-blur-md border-b border-black/5 shadow-sm" : "py-8 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3 group">
                    <span className="text-xl font-display font-black tracking-[0.2em] uppercase">
                        Link<span className="text-zinc-400 font-light">Home</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-black ${location.pathname === link.path ? "text-black" : "text-black/40"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="h-4 w-px bg-black/10 mx-2" />

                    {!user ? (
                        <div className="flex items-center gap-8">
                            <Link to="/login" className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors">
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="pill-button"
                            >
                                Join Now
                            </Link>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
                        >
                            <LogOut size={14} />
                            Logout
                        </button>
                    )}
                </div>

                <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-black/5 p-8 md:hidden flex flex-col gap-6 shadow-2xl"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`text-sm font-bold uppercase tracking-[0.2em] ${location.pathname === link.path ? "text-black" : "text-black/40"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {!user ? (
                            <div className="flex flex-col gap-4 pt-6 border-t border-black/5">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="text-black/40 text-center py-2 text-xs font-bold uppercase tracking-widest">
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsOpen(false)}
                                    className="pill-button justify-center"
                                >
                                    Join Now
                                </Link>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-red-500 font-bold uppercase tracking-[0.2em] text-xs py-4 pt-6 border-t border-black/5 flex items-center gap-2"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
