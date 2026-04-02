import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare, Shield, Clock, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const InquirySuite = ({ isOpen, onClose, property }) => {
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;
        const token = localStorage.getItem("token");

        if (!user || !token) {
            toast.error("Please login to send inquiries");
            onClose();
            navigate("/login");
            return;
        }

        if (user.id === property?.ownerId) {
            toast.error("You cannot send an inquiry for your own property.");
            return;
        }

        setSending(true);

        try {
            const convRes = await fetch(`${import.meta.env.VITE_API_URL}/api/conversations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ partnerId: property.ownerId })
            });

            if (convRes.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                toast.error("Your session has expired. Please log in again.");
                onClose();
                navigate("/login");
                return;
            }

            if (!convRes.ok) {
                throw new Error("Failed to initialize conversation");
            }

            const conversation = await convRes.json();

            const enhancedMessage = `Regarding ${property.title}:\n\n${message}`;

            const msgRes = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    conversationId: conversation.id,
                    content: enhancedMessage
                })
            });

            if (!msgRes.ok) {
                throw new Error("Failed to send message");
            }

            setSending(false);
            setSent(true);

            setTimeout(() => {
                onClose();
                setSent(false);
                setMessage("");
            }, 3000);

        } catch (error) {
            console.error("Inquiry error:", error);
            toast.error("Failed to send inquiry. Please try again.");
            setSending(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 30 }}
                    className="relative w-full max-w-xl bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-black/10"
                >
                    <div className="p-10 pb-0 flex justify-between items-start">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-black rounded-2xl shadow-xl shadow-black/10">
                                    <MessageSquare size={20} className="text-white" strokeWidth={2.5} />
                                </div>
                                <h2 className="text-3xl font-display font-black text-black uppercase tracking-tight">Secure inquiry</h2>
                            </div>
                            <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] ml-1">{property?.title}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-zinc-100 rounded-full transition-all active:scale-90"
                        >
                            <X size={24} strokeWidth={2.5} />
                        </button>
                    </div>

                    <div className="p-10">
                        {!sent ? (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-black/40 px-2 italic">Construct your communique</label>
                                    <div className="relative">
                                        <textarea
                                            required
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Hello, I am interested in this luxury listing. Is it available for private viewing?"
                                            className="w-full h-48 p-8 bg-zinc-50/50 border border-black/5 rounded-[2.5rem] focus:outline-none focus:ring-4 focus:ring-black/5 resize-none text-[13px] font-bold leading-relaxed placeholder-zinc-300 transition-all font-serif italic"
                                        />
                                        <Sparkles className="absolute bottom-6 right-6 text-black/5" size={24} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { icon: ShieldCheck, label: "Encrypted", color: "text-green-600", bg: "bg-green-50" },
                                        { icon: Clock, label: "Instant Sync", color: "text-blue-600", bg: "bg-blue-50" }
                                    ].map((badge, i) => (
                                        <div key={i} className={`flex items-center gap-4 p-5 ${badge.bg} rounded-3xl border border-black/0`}>
                                            <badge.icon className={badge.color} size={18} strokeWidth={2.5} />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${badge.color}`}>{badge.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="pill-button w-full justify-center bg-black text-white hover:bg-zinc-800 shadow-2xl shadow-black/20 h-20 text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30"
                                >
                                    {sending ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Send size={20} strokeWidth={2.5} />
                                        </motion.div>
                                    ) : (
                                        <>
                                            <Send size={18} strokeWidth={2.5} />
                                            Initialize Secure Relay
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-10 shadow-xl shadow-green-500/10">
                                    <CheckCircle2 size={48} className="text-green-500" strokeWidth={2.5} />
                                </div>
                                <h3 className="text-4xl font-display font-black mb-4 uppercase tracking-tighter">Transmission Successful</h3>
                                <p className="text-zinc-500 text-sm font-medium mb-10 leading-relaxed max-w-xs">The property owner has been notified via the secure relay service.</p>
                                <div className="flex flex-col sm:flex-row gap-4 w-full">
                                    <button
                                        onClick={() => {
                                            onClose();
                                            navigate("/messages");
                                        }}
                                        className="pill-button flex-1 justify-center bg-black text-white hover:bg-zinc-800 shadow-xl shadow-black/10 h-16 text-[10px] font-black uppercase tracking-widest"
                                    >
                                        Go to Inbox
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="pill-button flex-1 justify-center bg-zinc-100 text-black hover:bg-zinc-200 h-16 text-[10px] font-black uppercase tracking-widest"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default InquirySuite;
