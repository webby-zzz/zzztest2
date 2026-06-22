"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Tag } from "lucide-react";
import Link from "next/link";
import styles from "./ServicesGrid.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES_GRID_DATA = [
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    desc: "Engaging brand content and community management across platforms.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop",
    category: "MARKETING",
    timeframe: "Ongoing",
    tags: ["INSTAGRAM", "COMMUNITY"]
  },
  {
    id: "content-creation",
    title: "Content Creation",
    desc: "Bespoke reels, carousels, and visual posts tailored for your audience.",
    image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=600&auto=format&fit=crop",
    category: "CREATIVE",
    timeframe: "2-4 WEEKS",
    tags: ["REELS", "GRAPHICS"]
  },
  {
    id: "photography-videography",
    title: "Photography & Videography",
    desc: "Premium product shoots and campaign video production.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop",
    category: "CREATIVE",
    timeframe: "2-4 WEEKS",
    tags: ["SHOOTS", "EDITING"]
  },
  {
    id: "website-development",
    title: "Website Development",
    desc: "Ultra-fast Next.js code structures with organic search ranking strategies.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
    category: "DEVELOPMENT",
    timeframe: "4-8 WEEKS",
    tags: ["NEXT.JS", "SEO"]
  },
  {
    id: "branding-packaging",
    title: "Branding & Packaging",
    desc: "Distinct visual identities, premium package layouts, and complete brand style guides.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop",
    category: "DESIGN",
    timeframe: "4-6 WEEKS",
    tags: ["IDENTITY", "TACTILE"]
  },
  {
    id: "brochures-catalogues",
    title: "Brochures & Catalogues",
    desc: "Elegant print layouts, digital lookbooks, and high-impact catalogues.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=600&auto=format&fit=crop",
    category: "DESIGN",
    timeframe: "2-3 WEEKS",
    tags: ["PRINT", "EDITORIAL"]
  },
  {
    id: "linkedin-personal-branding",
    title: "LinkedIn Personal Branding",
    desc: "Authority-building thought leadership content for founders and brands.",
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=60&w=600&auto=format&fit=crop",
    category: "MARKETING",
    timeframe: "Ongoing",
    tags: ["FOUNDER B2B", "INFLUENCE"]
  },
  {
    id: "event-invites-wedding-cards",
    title: "Event Invites & Wedding Cards",
    desc: "Exclusive bespoke stationery, digital invites, and premium wedding card designs.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    category: "CREATIVE",
    timeframe: "2-4 WEEKS",
    tags: ["STATIONERY", "BESPOKE"]
  }
];

const CARD_ACCENTS = [
  "#5188B5", // Blue
  "#FFB703", // Yellow
  "#F66C51", // Coral
  "#DCC5DF", // Lavender
  "#C0E1D2", // Mint
];

interface ServiceCardProps {
  id: string;
  title: string;
  desc: string;
  image: string;
  category: string;
  timeframe: string;
  tags: string[];
}

function ServiceCard({ id, title, desc, image, category, tags, accentColor }: Omit<ServiceCardProps, 'timeframe'> & { accentColor: string }) {
  return (
    <Link href={`/services/${id}`} className={styles.cardLink} scroll={false}>
      <div 
        className={`${styles.card} glassmorphism gsap-reveal-item`} 
        style={{ 
          opacity: 0,
          "--card-accent": accentColor
        } as React.CSSProperties}
      >
        <div className={styles.imageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} className={styles.image} />
        </div>
        
        <div className={styles.cardContent}>
          <div className={styles.metaRow}>
            <span className={styles.categoryTag}>{category}</span>
          </div>
          
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDesc}>{desc}</p>
          
          <div className={styles.pillsRow}>
            {tags.map((tag, idx) => (
              <span key={idx} className={styles.pill}>
                <Tag size={10} className={styles.tagIcon} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
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

      if (containerRef.current) {
        const cards = containerRef.current.querySelectorAll(`.${styles.card}`);
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 92%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
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
          {SERVICES_GRID_DATA.map((srv, index) => {
            const accentColor = CARD_ACCENTS[index % CARD_ACCENTS.length];
            return (
              <ServiceCard 
                key={index} 
                {...srv} 
                accentColor={accentColor} 
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
