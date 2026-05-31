"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Testimonials.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS_DATA = [
  {
    quote: "Your contribution has been very valuable to us, hope you know how important you are to the team. All the success in absence, parsed it, haha!",
    author: "Pratham Anant",
    role: "Founder & Influencer",
    company: "RE-VALUED MEDIA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    quote: "Working with ZZZ has transformed our digital funnel completely. We increased our landing conversion rate by 180% within three months of deployment.",
    author: "Sarah Jenkins",
    role: "Director of Product",
    company: "LUMOS INC",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop",
  },
  {
    quote: "Their focus on high-fidelity animations, clean execution, and pixel-perfect responsiveness set them apart from standard web agencies.",
    author: "Hiroshi Sato",
    role: "Head of Marketing",
    company: "KAIZEN STUDIOS",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
  }
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 92%",
          }
        }
      );
    }
  }, []);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[activeIdx];

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <div className={`${styles.headingBlock} gsap-reveal-children`} ref={headingRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 09 / CLIENT REVIEWS ]</span>
          <h2 style={{ opacity: 0 }}>Hear from our <span className={styles.headingAccent}>partners</span>.</h2>
          <p style={{ opacity: 0 }}>With over 50+ clients served, here is what they have to say.</p>
        </div>

        <div className={styles.carouselContainer}>
          <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous testimonial">
            <ChevronLeft size={20} />
          </button>

          <div className={`${styles.testimonialCard} glassmorphism gsap-reveal-item`} style={{ opacity: 0 }} ref={cardRef}>
            <div className={styles.avatarWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.avatar} alt={current.author} className={styles.avatar} />
              <div className={styles.playOverlay}>
                <div className={styles.playIconCircle}>
                  <Play size={20} fill="currentColor" />
                </div>
              </div>
            </div>

            <div className={styles.contentCol}>
              <p className={styles.quote}>"{current.quote}"</p>
              <div className={styles.meta}>
                <div className={styles.authorDetails}>
                  <span className={styles.authorName}>{current.author}</span>
                  <span className={styles.authorRole}>{current.role}</span>
                </div>
                <span className={styles.companyName}>{current.company}</span>
              </div>
            </div>
          </div>

          <button className={styles.navBtn} onClick={handleNext} aria-label="Next testimonial">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
