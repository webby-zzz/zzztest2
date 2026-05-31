"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AboutBrief.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutBrief() {
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !visualRef.current) return;

    gsap.fromTo(textRef.current.children,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 92%",
        }
      }
    );

    gsap.fromTo(visualRef.current,
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top 92%",
        }
      }
    );
  }, []);

  return (
    <section className={styles.section} id="about-us">
      <div className={styles.container}>
        
        {/* Left Side: Copy content */}
        <div className={`${styles.textCol} gsap-reveal-children`} ref={textRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 04 / OUR STORY ]</span>
          <h2 style={{ opacity: 0 }}>
            Built by <span className={styles.serifAccent}>creatives</span>.<br />
            Driven by <span className={styles.boldAccent}>strategy</span>.
          </h2>
          
          <div className={styles.paragraphs} style={{ opacity: 0 }}>
            <p>
              We are a modern collective of designers, writers, and technical developers obsessed with commercial growth. We replace visual noise and slow templates with bespoke visual languages and ultra-speed assets.
            </p>
            <p>
              Our philosophy revolves around digital subtraction. We remove the generic elements to leave only what actively enhances customer experience and scales brand authority.
            </p>
          </div>

          {/* Pull Quote */}
          <blockquote className={styles.pullQuote} style={{ opacity: 0 }}>
            "Bespoke design is not about decoration; it is about building a distinct commercial moat."
          </blockquote>

          <div className={styles.linksBlock} style={{ opacity: 0 }}>
            <Link href="#contact-cta" className={styles.aboutBtn}>
              Our Story <span>→</span>
            </Link>
          </div>
        </div>

        {/* Right Side: Looping Reel Illustration */}
        <div className={`${styles.visualCol} gsap-reveal-item`} style={{ opacity: 0 }} ref={visualRef}>
          <div className={`${styles.glassCard} glassmorphism`}>
            <div className={styles.dotRow}>
              <span className={styles.dot} style={{ backgroundColor: "var(--brand-coral)" }} />
              <span className={styles.dot} style={{ backgroundColor: "var(--brand-yellow)" }} />
              <span className={styles.dot} style={{ backgroundColor: "var(--brand-mint)" }} />
            </div>
            
            <div className={styles.cardInner}>
              <div className={styles.loopingReel}>
                {/* SVG Looping abstract animations */}
                <svg viewBox="0 0 100 100" className={styles.loopingSvg}>
                  <circle cx="50" cy="50" r="30" className={styles.circleBg} />
                  <path d="M 30,50 L 50,30 L 70,50 L 50,70 Z" className={styles.pathRotate} />
                  <circle cx="50" cy="50" r="8" className={styles.innerDot} />
                </svg>
              </div>
              <span className={styles.cardTag}>[ ZZZ DIGITAL REEL ]</span>
              <p className={styles.philosophicQuote}>
                Relentless quality is achieved when there is nothing left to subtract.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
