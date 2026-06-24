"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/lib/use3DTilt";
import styles from "./StatsSection.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatCardProps {
  number: string;
  suffix: string;
  label: string;
  accentWord: string;
}

function StatCard({ number, suffix, label, accentWord, accentColor }: StatCardProps & { accentColor: string }) {
  const card = use3DTilt(10, -15);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numRef.current) return;
    const target = parseFloat(number);
    const isNumeric = !isNaN(target);
    
    const ctx = gsap.context(() => {
      if (isNumeric) {
        const hasDecimals = number.includes(".");
        gsap.fromTo(
          numRef.current!,
          { textContent: "0" },
          {
            textContent: target,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: numRef.current,
              start: "top 92%",
              once: true,
            },
            snap: { textContent: hasDecimals ? 0.1 : 1 },
            onUpdate: function () {
              if (numRef.current) {
                const val = parseFloat(numRef.current.textContent || "0");
                numRef.current.textContent = hasDecimals ? val.toFixed(1) : Math.floor(val).toString();
              }
            },
          }
        );
      } else {
        // Non-numeric (e.g. "Countless")
        numRef.current!.textContent = number;
        gsap.fromTo(
          numRef.current!,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: numRef.current,
              start: "top 92%",
              once: true,
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, [number]);

  return (
    <div 
      ref={card.ref} 
      style={{ 
        ...card.style, 
        opacity: 0,
        "--card-accent": accentColor
      } as React.CSSProperties} 
      className={`${styles.card} glassmorphism gsap-reveal-item`}
    >
      <div className={styles.numberWrapper}>
        <span ref={numRef} className={styles.number}>{number}</span>
        <span className={styles.suffix}>{suffix}</span>
      </div>
      <p className={styles.label}>
        {label} <span className={styles.serifAccent}>{accentWord}</span>
      </p>
    </div>
  );
}

const CARD_ACCENTS = [
  "#5188B5", // Blue
  "#FFB703", // Yellow
  "#F66C51", // Coral
  "#DCC5DF", // Lavender
  "#C0E1D2", // Mint
];

const STATS_DATA = [
  { number: "3", suffix: "+", label: "Years in", accentWord: "Business" },
  { number: "150", suffix: "+", label: "Brands Worked", accentWord: "With" },
  { number: "500", suffix: "+", label: "Projects", accentWord: "Delivered" },
  { number: "95", suffix: "%", label: "Client", accentWord: "Retention" },
  { number: "50", suffix: "M+", label: "Content Views", accentWord: "Generated" },
  { number: "Countless", suffix: "", label: "Ideas Brought", accentWord: "To Life" },
];

export default function StatsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 92%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.headingBlock} gsap-reveal-children`} ref={headingRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 04 / REAL RESULTS ]</span>
          <h2 style={{ opacity: 0 }}>Numbers that <span className={styles.headingAccent}>matter</span></h2>
          <p style={{ opacity: 0 }}>Not everything can be measured. These things can.</p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {STATS_DATA.map((stat, index) => {
            const accentColor = CARD_ACCENTS[index % CARD_ACCENTS.length];
            return (
              <StatCard 
                key={index} 
                {...stat} 
                accentColor={accentColor} 
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
