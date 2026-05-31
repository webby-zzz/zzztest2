"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PortfolioHighlights.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = ["ALL", "DESIGN", "STRATEGY", "DEVELOPMENT", "MARKETING"];

const PORTFOLIO_DATA = [
  {
    name: "Apple Ecosystem",
    category: "DESIGN",
    role: "UI/UX, 3D Design",
    timeframe: "6 months",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=1000&auto=format&fit=crop",
    heightClass: "tall"
  },
  {
    name: "Kaizen Dashboard",
    category: "DEVELOPMENT",
    role: "Next.js, Tailwind",
    timeframe: "3 months",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    heightClass: "medium"
  },
  {
    name: "Nike SNKRS Launch",
    category: "MARKETING",
    role: "Campaign Strategy",
    timeframe: "4 months",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    heightClass: "short"
  },
  {
    name: "Minimalist Watch Mockup",
    category: "DESIGN",
    role: "3D Rendering & Art",
    timeframe: "2 months",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    heightClass: "medium"
  },
  {
    name: "Lumos Rebrand Project",
    category: "STRATEGY",
    role: "Brand Positioning",
    timeframe: "5 months",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop",
    heightClass: "tall"
  },
  {
    name: "Nova App Launch",
    category: "DEVELOPMENT",
    role: "React Native Dev",
    timeframe: "4 months",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop",
    heightClass: "short"
  },
  {
    name: "Equinox Funnel Campaign",
    category: "MARKETING",
    role: "Growth Advisory",
    timeframe: "3 months",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    heightClass: "medium"
  }
];

export default function PortfolioHighlights() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeFilter === "ALL" 
    ? PORTFOLIO_DATA 
    : PORTFOLIO_DATA.filter(item => item.category === activeFilter);

  useEffect(() => {
    if (!galleryRef.current) return;
    const cards = galleryRef.current.querySelectorAll(`.${styles.portfolioItem}`);
    
    // Quick fade-in layout transition on filter change
    gsap.fromTo(cards,
      { opacity: 0, y: 15, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out"
      }
    );
  }, [activeFilter]);

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

    if (galleryRef.current) {
      const cards = galleryRef.current.querySelectorAll(`.${styles.portfolioItem}`);
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
            trigger: galleryRef.current,
            start: "top 92%",
          }
        }
      );
    }
  }, []);

  return (
    <section className={styles.section} id="portfolio-highlights">
      <div className={styles.container}>
        
        {/* Header Block */}
        <div className={`${styles.headingBlock} gsap-reveal-children`} ref={headingRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 07 / CASE STUDIES ]</span>
          <h2 style={{ opacity: 0 }}>A curation of featured <span className={styles.headingAccent}>creations</span>.</h2>
          <p style={{ opacity: 0 }}>We build interactive products and marketing strategies that set new standards.</p>
        </div>

        {/* Filter Pills */}
        <div className={styles.filterWrapper}>
          <div className={`${styles.filterPills} glassmorphism`}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeFilter === cat ? styles.activeFilter : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout */}
        <div className={styles.masonryGrid} ref={galleryRef}>
          {filteredItems.map((project, index) => (
            <div key={index} className={`${styles.portfolioItem} ${styles[project.heightClass]} gsap-reveal-item`} style={{ opacity: 0 }}>
              <div className={`${styles.imageWrapper} glassmorphism`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt={project.name} className={styles.image} />
                <div className={styles.overlay}>
                  <div className={styles.metaRow}>
                    <span>{project.role}</span>
                    <span>•</span>
                    <span>{project.timeframe}</span>
                  </div>
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.titleRow}>
                  <h3>{project.name}</h3>
                  <span className={styles.projectTag}>{project.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
