import React from "react";
import { motion } from "framer-motion";

const MessagingHub = () => {
    return (
        <div className="pt-40 pb-24 px-6 min-h-screen bg-[#fbfbf9] flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-white border border-black/5 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-black/5 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/10 to-transparent" />

                <div className="flex items-center justify-center gap-3 mb-10">
                    <div className="h-[1px] w-8 bg-black/20" />
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-black/40">Upcoming Feature</span>
                    <div className="h-[1px] w-8 bg-black/20" />
                </div>

                <h1 className="text-4xl md:text-6xl font-display font-black leading-[1.1] tracking-tighter uppercase mb-8">
                    Signature <br />
                    <span className="font-serif-accent italic font-light text-zinc-500 normal-case tracking-normal">Conversations</span>
                </h1>

                <p className="text-zinc-800 text-lg font-medium leading-relaxed max-w-md mx-auto mb-12">
                    Our bespoke messaging suite is currently being refined by our curators.
                    Soon, you'll engage directly with property owners in a sanctuary of privacy.
                </p>

                <div className="flex flex-col items-center gap-8">
                    <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center border border-black/5 text-black/20">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>

                    <button
                        onClick={() => window.history.back()}
                        className="pill-button bg-black text-white px-12 py-5 hover:bg-zinc-800"
                    >
                        Return to Collection
                    </button>
                </div>

                <div className="mt-12 pt-12 border-t border-black/5">
                    <p className="text-[8px] font-black uppercase tracking-[0.3em] text-black/20 italic font-serif">A LinkHome Exclusive Experience</p>
                </div>
            </motion.div>
        </div>
    );
};

export default MessagingHub;
