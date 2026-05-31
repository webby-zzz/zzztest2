"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ServicesGrid.module.css";
import { 
  Sparkles, 
  Laptop, 
  Smartphone, 
  PenTool, 
  Search, 
  TrendingUp, 
  Share2, 
  Video, 
  Camera 
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES_GRID_DATA = [
  {
    title: "Brand Strategy & Identity",
    desc: "From corporate foundations to complete visual assets.",
    teaser: "We construct detailed design guidelines and corporate foundations. Let's design a voice that cuts through the market clutter.",
    icon: Sparkles,
  },
  {
    title: "Web Design",
    desc: "Premium interfaces built for maximum scroll impact.",
    teaser: "We combine layout design with pixel precision. Experience custom visual paths that engage users instantly.",
    icon: Laptop,
  },
  {
    title: "App Development",
    desc: "Blazing fast react structures with zero load overhead.",
    teaser: "We engineer Next.js architectures optimized for speed and longevity. Get clean source code that scales effortlessly.",
    icon: Smartphone,
  },
  {
    title: "Copywriting & Copy",
    desc: "High-intent messaging designed to convert visitors.",
    teaser: "We craft copy lines that capture user interest. Replace generic descriptions with high-converting marketing frameworks.",
    icon: PenTool,
  },
  {
    title: "SEO & Search Strategy",
    desc: "Securing search visibility that drives organic inbound.",
    teaser: "Our technical audit process targets high-intent keyword ranks. Rank at the top and convert visitors without ad spend.",
    icon: Search,
  },
  {
    title: "Performance Marketing",
    desc: "Targeted scaling pipelines built around transparent data.",
    teaser: "We construct advertising paths that track real customer acquisition. Optimize budget allocation with clear ROI maps.",
    icon: TrendingUp,
  },
  {
    title: "Social Media Growth",
    desc: "Engaging brand content that builds loyal customer bases.",
    teaser: "We schedule, write, and produce media templates tailored for growth. Turn casual scrolls into active community members.",
    icon: Share2,
  },
  {
    title: "Motion & 3D Design",
    desc: "Subtle transitions and models that capture attention.",
    teaser: "We animate UI systems, custom products, and brand reels. Elevate visual hierarchy with custom frame interactions.",
    icon: Video,
  },
  {
    title: "Creative Production",
    desc: "Premium photo shoots and video assets for campaigns.",
    teaser: "We produce campaign-ready assets built around high-fidelity cameras. Make a lasting first impression across all media channels.",
    icon: Camera,
  }
];

function ServiceFlipCard({ title, desc, teaser, icon: Icon }: typeof SERVICES_GRID_DATA[0]) {
  return (
    <div className={`${styles.cardContainer} gsap-reveal-item`} style={{ opacity: 0 }}>
      <div className={styles.cardInner}>
        
        {/* Front of Card */}
        <div className={`${styles.cardFront} glassmorphism`}>
          <div className={styles.circleGraphic}>
            <Icon size={22} className={styles.icon} />
          </div>
          <div className={styles.cardContent}>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        </div>

        {/* Back of Card */}
        <div className={`${styles.cardBack} glassmorphism`}>
          <h4 className={styles.backTitle}>{title}</h4>
          <p className={styles.backTeaser}>{teaser}</p>
          <button className={styles.ctaButton}>
            Explore <span>→</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
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

    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(`.${styles.cardContainer}`);
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
            trigger: containerRef.current,
            start: "top 92%",
          }
        }
      );
    }
  }, []);

  return (
    <section className={styles.section} id="services-grid">
      <div className={styles.container}>
        <div className={`${styles.headingBlock} gsap-reveal-children`} ref={headingRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 03 / WHAT WE DO ]</span>
          <h2 style={{ opacity: 0 }}>Our <span className={styles.headingAccent}>services</span>.</h2>
          <p style={{ opacity: 0 }}>From a single logo to a full brand ecosystem — we cover it all.</p>
        </div>

        <div className={styles.grid} ref={containerRef}>
          {SERVICES_GRID_DATA.map((srv, index) => (
            <ServiceFlipCard key={index} {...srv} />
          ))}
        </div>
      </div>
    </section>
  );
}
