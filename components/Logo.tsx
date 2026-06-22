"use client";

import React from "react";

export default function Logo({ className = "", size = 60 }: { className?: string; size?: number }) {
  return (
    <div 
      className={`logoContainer ${className}`} 
      style={{ height: size, width: "auto", display: "inline-flex", alignItems: "center" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo dark mode.webp"
        alt="ZZZ Logo"
        className="logoDark"
        style={{ height: "100%", width: "auto", objectFit: "contain" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo light mode.webp"
        alt="ZZZ Logo"
        className="logoLight"
        style={{ height: "100%", width: "auto", objectFit: "contain" }}
      />
    </div>
  );
}
