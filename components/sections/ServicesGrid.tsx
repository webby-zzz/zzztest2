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
    desc: "We plan, create and manage content that keeps your brand active and relevant.",
    image: "/our%20services%20hompage/Social%20Media%20marketing.webp",
    category: "MARKETING",
    timeframe: "Ongoing",
    tags: ["Content Strategy", "Community Growth", "Campaign Planning"]
  },
  {
    id: "content-creation",
    title: "Content Creation",
    desc: "Reels, posts and visuals designed specifically for your audience.",
    image: "/our%20services%20hompage/Content%20Creation.webp",
    category: "CREATIVE",
    timeframe: "2-4 WEEKS",
    tags: ["Reels", "Scripting", "Shooting"]
  },
  {
    id: "photography-videography",
    title: "Photography & Videography",
    desc: "Professional photo and video content for products, brands and campaigns.",
    image: "/our%20services%20hompage/photography%20%26%20videography.webp",
    category: "CREATIVE",
    timeframe: "2-4 WEEKS",
    tags: ["Product Shoots", "Model Shoots", "Content Production"]
  },
  {
    id: "website-development",
    title: "Website Development",
    desc: "Clean, user-friendly websites built to represent your business online.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
    category: "DEVELOPMENT",
    timeframe: "4-8 WEEKS",
    tags: ["Shopify", "UI/UX", "Industrial Websites"]
  },
  {
    id: "branding-packaging",
    title: "Branding & Packaging",
    desc: "Building memorable brands through thoughtful design and packaging.",
    image: "/our%20services%20hompage/Branding%20%26%20Packaging.webp",
    category: "DESIGN",
    timeframe: "4-6 WEEKS",
    tags: ["Brand Identity", "Packaging Design", "Print Media"]
  },
  {
    id: "brochures-catalogues",
    title: "Brochures & Catalogues",
    desc: "Marketing materials that present your products and services clearly.",
    image: "/our%20services%20hompage/Brochures%20%26%20Catalogues.webp",
    category: "DESIGN",
    timeframe: "2-3 WEEKS",
    tags: ["Company Profiles", "Product Catalogues", "E-Catalogues"]
  },
  {
    id: "linkedin-personal-branding",
    title: "LinkedIn Personal Branding",
    desc: "Helping founders and professionals build a stronger online presence.",
    image: "/our%20services%20hompage/LinkedIn%20Personal%20Branding.webp",
    category: "MARKETING",
    timeframe: "Ongoing",
    tags: ["Thought Leadership", "Founder Branding", "Profile Optimisation"]
  },
  {
    id: "event-invites-wedding-cards",
    title: "Event Invites & Wedding Cards",
    desc: "Custom invitations and cards designed for special occasions.",
    image: "/our%20services%20hompage/Event%20invites%20%26%20Wedding%20cards.webp",
    category: "CREATIVE",
    timeframe: "2-4 WEEKS",
    tags: ["Save The Date", "Event Cards", "Digital Invites"]
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
