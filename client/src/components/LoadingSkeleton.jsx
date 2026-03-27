import React from "react";

export const LoadingSkeleton = ({ width = "100%", height = "1rem", className = "" }) => (
  <div
    className={`bg-gray-200 animate-pulse rounded ${className}`}
    style={{ width, height }}
  />
);
