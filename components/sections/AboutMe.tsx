"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/lib/use3DTilt";
import { Linkedin } from "lucide-react";
import styles from "./AboutMe.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutMe() {
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      if (contentRef.current) {
        const children = contentRef.current.children;
        gsap.fromTo(children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 90%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="about-me">
      <div className={styles.container}>
        
        {/* Header Block */}
        <div className={`${styles.headingBlock} gsap-reveal-children`} ref={headingRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 09 / ABOUT ME ]</span>
          <h2 style={{ opacity: 0 }}>Hi, I'm <span className={styles.headingAccent}>Avantika</span>.</h2>
          <p style={{ opacity: 0 }}>Founder, marketer and believer in authentic brands.</p>
        </div>

        {/* Content Layout */}
        <div className={styles.layoutGrid} ref={contentRef}>
          
          {/* Left Column: Portrait Frame */}
          <div 
            className={`${styles.imageCol} gsap-reveal-item`} 
            style={{ opacity: 0 }}
          >
            <div 
              className={`${styles.imageWrapper} glassmorphism`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/founder image.webp" 
                alt="Founder Portrait" 
                className={styles.portrait}
              />
              <div className={styles.imageOverlay} />
            </div>
          </div>

          {/* Right Column: Bio Content */}
          <div 
            className={`${styles.textCol} glassmorphism gsap-reveal-item`} 
            style={{ opacity: 0 }}
          >
            <h3 className={styles.bioTitle}>Marketing isn't about being loud. It's about being remembered.</h3>
            
            <p className={styles.bioParagraph}>
              I'm Avantika Ginodia, founder of Zip Zap Zop Marketing. With 5+ years in the industry and a background in marketing from MICA, I've worked with 150+ brands across India and beyond.<br /><br />
              What started as a journey in content creation grew into a passion for helping brands find their voice, build meaningful connections and show up with consistency.<br /><br />
              Today, Zip Zap Zop helps businesses grow through thoughtful strategy, creative storytelling and content that feels genuine, not forced.
            </p>

            <div className={styles.actionRow}>
              <a 
                href="https://in.linkedin.com/in/avantika-ginodia" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.linkedinBtn}
              >
                <Linkedin size={18} />
                <span>Let's Connect →</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
