import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home as HomeIcon, Compass, PlusCircle, User, LogOut, Sparkles } from "lucide-react";


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
        { name: "Home", path: "/", icon: <HomeIcon size={18} /> },
        { name: "Browse", path: "/browse", icon: <Compass size={18} /> },
        { name: "Experience", path: "/experience", icon: <Sparkles size={18} /> },
        { name: "List Room", path: "/list-room", icon: <PlusCircle size={18} /> },
    ];


    if (user) {
        navLinks.push({ name: "My Postings", path: "/my-listings", icon: <User size={18} /> });
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-4 bg-dark-900/80 backdrop-blur-xl border-b border-white/10" : "py-6 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                        <HomeIcon className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-display font-bold tracking-tight">
                        Home<span className="text-brand-500">Link</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-brand-500 ${location.pathname === link.path ? "text-brand-500" : "text-white/70"
                                }`}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}

                    {!user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-600/20"
                            >
                                Join Now
                            </Link>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    )}
                </div>

                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-dark-800 border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 text-lg font-medium ${location.pathname === link.path ? "text-brand-500" : "text-white/70"
                                    }`}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                        {!user ? (
                            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="text-white/70 text-center py-2">
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-brand-600 text-white text-center py-3 rounded-xl font-bold"
                                >
                                    Join Now
                                </Link>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 text-red-400 font-medium py-2 pt-4 border-t border-white/10"
                            >
                                <LogOut size={18} />
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
