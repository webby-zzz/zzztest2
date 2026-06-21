"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import styles from "./page.module.css";
import { CASE_STUDIES_DATA } from "../../../lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServiceClient({ service }: { service: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const manifestoTextRef = useRef<HTMLParagraphElement>(null);
  
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  
  // Resolve banner images based on service.id and theme
  const getBannerPaths = (id: string, isDarkTheme: boolean) => {
    let desktop = "/service banner.jpeg";
    let mobile = "/service banner.jpeg";

    if (id === "social-media-marketing") {
      desktop = isDarkTheme 
        ? "/zzz banners optimized/SMM banner - dark.webp" 
        : "/zzz banners optimized/SMM banner - light.webp";
      mobile = isDarkTheme 
        ? "/zzz banners optimized/SMM mobile banner - dark.webp" 
        : "/zzz banners optimized/SMM mobile banner - light.webp";
    } else if (id === "content-creation") {
      desktop = isDarkTheme 
        ? "/zzz banners optimized/Content Creation banner - dark.webp" 
        : "/zzz banners optimized/Content Creation banner - light.webp";
      mobile = isDarkTheme 
        ? "/zzz banners optimized/Content Creation mobile banner - dark.webp" 
        : "/zzz banners optimized/Content Creation mobile banner - light.webp";
    } else if (id === "photography-videography") {
      desktop = isDarkTheme
        ? "/zzz banners optimized/Photohgraphy & Videography banner - light (2).webp"
        : "/zzz banners optimized/Photohgraphy & Videography banner - light.webp";
      mobile = isDarkTheme 
        ? "/zzz banners optimized/Photohgraphy & Videography mobile banner - dark.webp" 
        : "/zzz banners optimized/Photohgraphy & Videography mobile banner - light.webp";
    } else if (id === "website-development") {
      desktop = isDarkTheme 
        ? "/zzz banners optimized/Website development banner - dark.webp" 
        : "/zzz banners optimized/Website development banner - light.webp";
      mobile = isDarkTheme
        ? "/zzz banners optimized/Website development mobile banner - light (2).webp"
        : "/zzz banners optimized/Website development mobile banner - light.webp";
    } else if (id === "branding-packaging") {
      desktop = isDarkTheme 
        ? "/zzz banners optimized/Branding & Packaging banner - dark.webp" 
        : "/zzz banners optimized/Branding & Packaging banner - light.webp";
      mobile = isDarkTheme 
        ? "/zzz banners optimized/Branding & Packaging mobile banner - dark.webp" 
        : "/zzz banners optimized/Branding & Packaging mobile banner - light.webp";
    } else if (id === "brochures-catalogues") {
      desktop = isDarkTheme 
        ? "/zzz banners optimized/Brochures & Catalogues banner - dark.webp" 
        : "/zzz banners optimized/Brochures & Catalogues banner - light.webp";
      mobile = isDarkTheme
        ? "/zzz banners optimized/Brochures & Catalogues mobile banner - light (2).webp"
        : "/zzz banners optimized/Brochures & Catalogues mobile banner - light.webp";
    } else if (id === "linkedin-personal-branding") {
      desktop = isDarkTheme 
        ? "/zzz banners optimized/LinkedIn Personal Branding banner - dark.webp" 
        : "/zzz banners optimized/LinkedIn Personal Branding banner - light.webp";
      mobile = isDarkTheme 
        ? "/zzz banners optimized/LinkedIn Personal Branding mobile banner - dark.webp" 
        : "/zzz banners optimized/LinkedIn Personal Branding mobile banner - light.webp";
    } else if (id === "event-invites-wedding-cards") {
      desktop = isDarkTheme
        ? "/zzz banners optimized/Event invite & Wedding card banner - light (2).webp"
        : "/zzz banners optimized/Event invite & Wedding card banner - light.webp";
      mobile = isDarkTheme
        ? "/zzz banners optimized/Event invite & Wedding card mobile banner - light (2).webp"
        : "/zzz banners optimized/Event invite & Wedding card mobile banner - light.webp";
    }

    return { desktop, mobile };
  };

  const banners = getBannerPaths(service.id, isDark);

  useEffect(() => {
    // Scroll to top instantly on mount to ensure transition is seamless
    window.scrollTo(0, 0);
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    setActiveBrandIndex(0);

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
            scrollTrigger: {
              trigger: showcaseRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // 4. Manifesto Scroll Reveal (Word by Word)
      if (manifestoTextRef.current) {
        const words = manifestoTextRef.current.querySelectorAll(`.${styles.word}`);
        gsap.fromTo(words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.08,
            duration: 0.4,
            ease: "power1.out",
            scrollTrigger: {
              trigger: manifestoTextRef.current,
              start: "top 80%",
              end: "bottom 55%",
              scrub: 0.1,
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

  const activeCaseStudies = CASE_STUDIES_DATA.filter(item => item.services.includes(service.id));
  const displayCaseStudies = activeCaseStudies.length > 0 ? activeCaseStudies : CASE_STUDIES_DATA.slice(0, 3);
  const activeCase = displayCaseStudies[activeBrandIndex] || displayCaseStudies[0];

  return (
    <div className={styles.container} ref={containerRef}>
      
      <section className={styles.hero}>
        <picture className={styles.heroImageContainer}>
          <source media="(max-width: 768px)" srcSet={banners.mobile} />
          <img 
            src={banners.desktop} 
            alt={service.name} 
            className={styles.heroImage}
          />
        </picture>
        <div className={styles.heroOverlay} ref={heroOverlayRef} />
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        
        {/* Intro & Stats */}
        <div className={styles.introGrid}>
          <div className={styles.introCol}>
            <h1 className={styles.contentTitle} ref={(el) => { textRefs.current[4] = el; }} style={{ marginBottom: "2rem", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
              {service.name}
            </h1>
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

        {/* Dynamic Manifesto / Reveal Section */}
        <div className={styles.manifestoSection}>
          <span className={styles.manifestoBadge}>[ 04 / SERVICE MANIFESTO ]</span>
          <p className={styles.manifestoParagraph} ref={manifestoTextRef}>
            {`We believe in digital subtraction. For ${service.name}, every detail, every pixel, and every line of code must serve a specific conversion purpose. True luxury is not loud; it is quiet, intentional, and impeccably executed. At ZZZ, we build products that do not beg for attention, but demand it through flawless performance and premium minimalism.`.split(" ").map((word, idx) => (
              <span key={idx} className={styles.word}>
                {word}{" "}
              </span>
            ))}
          </p>
        </div>

        {/* Brands & Showcase */}
        <div className={styles.showcaseSection}>
          <div className={styles.tabs} ref={(el) => { textRefs.current[5] = el; }}>
            {displayCaseStudies.map((brand, i) => (
              <button 
                key={brand.id} 
                className={`${styles.tab} ${activeBrandIndex === i ? styles.active : ""}`}
                onClick={() => handleTabChange(i)}
              >
                {brand.brandName}
              </button>
            ))}
          </div>

          <div className={styles.showcaseWindow} ref={showcaseRef}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }} className="showcaseContentGrid">
              <div className="showcaseDetails" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h3 className={styles.showcaseBrandName} style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 800, color: "var(--accent-color)" }}>{activeCase.name}</h3>
                <p className={styles.showcaseText}><strong>Brief:</strong> {activeCase.brief}</p>
                <p className={styles.showcaseText}><strong>Execution:</strong> {activeCase.work}</p>
                <p className={styles.showcaseText} style={{ color: "var(--accent-color)", fontWeight: 600 }}><strong>Outcome:</strong> {activeCase.outcome}</p>
              </div>

              <div className={styles.showcaseImages} style={{ margin: 0, gridTemplateColumns: "1fr" }}>
                {activeCase.images.map((img, idx) => (
                  <div key={idx} className={styles.showcaseImageWrapper} style={{ height: "240px" }}>
                    <Image src={img} alt={`${activeCase.brandName} showcase ${idx + 1}`} fill style={{ objectFit: "cover" }} />
                  </div>
                ))}
              </div>
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
