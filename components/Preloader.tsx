"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Logo from "./Logo";
import styles from "./Preloader.module.css";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const frontLogoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  
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

    // Timeline configuration
    const tl = gsap.timeline({
      defaults: { ease: "none" }
    });

    // Initial state setup
    gsap.set(logoWrapperRef.current, { scale: 0.95, opacity: 0 });
    if (frontLogoRef.current) gsap.set(frontLogoRef.current, { clipPath: "inset(100% 0px 0px 0px)" });
    if (progressBarRef.current) gsap.set(progressBarRef.current, { width: "0%" });

    // Fade logo container in
    tl.to(logoWrapperRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    });

    // Simulate progress fill with color change and bar width
    const progressObj = { value: 0 };
    tl.to(progressObj, {
      value: 100,
      duration: 2.0,
      ease: "power2.out",
      onUpdate: () => {
        const val = progressObj.value;
        if (frontLogoRef.current) {
          frontLogoRef.current.style.clipPath = `inset(${100 - val}% 0px 0px 0px)`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${val}%`;
        }
        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${Math.round(val)}%`;
        }
      }
    });

    // Fade out and collapse preloader
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power3.inOut",
      delay: 0.3,
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
      <div className={styles.loaderContainer}>
        {/* Pulsing backdrop glow behind the logo */}
        <div className={styles.glowBackdrop} />

        {/* Double-layered Logo Container */}
        <div ref={logoWrapperRef} className={styles.logoWrapper}>
          {/* Back Logo Layer (grayscale, low opacity) */}
          <div className={styles.logoBack}>
            <Logo size={140} />
          </div>
          
          {/* Front Logo Layer (full opacity color fill) */}
          <div ref={frontLogoRef} className={styles.logoFront}>
            <Logo size={140} />
          </div>
        </div>

        {/* Loading Bar section */}
        <div className={styles.progressContainer}>
          <div className={styles.progressTrack}>
            <div ref={progressBarRef} className={styles.progressBar} />
          </div>
          <div ref={progressTextRef} className={styles.progressText}>0%</div>
        </div>
      </div>
    </div>
  );
}
