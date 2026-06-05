"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PortfolioHighlights.module.css";
import { CASE_STUDIES_DATA } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = ["DESIGN", "STRATEGY", "DEVELOPMENT", "MARKETING"];

const PORTFOLIO_DATA = CASE_STUDIES_DATA;

export default function PortfolioHighlights() {
  const [activeFilter, setActiveFilter] = useState("DESIGN");
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredItems = PORTFOLIO_DATA.filter(item => item.category === activeFilter);

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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="portfolio-highlights">
      <div className={styles.container}>
        
        {/* Header Block */}
        <div className={`${styles.headingBlock} gsap-reveal-children`} ref={headingRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 05 / OUR WORK ]</span>
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
