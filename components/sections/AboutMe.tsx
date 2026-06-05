"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/lib/use3DTilt";
import { Linkedin, ArrowRight } from "lucide-react";
import styles from "./AboutMe.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutMe() {
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageFrame = use3DTilt(8, -12);

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
          <h2 style={{ opacity: 0 }}>The mind behind the <span className={styles.headingAccent}>creations</span>.</h2>
          <p style={{ opacity: 0 }}>Bridging the gap between creative visual logic and clean frontend performance.</p>
        </div>

        {/* Content Layout */}
        <div className={styles.layoutGrid} ref={contentRef}>
          
          {/* Left Column: Portrait Frame */}
          <div 
            className={`${styles.imageCol} gsap-reveal-item`} 
            style={{ opacity: 0 }}
          >
            <div 
              ref={imageFrame.ref}
              style={{ ...imageFrame.style }}
              className={`${styles.imageWrapper} glassmorphism`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" 
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
            <h3 className={styles.bioTitle}>A commitment to high-fidelity execution.</h3>
            
            <p className={styles.bioParagraph}>
              Hi, I&apos;m Avantika, the founder of ZZZ. I lead a boutique collective focused on crafting pixel-precise, highly optimized web layouts. We believe in relentless subtraction—stripping away visual noise to build high-performance Next.js systems that turn traffic into conversions.
            </p>

            <div className={styles.actionRow}>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.linkedinBtn}
              >
                <Linkedin size={18} />
                <span>Connect on LinkedIn</span>
                <ArrowRight size={16} className={styles.arrow} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
