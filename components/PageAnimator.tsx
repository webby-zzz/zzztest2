"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PageAnimator({ 
  children, 
  shouldSlideUp = true 
}: { 
  children: React.ReactNode;
  shouldSlideUp?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      if (shouldSlideUp) {
        // Animate up smoothly
        gsap.to(containerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        });
      } else {
        // Just fade in
        gsap.to(containerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  }, [shouldSlideUp]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%", 
        minHeight: "100vh", 
        backgroundColor: "var(--background)", 
        position: "relative", 
        zIndex: 40,
        opacity: 0,
        transform: shouldSlideUp ? "translateY(100vh)" : "translateY(0)"
      }}
    >
      {children}
    </div>
  );
}
