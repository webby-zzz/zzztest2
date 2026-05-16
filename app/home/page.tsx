"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Lightbulb, Target, TrendingUp, Users, Star, Zap, Shield } from "lucide-react";
import styles from "./page.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dataSectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !dataSectionRef.current) return;

    let ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: dataSectionRef.current,
          start: "top 5%", // Pin higher up
          end: `+=${window.innerHeight * (cards.length - 1)}`,
          pin: true,
          scrub: 1,
        }
      });

      cards.forEach((card, i) => {
        if (i === 0) return; // First card is already at top 0
        
        // Card comes up from bottom
        tl.fromTo(card, 
          { y: "100vh" }, 
          { y: 0, ease: "power2.out" }, 
          i * 1 // Playhead position
        );
      });
    }, containerRef);

    // Force recalculation after fonts load
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  const dummyData = [
    { number: "150+", label: "Brands Scaled" },
    { number: "300%", label: "Average ROI" },
    { number: "$50M", label: "Revenue Generated" },
    { number: "24/7", label: "Dedicated Support" },
  ];

  const usps = [
    { icon: <Target size={24} />, title: "Precision Targeting", desc: "We don't guess. We use data to find exactly where your audience is." },
    { icon: <TrendingUp size={24} />, title: "Relentless Growth", desc: "Our strategies are built for scale, ensuring long-term sustainable growth." },
    { icon: <Lightbulb size={24} />, title: "Creative Brilliance", desc: "Standing out requires more than just ads; it requires unforgettable creative." },
    { icon: <Users size={24} />, title: "Expert Team", desc: "A dedicated squad of specialists working tirelessly on your account." },
    { icon: <Zap size={24} />, title: "Rapid Execution", desc: "Speed is a feature. We deploy, test, and iterate faster than the competition." },
    { icon: <Shield size={24} />, title: "Brand Safety", desc: "Your brand equity is our priority. We scale aggressively without compromising trust." },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className={styles.container} ref={containerRef}>
      
      {/* HERO */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>We build brands that people love.</h1>
        <p className={styles.heroSubtitle}>
          ZZZ is India's premier marketing agency, blending data-driven precision with world-class creative to scale businesses to new heights.
        </p>
      </section>

      {/* COMPANY BRIEF BOX */}
      <section className={styles.box}>
        <p className={styles.briefText}>
          We believe that every brand has a unique story. Our mission is to tell that story to the right people, at the right time, in the most impactful way possible. From startups to enterprises, we are the growth engine behind your success.
        </p>
      </section>

      {/* USPS GRID */}
      <section className={styles.uspsGrid}>
        <div className={styles.sectionHeaderLeft}>
          <h2>Browse our set of core services</h2>
        </div>
        <div className={styles.uspsCardsContainer}>
          {usps.map((usp, i) => (
            <div key={i} className={styles.uspCard}>
              <h3 className={styles.uspTitle}>{usp.title}</h3>
              <p className={styles.uspDesc}>{usp.desc}</p>
              <div className={styles.uspIcon}>{usp.icon}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STICKY PARALLAX DATA CARDS */}
      <section className={styles.dataSection} ref={dataSectionRef}>
        <div className={styles.sectionHeader}>
          <h2>The Numbers Speak</h2>
        </div>
        
        <div className={styles.cardsContainer}>
          {dummyData.map((data, i) => (
            <div 
              key={i} 
              className={styles.dataCard}
              ref={(el) => { cardsRef.current[i] = el; }}
              style={{ zIndex: i + 1 }}
            >
              <div className={styles.dataNumber}>{data.number}</div>
              <div className={styles.dataLabel}>{data.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES SNIPPET */}
      <section className={styles.servicesSnippet}>
        <div className={styles.sectionHeaderLeft}>
          <h2>What We Do</h2>
        </div>
        <div 
          className={`${styles.servicesScrollWrapper} ${isDragging ? styles.dragging : ''}`}
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {["Brand Strategy", "Performance Marketing", "Creative Direction", "Web Experience"].map((service, i) => (
            <div key={i} className={styles.serviceSnippetCard}>
              <h3 className={styles.serviceSnippetTitle}>{service}</h3>
              <Link href="/" style={{ opacity: 0.5, display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                Explore <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className={styles.formSection}>
        <div className={styles.sectionHeader}>
          <h2>Let's Talk</h2>
        </div>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Your Name" className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Email Address" className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <textarea placeholder="Tell us about your project..." className={styles.textarea}></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>Submit Request</button>
        </form>
      </section>

      {/* CLIENT LOGOS MARQUEE */}
      <section className={styles.clienteleSection}>
        <div className={styles.marquee}>
          {[1, 2].map((group) => (
            <div key={group} className={styles.marqueeContent}>
              <div className={styles.logoBox}>BRAND X</div>
              <div className={styles.logoBox}>ACME CORP</div>
              <div className={styles.logoBox}>GLOBAL LTD</div>
              <div className={styles.logoBox}>TECH INNOVATE</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
