"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/lib/use3DTilt";
import styles from "./WhyChooseUs.module.css";
import { 
  Layers, 
  BookOpen, 
  Zap, 
  Eye, 
  Heart, 
  BarChart3, 
  CheckSquare 
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const USPS = [
  {
    title: "End-to-end under one roof",
    desc: "Strategy, design, copywriting, and development. We manage the entire pipeline in one unified place.",
    icon: Layers,
    highlight: "roof",
    accent: "unified"
  },
  {
    title: "Deep Industry depth",
    desc: "We have worked across retail, tech, hospitality, finance, fashion, and education. We understand your audience.",
    icon: BookOpen,
    highlight: "depth",
    accent: "audience"
  },
  {
    title: "Turnaround without trade-offs",
    desc: "Fast project delivery schedules that never compromise creative standards or source-code quality.",
    icon: Zap,
    highlight: "trade-offs",
    accent: "quality"
  },
  {
    title: "Transparent process",
    desc: "Real-time updates, clear communication, and collaborative logs. You see every step. Zero black boxes.",
    icon: Eye,
    highlight: "process",
    accent: "boxes"
  },
  {
    title: "Retention-first strategy",
    desc: "We focus on sustaining and scaling current partner accounts rather than chasing speculative contracts.",
    icon: Heart,
    highlight: "Retention-first",
    accent: "scaling"
  },
  {
    title: "Rooted in user data",
    desc: "Every design decision, interactive script, and paragraph is backed by rigorous customer analytics.",
    icon: BarChart3,
    highlight: "data",
    accent: "analytics"
  },
  {
    title: "Unwavering consistency",
    desc: "Bespoke production quality across every asset, whether it's a corporate business card or a full brand identity.",
    icon: CheckSquare,
    highlight: "consistency",
    accent: "identity"
  }
];

function UspCard({ title, desc, icon: Icon, highlight, accent }: typeof USPS[0]) {
  const card = use3DTilt(10, -15);
  
  return (
    <div 
      ref={card.ref} 
      style={{ ...card.style, opacity: 0 }} 
      className={`${styles.card} glassmorphism gsap-reveal-item`}
    >
      <div className={styles.topRow}>
        <div className={styles.iconCircle}>
          <Icon size={18} />
        </div>
        <span className={styles.cardTag}>[ WHY ZZZ ]</span>
      </div>
      <div className={styles.content}>
        <h3>
          {title.split(" ").map((word, i) => {
            const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
            const cleanHighlight = highlight.toLowerCase();
            const isHighlight = cleanWord.includes(cleanHighlight) || cleanHighlight.includes(cleanWord);
            return (
              <span key={i} className={isHighlight ? styles.highlight : ""}>
                {word}{" "}
              </span>
            );
          })}
        </h3>
        <p>
          {desc.split(" ").map((word, i) => {
            const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
            const cleanAccent = accent.toLowerCase();
            const isAccent = cleanWord.includes(cleanAccent) || cleanAccent.includes(cleanWord);
            return (
              <span key={i} className={isAccent ? styles.accentWord : ""}>
                {word}{" "}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

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

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: gridRef.current,
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
          <span className={styles.badge} style={{ opacity: 0 }}>[ 05 / OUR VALUES ]</span>
          <h2 style={{ opacity: 0 }}>A different breed of <span className={styles.headingAccent}>partner</span>.</h2>
          <p style={{ opacity: 0 }}>We work in small, highly aligned teams to build digital assets that scale businesses.</p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {USPS.map((usp, index) => (
            <UspCard key={index} {...usp} />
          ))}
        </div>
      </div>
    </section>
  );
}
