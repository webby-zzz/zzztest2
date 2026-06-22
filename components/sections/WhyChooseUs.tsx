"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/lib/use3DTilt";
import styles from "./WhyChooseUs.module.css";
import { 
  ShoppingBag, 
  BookOpen, 
  Heart, 
  Sparkles,
  Gem,
  Utensils,
  Home,
  Building2
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INDUSTRIES = [
  {
    title: "Fashion",
    desc: "Curating high-fidelity lookbooks, visual storytelling campaigns, and premium motion content for fashion lines.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Jewellery",
    desc: "Designing high-end editorial grids, product-focused showcases, and trust metrics for premium jewellery brands.",
    icon: Gem,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Food and Beverage",
    desc: "Crafting scroll-stopping content, aesthetic packaging mockups, and localized digital campaigns.",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Health and Wellness",
    desc: "Creating calm, trust-focused brand layouts, booking experiences, and organic social authority.",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Furniture & Interiors",
    desc: "Developing spatial visual catalogs, architectural portfolios, and elegant interior design aesthetics.",
    icon: Home,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Real Estate",
    desc: "Constructing immersive digital listings, premium site tour layouts, and high-converting funnel metrics.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Institutions & Education",
    desc: "Structuring clean information architectures, academic landing assets, and accessible resource portals.",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "FMCG Brands",
    desc: "Designing high-impact package visuals, mass-market social campaigns, and retail scaling assets.",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop"
  }
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const tiltFrame = use3DTilt(10, -10);

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

      if (listRef.current) {
        gsap.fromTo(listRef.current.children,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.06,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 90%",
            }
          }
        );
      }

      if (previewRef.current) {
        gsap.fromTo(previewRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: previewRef.current,
              start: "top 90%",
            }
          }
        );
      }

      const mm = gsap.matchMedia();
      mm.add("(max-width: 900px)", () => {
        if (listRef.current) {
          const items = Array.from(listRef.current.children) as HTMLElement[];
          items.forEach((item, index) => {
            ScrollTrigger.create({
              trigger: item,
              start: "top 55%",
              end: "bottom 45%",
              onToggle: (self) => {
                if (self.isActive) {
                  setActiveIndex(index);
                }
              }
            });
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="industries">
      <div className={styles.container}>
        
        {/* Header Block */}
        <div className={`${styles.headingBlock} gsap-reveal-children`} ref={headingRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 04 / INDUSTRIES ]</span>
          <h2 style={{ opacity: 0 }}>Industries we <span className={styles.headingAccent}>partner</span> with.</h2>
          <p style={{ opacity: 0 }}>We apply high-fidelity interfaces and optimization metrics to diverse niches.</p>
        </div>

        {/* Split Layout */}
        <div className={styles.splitLayout}>
          
          {/* Left Column: Vertical Interactive List */}
          <div className={styles.listCol} ref={listRef}>
            {INDUSTRIES.map((industry, index) => {
              const Icon = industry.icon;
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  className={`${styles.listItem} ${isActive ? styles.activeItem : ""} gsap-reveal-item`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  style={{ opacity: 0 }}
                >
                  <div className={styles.itemHeader}>
                    <div className={styles.itemTitleBlock}>
                      <span className={styles.itemNum}>0{index + 1}</span>
                      <h3 className={styles.itemTitle}>{industry.title}</h3>
                    </div>
                    <Icon size={18} className={styles.itemIcon} />
                  </div>
                  
                  <div className={styles.itemBody}>
                    <p className={styles.itemDesc}>{industry.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Frame (3D Tilt) */}
          <div 
            className={`${styles.previewCol} gsap-reveal-item`} 
            ref={previewRef}
            style={{ opacity: 0 }}
          >
            <div 
              ref={tiltFrame.ref}
              style={{ ...tiltFrame.style }}
              className={`${styles.previewCard} glassmorphism`}
            >
              <div className={styles.previewImageWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={INDUSTRIES[activeIndex].image} 
                  alt={INDUSTRIES[activeIndex].title} 
                  className={styles.previewImage}
                  key={activeIndex} // Triggers remount animation
                />
                <div className={styles.previewOverlay}>
                  <div className={styles.previewLabelRow}>
                    <span className={styles.previewTag}>[ PREVIEW ]</span>
                    <span className={styles.previewIndustryName}>{INDUSTRIES[activeIndex].title}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
