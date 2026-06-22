"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./PortfolioHighlights.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES_TABS = [
  { id: "social-media-marketing", name: "Social Media Marketing" },
  { id: "content-creation", name: "Content Creation" },
  { id: "photography-videography", name: "Photography & Videography" },
  { id: "website-development", name: "Website Development" },
  { id: "branding-packaging", name: "Branding & Packaging" },
  { id: "brochures-catalogues", name: "Brochures & Catalogues" },
  { id: "linkedin-personal-branding", name: "LinkedIn Personal Branding" },
  { id: "event-invites-wedding-cards", name: "Event Invites & Wedding Cards" },
];

const SERVICE_LOGOS: Record<string, string[]> = {
  "social-media-marketing": [
    "Chef TeeDee logo.webp",
    "Crepes Logo.webp",
    "Funcorp logo.webp",
    "Hustle Culture logo.webp",
    "Klocal logo.webp",
    "Seventy Thirty Logo.webp",
    "Trendz Salon logo.webp"
  ],
  "content-creation": [
    "Koala Kidz logo.webp",
    "Mirosh logo.webp",
    "Scrapyard logo.webp",
    "TOHA logo.webp",
    "Born Scholar logo.webp"
  ],
  "photography-videography": [
    "De Bella Decor logo.webp",
    "Matri Logo .webp",
    "Travellers Paraadise logo.webp",
    "Vedic Fuel logo.webp"
  ],
  "website-development": [
    "Cabcon logo.webp",
    "Cove logo.webp",
    "Crescentlite Logo.webp",
    "PDS logo.webp"
  ],
  "branding-packaging": [
    "BoldPack logo.webp",
    "Ekaani logo.webp",
    "SuperPly Logo.webp",
    "House Of Dreams logo.webp"
  ],
  "brochures-catalogues": [
    "Altwood logo.webp",
    "Deco Imagination logo.webp",
    "Decohome logo.webp",
    "Indecor logo.webp",
    "Lokaloom logo.webp"
  ],
  "linkedin-personal-branding": [
    "Jatan logo.webp",
    "Kaanch logo.webp",
    "Prakassa logo.webp",
    "Shhyam Shah logo.webp"
  ],
  "event-invites-wedding-cards": [
    "BC Sen logo.webp",
    "Dragon King logo.webp",
    "Gabha Kreations logo.webp",
    "Krishna Fashions logo.webp",
    "Myaha logo.webp",
    "Nicco logo.webp"
  ]
};

export default function PortfolioHighlights() {
  const [activeFilter, setActiveFilter] = useState("social-media-marketing");
  const galleryRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const currentLogos = SERVICE_LOGOS[activeFilter] || [];

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
            {SERVICES_TABS.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.filterBtn} ${activeFilter === tab.id ? styles.activeFilter : ""}`}
                onClick={() => setActiveFilter(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Client Logos Grid */}
        <div className={styles.logosGrid} ref={galleryRef}>
          {currentLogos.map((logoFile, index) => (
            <div key={index} className={`${styles.logoItem} gsap-reveal-item`} style={{ opacity: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={`/zzz clientele optimized/${logoFile}`} 
                alt={`${activeFilter} client logo ${index}`} 
                className={styles.clientLogo} 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
