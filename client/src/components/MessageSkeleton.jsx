import React from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const MessageSkeleton = ({ isMine = false }) => (
  <div className={`flex gap-3 mb-6 ${isMine ? 'justify-end' : 'justify-start'} animate-pulse`}>
    {!isMine && <div className="w-8 h-8 rounded-full bg-zinc-100 mt-auto shadow-sm" />}
    <div className={`max-w-[70%] space-y-2 flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
      <div className={`px-5 py-3 h-10 w-48 rounded-2xl ${isMine ? 'bg-zinc-200 rounded-br-sm' : 'bg-white border border-black/5 shadow-sm rounded-bl-sm'}`} />
      <div className="w-10 h-1.5 bg-zinc-100 rounded mx-1" />
    </div>
  </div>
);
