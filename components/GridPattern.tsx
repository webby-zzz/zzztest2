"use client";

import React from "react";

export default function GridPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ overflow: 'hidden' }}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="triangleGrid"
            width="100"
            height="86.6"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M50 0 L100 86.6 L0 86.6 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M0 0 L50 86.6 L-50 86.6 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
             <path
              d="M100 0 L150 86.6 L50 86.6 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#triangleGrid)" />
      </svg>
    </div>
  );
}
