"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SERVICES_DATA } from "../../lib/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PortfolioHighlights.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INDUSTRY_TABS = [
  { id: "fashion-lifestyle", name: "Fashion & Lifestyle" },
  { id: "jewellery", name: "Jewellery" },
  { id: "food-beverage", name: "Food & Beverage" },
  { id: "health-wellness", name: "Health & Wellness" },
  { id: "furniture-interiors", name: "Furniture & Interiors" },
  { id: "real-estate", name: "Real Estate" },
  { id: "institutions-education", name: "Institutions & Education" },
  { id: "fmcg-brands", name: "FMCG Brands" },
];

const INDUSTRY_LOGOS: Record<string, string[]> = {
  "fashion-lifestyle": [
    "Krishna Fashions logo.webp",
    "Trendz Salon logo.webp",
    "Hustle Culture logo.webp",
    "BoldPack logo.webp",
    "Altwood logo.webp",
    "Seventy Thirty Logo.webp"
  ],
  "jewellery": [
    "BC Sen logo.webp",
    "Dragon King logo.webp",
    "Ekaani logo.webp",
    "Matri Logo .webp"
  ],
  "food-beverage": [
    "Chef TeeDee logo.webp",
    "Crepes Logo.webp",
    "Gokul logo.webp",
    "Mirosh logo.webp",
    "Vedic Fuel logo.webp",
    "Klocal logo.webp"
  ],
  "health-wellness": [
    "Koala Kidz logo.webp",
    "Kidskart logo.webp",
    "TOHA logo.webp"
  ],
  "furniture-interiors": [
    "De Bella Decor logo.webp",
    "Deco Imagination logo.webp",
    "Decohome logo.webp",
    "Indecor logo.webp",
    "Lokaloom logo.webp",
    "SuperPly Logo.webp"
  ],
  "real-estate": [
    "Cove logo.webp",
    "House Of Dreams logo.webp",
    "Nicco logo.webp",
    "Cabcon logo.webp"
  ],
  "institutions-education": [
    "Born Scholar logo.webp",
    "Funcorp logo.webp",
    "Jatan logo.webp",
    "Kaanch logo.webp",
    "Prakassa logo.webp"
  ],
  "fmcg-brands": [
    "Crescentlite Logo.webp",
    "PDS logo.webp",
    "Shhyam Shah logo.webp",
    "Scrapyard logo.webp"
  ]
};

export default function PortfolioHighlights() {
  const [activeFilter, setActiveFilter] = useState("fashion-lifestyle");
  const galleryRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const currentLogos = INDUSTRY_LOGOS[activeFilter] || [];

  useEffect(() => {
    if (!galleryRef.current) return;
    const cards = galleryRef.current.querySelectorAll(`.${styles.logoItem}`);
    
    // Quick fade-in layout transition on filter change
    gsap.fromTo(cards,
      { opacity: 0, y: 15, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.04,
        duration: 0.5,
        ease: "power2.out"
      }
    );
  }, [activeFilter]);

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
        const cards = galleryRef.current.querySelectorAll(`.${styles.logoItem}`);
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.06,
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

        {/* Filter Pills - Service Tabs */}
        <div className={styles.filterWrapper}>
          <div className={`${styles.filterPills} glassmorphism`}>
            {SERVICES_DATA.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className={styles.filterBtn}
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Client Logos Grid hidden for now */}
        {/*
        <div className={styles.logosGrid} ref={galleryRef}>
          {currentLogos.map((logoFile, index) => (
            <div key={index} className={`${styles.logoItem} gsap-reveal-item`} style={{ opacity: 0 }}>
              <img 
                src={`/zzz clientele optimized/${logoFile}`} 
                alt={`${activeFilter} client logo ${index}`} 
                className={styles.clientLogo} 
              />
            </div>
          ))}
        </div>
        */}

      </div>
    </section>
  );
}
