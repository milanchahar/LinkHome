import React from "react";
import { motion } from "framer-motion";

const MessagingHub = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md p-8 bg-white border shadow-sm rounded-2xl"
            >
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Messaging Hub</h1>
                <p className="text-gray-600 mb-6">
                    The Messaging Hub is currently being built. Soon you'll be able to chat with owners and tenants directly!
                </p>
                <div className="inline-flex items-center justify-center p-4 bg-orange-50 rounded-full mb-6">
                    <svg
                        className="w-8 h-8 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                </div>
                <button
                    onClick={() => window.history.back()}
                    className="w-full py-3 px-6 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                    Go Back
                </button>
            </motion.div>
        </div>
    );
};

export default MessagingHub;
