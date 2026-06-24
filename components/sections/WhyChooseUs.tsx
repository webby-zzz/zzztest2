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
    desc: "Helping brands stay relevant in a fast-moving industry.",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Jewellery",
    desc: "Highlighting the details that make every collection unique.",
    icon: Gem,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Food & Beverage",
    desc: "Making products look as good as they taste.",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Health & Wellness",
    desc: "Building confidence through clear and trustworthy communication.",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Furniture & Interiors",
    desc: "Showcasing spaces, products and design with purpose.",
    icon: Home,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Real Estate",
    desc: "Helping buyers see more than just a property listing.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Institutions & Education",
    desc: "Communicating values, credibility and student experiences.",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "FMCG Brands",
    desc: "Helping products stand out where purchase decisions happen.",
    icon: ShoppingBag,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop"
  }
];

const TAB_COLORS = [
  { bg: "#0E2D54", text: "#FFFFFF", desc: "rgba(255, 255, 255, 0.75)" }, // Navy
  { bg: "#5188B5", text: "#FFFFFF", desc: "rgba(255, 255, 255, 0.8)" },  // Blue
  { bg: "#DCC5DF", text: "#0E2D54", desc: "rgba(14, 45, 84, 0.75)" },  // Lavender
  { bg: "#FFB703", text: "#0E2D54", desc: "rgba(14, 45, 84, 0.75)" },  // Yellow
  { bg: "#FAF8F1", text: "#F66C51", desc: "rgba(246, 108, 81, 0.8)" },   // Cream
  { bg: "#C0E1D2", text: "#0E2D54", desc: "rgba(14, 45, 84, 0.75)" },  // Mint
  { bg: "#0E2D54", text: "#FAF8F1", desc: "rgba(250, 248, 241, 0.75)" }, // Navy
  { bg: "#F66C51", text: "#FFFFFF", desc: "rgba(255, 255, 255, 0.8)" }   // Coral
];

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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
          <p style={{ opacity: 0 }}>From selling cupcakes to selling square feet, we've done both.</p>
          <span className={styles.mobileTapHint} style={{ opacity: 0 }}>*Tap an industry to know more</span>
        </div>

        {/* Split Layout */}
        <div className={styles.splitLayout}>
          
          {/* Left Column: Vertical Interactive List */}
          <div 
            className={styles.listCol} 
            ref={listRef}
            onMouseLeave={() => {
              if (window.matchMedia('(hover: hover)').matches) {
                setActiveIndex(null);
              }
            }}
          >
            {INDUSTRIES.map((industry, index) => {
              const Icon = industry.icon;
              const isActive = index === activeIndex;
              const colors = TAB_COLORS[index % TAB_COLORS.length];
              return (
                <div
                  key={index}
                  className={`${styles.listItem} ${isActive ? styles.activeItem : ""} gsap-reveal-item`}
                  onMouseEnter={() => {
                    if (window.matchMedia('(hover: hover)').matches) {
                      setActiveIndex(index);
                    }
                  }}
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  style={{ 
                    opacity: 0,
                    "--tab-bg": colors.bg,
                    "--tab-text": colors.text,
                    "--tab-desc": colors.desc,
                  } as React.CSSProperties}
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
                  src={INDUSTRIES[activeIndex !== null ? activeIndex : 0].image} 
                  alt={INDUSTRIES[activeIndex !== null ? activeIndex : 0].title} 
                  className={styles.previewImage}
                  key={activeIndex !== null ? activeIndex : "default"} // Triggers remount animation
                />
                <div className={styles.previewOverlay}>
                  <div className={styles.previewLabelRow}>
                    <span className={styles.previewTag}>[ PREVIEW ]</span>
                    <span className={styles.previewIndustryName}>
                      {activeIndex !== null ? INDUSTRIES[activeIndex].title : "Select an Industry"}
                    </span>
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
