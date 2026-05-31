"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/lib/use3DTilt";
import styles from "./BlogInsights.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ARTICLES = [
  {
    tag: "AESTHETICS",
    date: "MAY 28, 2026",
    title: "Relentless subtraction: the art of minimal digital layouts.",
    desc: "Why reducing visual noise increases conversion rates and brand premium values.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop"
  },
  {
    tag: "CONVERSION",
    date: "MAY 14, 2026",
    title: "Designing for speed: how millisecond loads drive retention.",
    desc: "Technical deep-dive on hydration, asset pipelines, and animations.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
  },
  {
    tag: "STRATEGY",
    date: "APRIL 30, 2026",
    title: "Ditch the vanity: transparent metrics that stakeholders value.",
    desc: "A case study on building attribution-first reporting tools.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
  }
];

function BlogCard({ tag, date, title, desc, image }: typeof ARTICLES[0]) {
  const card = use3DTilt(10, -15);
  
  return (
    <article 
      ref={card.ref} 
      style={{ ...card.style, opacity: 0 }} 
      className={`${styles.card} glassmorphism gsap-reveal-item`}
    >
      <div className={styles.imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className={styles.image} />
        <span className={styles.cardTag}>{tag}</span>
      </div>
      
      <div className={styles.cardContent}>
        <span className={styles.date}>{date}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </article>
  );
}

export default function BlogInsights() {
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
      const cards = containerRef.current.querySelectorAll(`.${styles.card}`);
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
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
    <section className={styles.section} id="blog-insights">
      <div className={styles.container}>
        <div className={`${styles.headingBlock} gsap-reveal-children`} ref={headingRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 11 / JOURNAL ]</span>
          <h2 style={{ opacity: 0 }}>Insights on design & <span className={styles.headingAccent}>performance</span>.</h2>
          <p style={{ opacity: 0 }}>Read our recent publications detailing visual methodologies, tech stacks, and conversions.</p>
        </div>

        <div className={styles.grid} ref={containerRef}>
          {ARTICLES.map((article, index) => (
            <BlogCard key={index} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
