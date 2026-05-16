"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.css";
import { BRANDS_DUMMY_DATA } from "../../../lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceClient({ service }: { service: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const showcaseRef = useRef<HTMLDivElement>(null);
  
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);

  useEffect(() => {
    // Scroll to top instantly on mount to ensure transition is seamless
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Hero Overlay Fade In
      if (heroOverlayRef.current) {
        gsap.to(heroOverlayRef.current, {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.2 // small delay to let the page transition settle
        });
      }

      // 2. Animate all text elements on scroll
      textRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // 3. Showcase Window Fade In
      if (showcaseRef.current) {
        gsap.fromTo(showcaseRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: showcaseRef.current,
              start: "top 80%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [service]);

  // Handle Tab Change Animation
  const handleTabChange = (index: number) => {
    if (index === activeBrandIndex) return;
    
    // Fade out showcase content, change data, fade back in
    if (showcaseRef.current) {
      gsap.to(showcaseRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          setActiveBrandIndex(index);
          gsap.to(showcaseRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      });
    } else {
      setActiveBrandIndex(index);
    }
  };

  const activeBrand = BRANDS_DUMMY_DATA[activeBrandIndex];

  return (
    <div className={styles.container} ref={containerRef}>
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image 
          src={service.image} 
          alt={service.name} 
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} ref={heroOverlayRef}>
          <h1 className={styles.heroTitle}>{service.name}</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        
        {/* Intro & Stats */}
        <div className={styles.introGrid}>
          <div className={styles.introCol}>
            <p ref={(el) => { textRefs.current[0] = el; }}>
              {service.name} is a specialized service designed to scale your operations, provide deep expertise, and ensure organizational alignment. We approached this discipline to maximize your brand&apos;s potential and overall impact in the market.
            </p>
          </div>
          <div className={styles.detailsCol}>
            <div className={styles.detailRow} ref={(el) => { textRefs.current[1] = el; }}>
              <span className={styles.detailLabel}>Focus Area</span>
              <span className={styles.detailValue}>{service.name}</span>
            </div>
            <div className={styles.detailRow} ref={(el) => { textRefs.current[2] = el; }}>
              <span className={styles.detailLabel}>Typical Timeframe</span>
              <span className={styles.detailValue}>2 - 6 months</span>
            </div>
            <div className={styles.detailRow} ref={(el) => { textRefs.current[3] = el; }}>
              <span className={styles.detailLabel}>Key Deliverables</span>
              <span className={styles.detailValue}>Strategy, Execution, Handover</span>
            </div>
          </div>
        </div>

        {/* Brands & Showcase */}
        <div className={styles.showcaseSection}>
          <div className={styles.tabs} ref={(el) => { textRefs.current[5] = el; }}>
            {BRANDS_DUMMY_DATA.map((brand, i) => (
              <button 
                key={brand.name} 
                className={`${styles.tab} ${activeBrandIndex === i ? styles.active : ""}`}
                onClick={() => handleTabChange(i)}
              >
                {brand.name}
              </button>
            ))}
          </div>

          <div className={styles.showcaseWindow} ref={showcaseRef}>
            <p className={styles.showcaseText}>{activeBrand.description}</p>
            
            <div className={styles.showcaseImages}>
              {activeBrand.images.map((img, idx) => (
                <div key={idx} className={styles.showcaseImageWrapper}>
                  <Image src={img} alt={`${activeBrand.name} showcase ${idx + 1}`} fill style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className={styles.backButtonContainer}>
          <Link href="/" className={styles.backButton}>
            <ArrowLeft size={24} />
            <span>Back to Home</span>
          </Link>
        </div>

      </section>
    </div>
  );
}
