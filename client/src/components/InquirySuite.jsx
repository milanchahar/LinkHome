import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Calendar, Users, Send, CheckCircle2, ChevronRight, Beef } from "lucide-react";
import toast from "react-hot-toast";

const InquirySuite = ({ isOpen, onClose, property }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        moveInDate: "",
        duration: "6 Months",
        occupants: "1",
        message: ""
    });

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate inquiry sent
        toast.success("Inquiry sent to concierge! ✨");
        setTimeout(() => {
            const message = `Hello, I'm interested in "${property.title}" in ${property.area}. \n\nDetails:\n- Move-in: ${formData.moveInDate}\n- Duration: ${formData.duration}\n- Occupants: ${formData.occupants}\n- Note: ${formData.message}`;
            window.open(`https://wa.me/91${property.phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
            onClose();
            setStep(1);
        }, 1500);
    };

    if (!property) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-dark-900/90 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-full max-w-xl bg-dark-800 border border-white/10 rounded-[2.5rem] overflow-hidden relative shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10">
                                        <img src={property.imageUrl} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg line-clamp-1">{property.title}</h3>
                                        <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Concierge Inquiry</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="flex gap-2">
                                    {[1, 2, 3].map((s) => (
                                        <div
                                            key={s}
                                            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= step ? "bg-brand-600" : "bg-white/5"}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Form Steps */}
                            <div className="p-8 min-h-[350px] flex flex-col">
                                <AnimatePresence mode="wait">
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6 flex-1"
                                        >
                                            <h4 className="text-2xl font-display font-bold">When are you <span className="text-gradient">Moving?</span></h4>
                                            <p className="text-white/40 text-sm">Select your tentative move-in date and duration.</p>

                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-500" size={18} />
                                                    <input
                                                        type="date"
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 text-white"
                                                        value={formData.moveInDate}
                                                        onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {["3 Months", "6 Months", "1 Year+", "Flex"].map((d) => (
                                                        <button
                                                            key={d}
                                                            onClick={() => setFormData({ ...formData, duration: d })}
                                                            className={`py-3 rounded-xl border font-bold text-xs transition-all ${formData.duration === d ? "bg-brand-600 border-brand-600 text-white" : "border-white/10 text-white/40 hover:border-white/20"}`}
                                                        >
                                                            {d}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6 flex-1"
                                        >
                                            <h4 className="text-2xl font-display font-bold">Your <span className="text-gradient">Space</span> Needs</h4>
                                            <p className="text-white/40 text-sm">How many occupants and any specific requirements?</p>

                                            <div className="space-y-6">
                                                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                                    <Users className="text-brand-500" size={20} />
                                                    <div className="flex-1">
                                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 block mb-1">Total Occupants</span>
                                                        <input
                                                            type="number"
                                                            className="bg-transparent border-none outline-none text-white w-full font-bold"
                                                            value={formData.occupants}
                                                            onChange={(e) => setFormData({ ...formData, occupants: e.target.value })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    <MessageSquare className="absolute left-4 top-4 text-brand-500" size={18} />
                                                    <textarea
                                                        placeholder="I'm a working professional looking for a quiet space..."
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-500 text-white min-h-[120px] text-sm"
                                                        value={formData.message}
                                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6 flex-1 text-center"
                                        >
                                            <div className="w-20 h-20 bg-brand-600/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                                <CheckCircle2 className="text-brand-500" size={40} />
                                            </div>
                                            <h4 className="text-2xl font-display font-bold">Review <span className="text-gradient">Summary</span></h4>

                                            <div className="text-left bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-white/40">Move-in</span>
                                                    <span className="font-bold">{formData.moveInDate || "Not set"}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-white/40">Duration</span>
                                                    <span className="font-bold">{formData.duration}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-white/40">Occupants</span>
                                                    <span className="font-bold">{formData.occupants}</span>
                                                </div>
                                            </div>

                                            <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Connect with owner directly on WhatsApp next</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Footer Actions */}
                                <div className="flex gap-4 mt-12">
                                    {step > 1 && (
                                        <button
                                            onClick={handleBack}
                                            className="px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                                        >
                                            Back
                                        </button>
                                    )}
                                    {step < 3 ? (
                                        <button
                                            onClick={handleNext}
                                            className="flex-1 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-brand-600/20"
                                        >
                                            Continue <ChevronRight size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handleSubmit}
                                            className="flex-1 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-brand-600/20"
                                        >
                                            Confirm & Send <Send size={18} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default InquirySuite;
