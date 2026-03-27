import React from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const MessageSkeleton = () => (
  <div className="flex gap-3 mb-4">
    <LoadingSkeleton width="40px" height="40px" className="rounded-full" />
    <div className="flex-1 space-y-2">
      <LoadingSkeleton width="80%" height="0.8rem" />
      <LoadingSkeleton width="50%" height="0.6rem" />
    </div>
  </div>
);
