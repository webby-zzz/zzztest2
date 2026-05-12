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
        // Set initial state to below the viewport
        gsap.set(containerRef.current, { y: "100vh", opacity: 0 });
        
        // Animate up smoothly
        gsap.to(containerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        });
      } else {
        // Just fade in or stay static if we're doing a custom transition
        gsap.set(containerRef.current, { y: 0, opacity: 0 });
        gsap.to(containerRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  }, [shouldSlideUp]);

  return (
    <div ref={containerRef} style={{ width: "100%", minHeight: "100vh", backgroundColor: "var(--background)", position: "relative", zIndex: 40 }}>
      {children}
    </div>
  );
}
