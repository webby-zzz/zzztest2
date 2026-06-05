"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Testimonials.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ROW1_DATA = [
  {
    quote: "Your contribution has been very valuable to us, hope you know how important you are to the team. All the success in absence, parsed it, haha!",
    author: "Pratham Anant",
    role: "Founder",
    company: "RE-VALUED MEDIA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote: "Working with ZZZ has transformed our digital funnel completely. We increased our landing conversion rate by 180% within three months.",
    author: "Sarah Jenkins",
    role: "Director of Product",
    company: "LUMOS INC",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote: "Their focus on high-fidelity animations, clean execution, and pixel-perfect responsiveness set them apart from standard web agencies.",
    author: "Hiroshi Sato",
    role: "Head of Marketing",
    company: "KAIZEN STUDIOS",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote: "The branding strategy they built for us gave our agency a premium voice that cuts through the market noise instantly.",
    author: "Elena Rostova",
    role: "Creative Director",
    company: "NOVA STUDIO",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  }
];

const ROW2_DATA = [
  {
    quote: "Outstanding speed, flawless Next.js code, and stellar communication throughout the design and integration cycles.",
    author: "Marcus Chen",
    role: "VP of Engineering",
    company: "NEXUS GROUP",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote: "We launched our limited drop with ZZZ's campaign setup and sold out in record time. Absolutely phenomenal execution.",
    author: "Amelie Laurent",
    role: "Brand Lead",
    company: "EQUINOX CO",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote: "The 3D transitions and Lenis scrolling they implemented are stunning. Our visitors keep talking about how premium our site feels.",
    author: "Vikram Mehta",
    role: "Founder",
    company: "SPATIAL ART",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote: "They brought deep strategic insights to our rebrand. The entire identity feels coherent, bold, and ready for future scale.",
    author: "Sophia Martinez",
    role: "Managing Director",
    company: "APEX DIGI",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
  }
];

export default function Testimonials() {
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <div className={`${styles.headingBlock} gsap-reveal-children`} ref={headingRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 06 / CLIENT REVIEWS ]</span>
          <h2 style={{ opacity: 0 }}>Hear from our <span className={styles.headingAccent}>partners</span>.</h2>
          <p style={{ opacity: 0 }}>With over 50+ clients served, here is what they have to say.</p>
        </div>

        <div className={styles.marqueeContainer}>
          {/* Row 1: Right to Left */}
          <div className={styles.marqueeTrack}>
            <div className={`${styles.marqueeRow} ${styles.scrollLeft}`}>
              {[...ROW1_DATA, ...ROW1_DATA].map((t, idx) => (
                <div key={`row1-${idx}`} className={`${styles.testimonialCard} glassmorphism`}>
                  <p className={styles.quote}>"{t.quote}"</p>
                  <div className={styles.meta}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.avatar} alt={t.author} className={styles.avatar} />
                    <div className={styles.authorDetails}>
                      <span className={styles.authorName}>{t.author}</span>
                      <span className={styles.authorRole}>{t.role} @ <span className={styles.companyName}>{t.company}</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Left to Right */}
          <div className={styles.marqueeTrack}>
            <div className={`${styles.marqueeRow} ${styles.scrollRight}`}>
              {[...ROW2_DATA, ...ROW2_DATA].map((t, idx) => (
                <div key={`row2-${idx}`} className={`${styles.testimonialCard} glassmorphism`}>
                  <p className={styles.quote}>"{t.quote}"</p>
                  <div className={styles.meta}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.avatar} alt={t.author} className={styles.avatar} />
                    <div className={styles.authorDetails}>
                      <span className={styles.authorName}>{t.author}</span>
                      <span className={styles.authorRole}>{t.role} @ <span className={styles.companyName}>{t.company}</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
