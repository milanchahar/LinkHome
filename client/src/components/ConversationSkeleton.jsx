import React from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const ConversationSkeleton = () => (
  <div className="p-5 border border-black/5 bg-white rounded-2xl flex items-center gap-4 mb-3 animate-pulse">
    <div className="w-12 h-12 bg-zinc-100 rounded-full flex-shrink-0" />
    <div className="flex-1 space-y-3">
      <div className="h-2 bg-zinc-200 rounded w-1/3" />
      <div className="h-2 bg-zinc-100 rounded w-2/3" />
    </div>
  </div>
);
