import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare, Shield, Clock, CheckCircle2 } from "lucide-react";
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

        const user = JSON.parse(localStorage.getItem("user"));
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
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                    <div className="p-8 pb-0 flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-display font-black text-black mb-2 uppercase tracking-tight">Secure Inquiry</h2>
                            <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.2em]">{property?.title}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-zinc-100 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-8">
                        {!sent ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-black/60 mb-3">Your Message</label>
                                    <textarea
                                        required
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Hello, I'm interested in this property. Is it still available?"
                                        className="w-full h-40 p-6 bg-zinc-50 border border-black/5 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-black/5 resize-none text-sm font-medium"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl border border-green-100">
                                        <Shield className="text-green-600" size={16} />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-green-700">Protected</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                        <Clock className="text-blue-600" size={16} />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-blue-700">Relay Active</span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="pill-button w-full justify-center bg-black text-white hover:bg-zinc-800 disabled:opacity-50"
                                >
                                    {sending ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Send size={18} />
                                        </motion.div>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Send Secure Message
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle2 size={40} className="text-green-500" />
                                </div>
                                <h3 className="text-2xl font-display font-black mb-2 uppercase tracking-tight">Message Sent</h3>
                                <p className="text-zinc-800 text-sm font-medium mb-6">The owner has received your message.</p>
                                <button
                                    onClick={() => {
                                        onClose();
                                        navigate("/messages");
                                    }}
                                    className="pill-button text-xs bg-zinc-100 text-black hover:bg-zinc-200"
                                >
                                    Go to Messages
                                </button>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default InquirySuite;
