import React from "react";
import { motion } from "framer-motion";

const ListingSkeleton = () => {
    return (
        <div className="nama-card p-4 h-full flex flex-col gap-6 bg-white border border-black/5 shadow-sm rounded-2xl">
            <div className="aspect-[4/5] rounded-[2rem] bg-black/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
            <div className="px-2 pb-2 space-y-4">
                <div className="h-2 w-24 bg-black/5 rounded-full" />
                <div className="h-6 w-full bg-black/5 rounded-lg" />
                <div className="pt-6 border-t border-black/5 flex justify-between items-center">
                    <div className="h-4 w-20 bg-black/5 rounded-full" />
                    <div className="h-8 w-10 bg-black/5 rounded-full" />
                </div>
            </div>
        </div>
    );
};

export const BrowseSkeleton = ({ viewMode }) => (
    <div className={`grid gap-10 ${viewMode === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
            <ListingSkeleton key={i} />
        ))}
    </div>
);

export default ListingSkeleton;


export const DetailSkeleton = () => (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-dark-900">
        <div className="max-w-6xl mx-auto">
            <div className="h-6 w-32 bg-white/5 rounded-full mb-12" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="aspect-[4/5] bg-white/5 rounded-[2.5rem] shimmer-bg" />
                <div className="space-y-8">
                    <div className="h-4 w-32 bg-white/5 rounded-full" />
                    <div className="h-16 w-full bg-white/5 rounded-2xl" />
                    <div className="h-24 w-full bg-white/5 rounded-3xl" />
                    <div className="grid grid-cols-2 gap-8">
                        <div className="h-24 bg-white/5 rounded-3xl" />
                        <div className="h-24 bg-white/5 rounded-3xl" />
                    </div>
                    <div className="h-48 bg-white/5 rounded-[2rem]" />
                </div>
            </div>
        </div>
    </div>
);
