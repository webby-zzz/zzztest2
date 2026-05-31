"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ClientLogos.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LOGOS_ROW_1 = [
  "Acme Corp", "Siriux", "Lumos Ltd", "Apex", "Equinox", "Prism", "Vortex Digital", "Elysium"
];

const LOGOS_ROW_2 = [
  "Novus", "Chronos", "Atlas Co", "Quantum", "Ignis", "Nebula", "Solstice", "Aether"
];

export default function ClientLogos() {
  const headingRef = useRef<HTMLDivElement>(null);
  const marqueesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(headingRef.current.children,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 92%",
          }
        }
      );
    }

    if (marqueesRef.current) {
      gsap.fromTo(marqueesRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: marqueesRef.current,
            start: "top 92%",
          }
        }
      );
    }
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.headingBlock} gsap-reveal-children`} ref={headingRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 08 / TRUSTED PARTNERS ]</span>
          <h2 style={{ opacity: 0 }}>Trusted by progressive <span className={styles.headingAccent}>collectives</span>.</h2>
        </div>
      </div>

      <div className={`${styles.marqueesWrapper} gsap-reveal-item`} style={{ opacity: 0 }} ref={marqueesRef}>
        {/* Row 1: Scrolling Left */}
        <div className={styles.marqueeContainer}>
          <div className={`${styles.marquee} ${styles.scrollLeft}`}>
            {[...LOGOS_ROW_1, ...LOGOS_ROW_1, ...LOGOS_ROW_1].map((logo, idx) => (
              <div key={idx} className={`${styles.logoCard} glassmorphism`}>
                <span className={styles.logoText}>{logo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className={styles.marqueeContainer}>
          <div className={`${styles.marquee} ${styles.scrollRight}`}>
            {[...LOGOS_ROW_2, ...LOGOS_ROW_2, ...LOGOS_ROW_2].map((logo, idx) => (
              <div key={idx} className={`${styles.logoCard} glassmorphism`}>
                <span className={styles.logoText}>{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
