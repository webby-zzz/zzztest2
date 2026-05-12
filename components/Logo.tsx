"use client";

import React from "react";

export default function Logo({ className = "", size = 120 }: { className?: string; size?: number }) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main Triangle Frame */}
        <g stroke="currentColor" strokeWidth="1.5">
          {/* Bottom Line with arrows */}
          <line x1="100" y1="280" x2="300" y2="280" />
          <line x1="100" y1="280" x2="60" y2="280" /> {/* Left extension */}
          <line x1="300" y1="280" x2="340" y2="280" /> {/* Right extension */}
          
          {/* Left Line with arrows */}
          <line x1="200" y1="107" x2="100" y2="280" />
          <line x1="200" y1="107" x2="230" y2="55" /> {/* Top extension right */}
          <line x1="100" y1="280" x2="70" y2="332" /> {/* Bottom extension left */}

          {/* Right Line with arrows */}
          <line x1="200" y1="107" x2="300" y2="280" />
          <line x1="200" y1="107" x2="170" y2="55" /> {/* Top extension left */}
          <line x1="300" y1="280" x2="330" y2="332" /> {/* Bottom extension right */}
        </g>

        {/* Small Triangle Inside */}
        <path
          d="M200 115 L292 275 L108 275 Z"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
        />

        {/* Arrow Heads */}
        <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Bottom Left */}
          <path d="M70 275 L60 280 L70 285" />
          {/* Bottom Right */}
          <path d="M330 332 L335 340 L342 332" />
          {/* Top Left */}
          <path d="M225 65 L230 55 L238 65" />
        </g>

        {/* Text: zip (Left side) */}
        <text
          x="125"
          y="185"
          fill="currentColor"
          fontSize="46"
          fontWeight="400"
          textAnchor="middle"
          transform="rotate(-60, 125, 185)"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          zip
        </text>

        {/* Text: zap (Right side) */}
        <text
          x="280"
          y="185"
          fill="currentColor"
          fontSize="46"
          fontWeight="400"
          textAnchor="middle"
          transform="rotate(60, 280, 185)"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          zap
        </text>

        {/* Text: zop (Bottom) */}
        <text
          x="200"
          y="345"
          fill="currentColor"
          fontSize="52"
          fontWeight="400"
          textAnchor="middle"
          style={{ fontFamily: "'Georgia', serif", letterSpacing: "4px" }}
        >
          zop
        </text>

        {/* Text: marketing (Cursive) */}
        <text
          x="200"
          y="235"
          fill="currentColor"
          fontSize="24"
          textAnchor="middle"
          style={{ fontFamily: "'Brush Script MT', cursive, serif" }}
        >
          marketing
        </text>
      </svg>
    </div>
  );
}
