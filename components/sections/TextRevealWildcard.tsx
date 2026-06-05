"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TextRevealWildcard.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const REVEAL_TEXT = 
  "We believe in digital subtraction. Every interaction, every pixel, and every line of code must serve a specific conversion purpose. True luxury is not loud; it is quiet, intentional, and impeccably executed. At ZZZ, we build products that do not beg for attention, but demand it through flawless performance and premium minimalism.";

export default function TextRevealWildcard() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;

    if (badgeRef.current) {
      gsap.fromTo(badgeRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 92%",
          }
        }
      );
    }

    const words = textRef.current.querySelectorAll(`.${styles.word}`);
    
    const mm = gsap.matchMedia();

    // Desktop Pinned Experience
    mm.add("(min-width: 1025px)", () => {
      gsap.fromTo(words, 
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.1,
          duration: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.1,
          }
        }
      );
    });

    // Mobile Fallback: Scroll Reveal (no pinning)
    mm.add("(max-width: 1024px)", () => {
      gsap.fromTo(words, 
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.1,
          duration: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 45%",
            scrub: 0.1,
          }
        }
      );
    });

    // Watch for page layout shifts (e.g., masonry gallery loading above S10)
    let debounceTimeout: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    return () => {
      mm.revert();
      resizeObserver.disconnect();
      clearTimeout(debounceTimeout);
    };
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <span className={`${styles.badge} gsap-reveal-item`} ref={badgeRef} style={{ opacity: 0 }}>[ 08 / MANIFESTO ]</span>
        <p className={styles.paragraph} ref={textRef}>
          {REVEAL_TEXT.split(" ").map((word, i) => (
            <span key={i} className={styles.word}>
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
