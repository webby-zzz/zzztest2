"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  X,
  Instagram,
  Facebook,
  Youtube,
  TrendingUp,
  MessageSquare,
  Sparkles,
  Smartphone,
  FileText,
  PenTool,
  BarChart2,
  Share2
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import styles from "./page.module.css";
import { CASE_STUDIES_DATA } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Brand Bubbles data
const BRAND_BUBBLES = [
  { brandName: "Dragon King", logoFile: "Dragon King logo.webp" },
  { brandName: "Gokul", logoFile: "Gokul logo.webp" },
  { brandName: "Matri", logoFile: "Matri Logo .webp" },
  { brandName: "Lokaloom", logoFile: "Lokaloom logo.webp" },
  { brandName: "Travellers Paraadise", logoFile: "Travellers Paraadise logo.webp" },
  { brandName: "Koala Kidz", logoFile: "Koala Kidz logo.webp" },
  { brandName: "Vedic Fuel", logoFile: "Vedic Fuel logo.webp" },
  { brandName: "House Of Dreams", logoFile: "House Of Dreams logo.webp" },
  { brandName: "Cabcon", logoFile: "Cabcon logo.webp" },
  { brandName: "Crepes", logoFile: "Crepes Logo.webp" },
  { brandName: "Klocal", logoFile: "Klocal logo.webp" },
  { brandName: "ChefTeeDee", logoFile: "Chef TeeDee logo.webp" },
  { brandName: "Indecor", logoFile: "Indecor logo.webp" },
  { brandName: "Shhyam Shah", logoFile: "Shhyam Shah logo.webp" },
  { brandName: "Deco Imagination", logoFile: "Deco Imagination logo.webp" },
  { brandName: "Cafe Mirosh", logoFile: "Mirosh logo.webp" },
  { brandName: "Hustle Culture", logoFile: "Hustle Culture logo.webp" },
  { brandName: "Funcorp", logoFile: "Funcorp logo.webp" },
  { brandName: "PDS by Sneha", logoFile: "PDS logo.webp" }
];

// FAQS
const FAQS = [
  {
    q: "How involved do I need to be?",
    a: "You don't need to manage the day-to-day. We handle strategy, content planning and execution while keeping you involved for approvals and business insights."
  },
  {
    q: "Do you create the content or do I need to provide it?",
    a: "Most brands use a combination of both. We develop concepts, scripts and creatives while incorporating brand assets, product footage and content captured during shoots."
  },
  {
    q: "How long does it take to see results?",
    a: "Social media is a long-term investment. While engagement improvements can happen within weeks, meaningful growth is built through consistent execution over time."
  },
  {
    q: "Is every package customised?",
    a: "Yes. Every business has different goals, audiences and content requirements. We tailor our approach to suit your brand's specific needs."
  },
  {
    q: "Do you also manage paid advertising?",
    a: "Yes. Paid campaigns can be integrated alongside organic content strategies to support awareness, traffic, lead generation or sales objectives."
  },
  {
    q: "What happens before we start?",
    a: "We begin with a discovery call to understand your business, audience, competitors and objectives before creating a strategy tailored to your goals."
  }
];

export default function SocialMediaPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const inclusionsRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const faqBodiesRef = useRef<(HTMLDivElement | null)[]>([]);
  const approachTextRef = useRef<HTMLParagraphElement>(null);

  // States
  const [mounted, setMounted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", brief: "", socialLinks: "", location: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  // Scroll to top instantly on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    setMounted(true);
  }, []);

  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";
  const banners = {
    desktop: isDark 
      ? "/zzz banners optimized/SMM banner - dark.webp" 
      : "/zzz banners optimized/SMM banner - light.webp",
    mobile: isDark 
      ? "/zzz banners optimized/SMM mobile banner - dark.webp" 
      : "/zzz banners optimized/SMM mobile banner - light.webp"
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance timeline for Hero Section
      const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
      const heroElements = heroRef.current?.querySelectorAll(".gsap-hero-el");
      if (heroElements && heroElements.length > 0) {
        heroTl.fromTo(
          heroElements,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.1, stagger: 0.15 }
        );
      }

      // 2. PARALLAX EFFECT 1: Hero background banner parallax
      const heroBg = heroRef.current?.querySelector(`.${styles.heroBackground}`);
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: -15,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // 3. PARALLAX EFFECT 2: Approach background blur circles (ornaments)
      const ornament1 = approachRef.current?.querySelector(`.${styles.ornament1}`);
      const ornament2 = approachRef.current?.querySelector(`.${styles.ornament2}`);

      if (ornament1) {
        gsap.to(ornament1, {
          yPercent: -35,
          scrollTrigger: {
            trigger: approachRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }
      if (ornament2) {
        gsap.to(ornament2, {
          yPercent: 35,
          scrollTrigger: {
            trigger: approachRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // 4. Scroll Reveal: What We Do Section
      const whatWeDoHead = whatWeDoRef.current?.querySelector(".gsap-reveal-head");
      if (whatWeDoHead) {
        gsap.fromTo(whatWeDoHead.children,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: whatWeDoHead,
              start: "top 92%",
            }
          }
        );
      }

      const platformCards = whatWeDoRef.current?.querySelectorAll(`.${styles.platformCardCompact}`);
      if (platformCards && platformCards.length > 0) {
        gsap.fromTo(platformCards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: whatWeDoRef.current?.querySelector(`.${styles.platformsGridCompact}`),
              start: "top 92%",
            }
          }
        );
      }

      const inclusionsLeft = inclusionsRef.current?.querySelector(".gsap-reveal-inclusions-left");
      if (inclusionsLeft) {
        gsap.fromTo(inclusionsLeft.children,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: inclusionsLeft,
              start: "top 92%",
            }
          }
        );
      }

      const inclusionItems = inclusionsRef.current?.querySelectorAll(`.${styles.inclusionCard}`);
      if (inclusionItems && inclusionItems.length > 0) {
        gsap.fromTo(inclusionItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: inclusionsRef.current?.querySelector(`.${styles.inclusionsGridCompact}`),
              start: "top 92%",
            }
          }
        );
      }

      // 5. Scroll Reveal: Approach Section
      const approachHead = approachRef.current?.querySelector(".gsap-reveal-head");
      if (approachHead) {
        const animElements = approachHead.querySelectorAll(`.${styles.badge}, h2`);
        gsap.fromTo(animElements,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: approachHead,
              start: "top 92%",
            }
          }
        );
      }

      if (approachTextRef.current) {
        const words = approachTextRef.current.querySelectorAll(`.${styles.word}`);
        gsap.fromTo(words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.06,
            duration: 0.4,
            ease: "power1.out",
            scrollTrigger: {
              trigger: approachTextRef.current,
              start: "top 80%",
              end: "bottom 55%",
              scrub: 0.1,
            }
          }
        );
      }

      const approachCards = approachRef.current?.querySelectorAll(`.${styles.approachCard}`);
      if (approachCards && approachCards.length > 0) {
        gsap.fromTo(approachCards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: approachRef.current?.querySelector(`.${styles.approachGrid}`),
              start: "top 92%",
            }
          }
        );
      }

      // 6. Scroll Reveal: Brand Bubbles
      const bubblesHead = bubblesRef.current?.querySelector(".gsap-reveal-head");
      if (bubblesHead) {
        gsap.fromTo(bubblesHead.children,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bubblesHead,
              start: "top 92%",
            }
          }
        );
      }

      const marqueeRows = bubblesRef.current?.querySelectorAll(`.${styles.marqueeRow}`);
      if (marqueeRows && marqueeRows.length > 0) {
        gsap.fromTo(marqueeRows,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bubblesRef.current?.querySelector(`.${styles.marqueeContainer}`),
              start: "top 92%",
            }
          }
        );
      }

      // 7. Scroll Reveal: FAQ Section
      const faqHead = faqRef.current?.querySelector(".gsap-reveal-head");
      if (faqHead) {
        gsap.fromTo(faqHead.children,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: faqHead,
              start: "top 92%",
            }
          }
        );
      }

      const accordions = faqRef.current?.querySelectorAll(`.${styles.accordion}`);
      if (accordions && accordions.length > 0) {
        gsap.fromTo(accordions,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: faqRef.current?.querySelector(`.${styles.faqGrid}`),
              start: "top 92%",
            }
          }
        );
      }

      // 8. Scroll Reveal: CTA Section
      const ctaInfoElements = ctaRef.current?.querySelector(".gsap-reveal-info")?.children;
      if (ctaInfoElements && ctaInfoElements.length > 0) {
        gsap.fromTo(ctaInfoElements,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current?.querySelector(`.${styles.formGrid}`),
              start: "top 92%",
            }
          }
        );
      }

      const ctaForm = ctaRef.current?.querySelector(`.${styles.formCard}`);
      if (ctaForm) {
        gsap.fromTo(ctaForm,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ctaForm,
              start: "top 92%",
            }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Accordion smooth height animation
  useEffect(() => {
    faqBodiesRef.current.forEach((body, idx) => {
      if (!body) return;
      if (activeFaq === idx) {
        gsap.to(body, {
          height: body.scrollHeight,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
          onUpdate: () => ScrollTrigger.refresh(),
          onComplete: () => ScrollTrigger.refresh()
        });
      } else {
        gsap.to(body, {
          height: 0,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
          onUpdate: () => ScrollTrigger.refresh(),
          onComplete: () => ScrollTrigger.refresh()
        });
      }
    });
  }, [activeFaq]);

  const handleAuditClick = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo("#audit-form", { duration: 1.5 });
    } else {
      const formEl = document.getElementById("audit-form");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.company || !form.location || !form.brief) return;

    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", company: "", brief: "", socialLinks: "", location: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <div className={styles.container} ref={containerRef}>

      {/* SECTION: Hero Banner */}
      <section className={`${styles.hero} ${styles.zHero}`} ref={heroRef}>

        {/* HERO BACKGROUND IMAGE */}
        <div className={styles.heroBackground}>
          <picture className={styles.heroImageContainer}>
            <source media="(max-width: 768px)" srcSet={banners.mobile} />
            <img 
              src={banners.desktop} 
              alt="Social Media Marketing Banner" 
              className={styles.heroImage}
            />
          </picture>
        </div>

        {/* HERO CONTENT */}
        <div className={styles.heroContent}>
          <div className="gsap-hero-el" style={{ opacity: 0 }}>
            <button className={styles.ctaButton} onClick={handleAuditClick}>
              Enquire Now <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </section>

      {/* SECTION: Package Inclusions */}
      <section className={`${styles.section} ${styles.zWhatWeDoInclusions}`} ref={inclusionsRef}>
        <div className={styles.containerInner}>

          <div className={styles.inclusionsLayout}>

            {/* Left Column: Title Block & "You Get" Visual Badge */}
            <div className={`${styles.inclusionsLeft} gsap-reveal-inclusions-left`}>
              <span className={styles.badge} style={{ opacity: 0 }}>[ 01 / PACKAGE INCLUSIONS ]</span>
              <h2 style={{ opacity: 0 }} className={styles.inclusionsTitle}>
                What's included in our packages.
              </h2>
              <p style={{ opacity: 0 }} className={styles.inclusionsSub}>
                Everything you need to build a consistent, engaging and professionally managed social media presence.
              </p>

              <div className={`${styles.youGetContainer} glassmorphism`} style={{ opacity: 0 }}>
                <div className={styles.youGetLabel}>you also get</div>
                <div className={styles.youGetSpecs}>
                  <div className={styles.specItem}>
                    <span className={styles.specDot} />
                    <span>Dedicated Account Manager</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specDot} />
                    <span>Fast Turnaround & Communication</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specDot} />
                    <span>Monthly Analytics & Recommendations</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specDot} />
                    <span>Monthly Strategy Calls</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specDot} />
                    <span>Creative Collaboration Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inclusions Grid */}
            <div className={styles.inclusionsGridCompact}>
              {[
                { title: "Strategic Monthly Content Planning", desc: "Content calendars designed around your goals, audience and brand positioning." },
                { title: "Reels Production & Creative Direction", desc: "From concepts and scripting to editing and publishing-ready content." },
                { title: "Custom Visual & Brand Assets", desc: "Branded posts, stories and creatives that keep your feed cohesive." },
                { title: "Social Media Management", desc: "Content scheduling, profile maintenance and day-to-day account handling." },
                { title: "Analytics, Reporting & Optimisation", desc: "Performance tracking with insights to continuously improve results." },
                { title: "Dedicated Account Support", desc: "A single point of contact to ensure smooth communication and execution." }
              ].map((inc, i) => (
                <div
                  key={i}
                  className={styles.inclusionCard}
                  style={{ opacity: 0 }}
                >
                  <div className={styles.inclusionIconWrapper}>
                    <Check size={16} />
                  </div>
                  <div className={styles.inclusionContentCompact}>
                    <h4>{inc.title}</h4>
                    <p>{inc.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: Our Approach */}
      <section className={`${styles.section} ${styles.zApproach}`} ref={approachRef} style={{ overflow: "hidden" }}>

        {/* PARALLAX ORNAMENTS */}
        <div className={`${styles.ornament} ${styles.ornament1}`} />
        <div className={`${styles.ornament} ${styles.ornament2}`} />

        <div className={styles.containerInner}>

          <div className={`${styles.headingBlock} gsap-reveal-head`}>
            <span className={styles.badge} style={{ opacity: 0 }}>[ 02 / OUR METHODOLOGY ]</span>
            <h2 style={{ opacity: 0 }}>Purpose over <span className={styles.serifAccent}>vanity</span>.</h2>
            <p className={styles.revealParagraph} ref={approachTextRef}>
              {`Likes are great. Loyalty is better. That's why we focus on creating content that builds trust, starts conversations and keeps your brand top of mind.`.split(" ").map((word, idx) => (
                <span key={idx} className={styles.word}>
                  {word}{" "}
                </span>
              ))}
            </p>
          </div>

          <div className={styles.approachGrid}>
            {[
              { num: "01", title: "Strategy First", desc: "Every decision starts with audience insights." },
              { num: "02", title: "Platform-Specific", desc: "Different platforms need different content." },
              { num: "03", title: "Data-Led", desc: "Performance guides every move." },
              { num: "04", title: "Consistent Branding", desc: "A recognizable brand across every touchpoint." }
            ].map((app, i) => (
              <div key={i} className={`${styles.approachCard} glassmorphism`} style={{ opacity: 0 }}>
                <span className={styles.approachNum}>{app.num}</span>
                <h3>{app.title}</h3>
                <p>{app.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: Portfolio / Brand Bubbles */}
      <section className={`${styles.section} ${styles.zBubbles}`} ref={bubblesRef}>
        <div className={styles.containerInner}>

          <div className={`${styles.headingBlock} gsap-reveal-head`}>
            <span className={styles.badge} style={{ opacity: 0 }}>[ 03 / FEATURED WORK ]</span>
            <h2 style={{ opacity: 0 }}>Work <span className={styles.serifAccent}>portfolio</span>.</h2>
            <p style={{ opacity: 0 }}>Tap on the logos below to explore our recent social media work - feed displays, project briefs & outcomes.</p>
          </div>

        </div>

        {/* 2-Row Marquee Carousel */}
        <div className={styles.marqueeContainer}>
          {/* Row 1: Left to Right */}
          <div className={`${styles.marqueeRow} ${styles.marqueeRowLTR}`}>
            <div className={styles.marqueeTrack}>
              {[...BRAND_BUBBLES.slice(0, 10), ...BRAND_BUBBLES.slice(0, 10), ...BRAND_BUBBLES.slice(0, 10)].map((b, i) => (
                <div className={styles.carouselBubble} key={`r1-${i}`}>
                  <img 
                    src={`/zzz clientele optimized/${b.logoFile}`} 
                    alt={b.brandName} 
                    className={styles.clientLogoImg}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left */}
          <div className={`${styles.marqueeRow} ${styles.marqueeRowRTL}`}>
            <div className={styles.marqueeTrack}>
              {[...BRAND_BUBBLES.slice(10), ...BRAND_BUBBLES.slice(10), ...BRAND_BUBBLES.slice(10)].map((b, i) => (
                <div className={styles.carouselBubble} key={`r2-${i}`}>
                  <img 
                    src={`/zzz clientele optimized/${b.logoFile}`} 
                    alt={b.brandName} 
                    className={styles.clientLogoImg}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Frequently Asked Questions */}
      <section className={`${styles.section} ${styles.zFaq}`} ref={faqRef}>
        <div className={styles.containerInner}>

          <div className={`${styles.headingBlock} gsap-reveal-head`} style={{ alignSelf: "center", textAlign: "center", marginBottom: "2rem" }}>
            <span className={styles.badge} style={{ opacity: 0 }}>[ 05 / RESOURCES ]</span>
            <h2 style={{ opacity: 0, whiteSpace: "nowrap" }}>Frequently asked <span className={styles.serifAccent}>questions</span>.</h2>
          </div>

          <div className={styles.faqGrid}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className={`${styles.accordion} glassmorphism`}
                style={{
                  borderColor: activeFaq === i ? "var(--accent-color)" : "var(--glass-border)",
                  opacity: 0
                }}
              >
                <button
                  className={styles.accordionHeader}
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={styles.accordionChevron}
                    style={{ transform: activeFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <div
                  className={styles.accordionBody}
                  ref={(el) => { faqBodiesRef.current[i] = el; }}
                  style={{ height: 0, overflow: "hidden" }}
                >
                  <div className={styles.accordionContent}>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION: CTA / Enquiry Form */}
      <section className={`${styles.section} ${styles.zCta}`} ref={ctaRef} id="audit-form">
        <div className={styles.containerInner}>
          <div className={styles.formGrid}>

            {/* Info */}
            <div className={`${styles.contactInfo} gsap-reveal-info`}>
              <span className={styles.badge} style={{ opacity: 0 }}>[ 06 / CONNECT ]</span>
              <h3 style={{ opacity: 0 }}>Ready to grow your brand on <br /><span className={styles.serifAccent}>social media</span>?</h3>
              <p style={{ opacity: 0 }}>Tell us about your brand and goals. We'll review your current presence and explore how social media can drive meaningful growth for your business.</p>

              <div className={styles.formDetails}>
                <div style={{ opacity: 0 }}>
                  <span className={styles.formLabel}>Response Guarantee</span>
                  <p className={styles.formValue}>Under 24 Hours</p>
                </div>
                <div style={{ opacity: 0 }}>
                  <span className={styles.formLabel}>Studio Mailbox</span>
                  <p className={styles.formValue}>socials@zzz.design</p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className={`${styles.formCard} glassmorphism`} style={{ opacity: 0 }}>
              <form onSubmit={handleFormSubmit} className={styles.form}>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="name" className={styles.label}>Your Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. Jean Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="e.g. jean@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      required
                      placeholder="e.g. +91 99999 99999"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="company" className={styles.label}>Company Name</label>
                    <input
                      type="text"
                      id="company"
                      required
                      placeholder="e.g. Acme Corp"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="socialLinks" className={styles.label}>Website & Social links</label>
                    <input
                      type="text"
                      id="socialLinks"
                      placeholder="e.g. instagram.com/brandname"
                      value={form.socialLinks}
                      onChange={(e) => setForm({ ...form, socialLinks: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="location" className={styles.label}>City / Country</label>
                    <input
                      type="text"
                      id="location"
                      required
                      placeholder="e.g. Mumbai, India"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="brief" className={styles.label}>Tell us about your brand</label>
                  <textarea
                    id="brief"
                    rows={4}
                    required
                    placeholder="What do you do, what are your goals, and what challenges are you currently facing?"
                    value={form.brief}
                    onChange={(e) => setForm({ ...form, brief: e.target.value })}
                    className={styles.textarea}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className={styles.submitBtn}
                >
                  {status === "idle" && "Book A Discovery Call →"}
                  {status === "sending" && "Sending Enquiry..."}
                  {status === "sent" && "Proposal Request Sent ✓"}
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className={styles.backButtonContainer}>
        <Link href="/" className={styles.backButton}>
          <ArrowLeft size={24} />
          <span>Back to Home</span>
        </Link>
      </div>

    </div>
  );
}
