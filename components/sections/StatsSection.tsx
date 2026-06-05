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

function StatCard({ number, suffix, label, accentWord }: StatCardProps) {
  const card = use3DTilt(10, -15);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!numRef.current) return;
    const target = parseFloat(number);
    const hasDecimals = number.includes(".");
    
    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, [number]);

  return (
    <div 
      ref={card.ref} 
      style={{ ...card.style, opacity: 0 }} 
      className={`${styles.card} glassmorphism gsap-reveal-item`}
    >
      <div className={styles.numberWrapper}>
        <span ref={numRef} className={styles.number}>0</span>
        <span className={styles.suffix}>{suffix}</span>
      </div>
      <p className={styles.label}>
        {label} <span className={styles.serifAccent}>{accentWord}</span>
      </p>
    </div>
  );
}

const STATS_DATA = [
  { number: "4", suffix: "+", label: "years in", accentWord: "business" },
  { number: "120", suffix: "+", label: "happy", accentWord: "clients" },
  { number: "500", suffix: "+", label: "projects", accentWord: "delivered" },
  { number: "87", suffix: "%", label: "client retention", accentWord: "rate" },
  { number: "8", suffix: "", label: "cities", accentWord: "served" },
  { number: "14", suffix: "", label: "industries", accentWord: "covered" },
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
          <h2 style={{ opacity: 0 }}>Our performance in <span className={styles.headingAccent}>numbers</span>.</h2>
          <p style={{ opacity: 0 }}>We combine pixel-perfect design aesthetics with hard data to scale brands globally.</p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {STATS_DATA.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
