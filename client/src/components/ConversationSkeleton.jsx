import React from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const ConversationSkeleton = () => (
  <div className="p-4 border-b border-gray-100 flex items-center gap-4">
    <LoadingSkeleton width="40px" height="40px" className="rounded-full" />
    <div className="flex-1 space-y-2">
      <LoadingSkeleton width="30%" height="0.8rem" />
      <LoadingSkeleton width="60%" height="0.6rem" />
    </div>
  </div>
);
