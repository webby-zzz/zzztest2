"use client";

import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import gsap from "gsap";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if the preloader has already run in this page session (in-memory)
    if (typeof window !== "undefined") {
      if ((window as any).__hasPreloaderRun) {
        setShouldRender(false);
        return;
      }
      setShouldRender(true);
      (window as any).__hasPreloaderRun = true;
    }
  }, []);

  useEffect(() => {
    if (!shouldRender || !containerRef.current) return;

    // Entrance Animation
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Fade in and scale up the glass panel
    tl.fromTo(panelRef.current,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.0 }
    );

    // Fade in the logo and trigger pulse glow
    tl.fromTo(logoRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8 },
      "-=0.4"
    );

    // Fade out and collapse preloader after a short display delay
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      delay: 1.2,
      onComplete: () => {
        setShouldRender(false);
      }
    });

    return () => {
      tl.kill();
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className={styles.preloader} ref={containerRef}>
      <div className={`${styles.glassPanel} glassmorphism`} ref={panelRef}>
        {/* Glow effect back layer */}
        <div className={styles.glowBackdrop} />
        
        {/* Centered logo */}
        <div ref={logoRef} className={styles.logoWrapper}>
          <Logo size={100} />
        </div>
      </div>
    </div>
  );
}
