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
import styles from "./page.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Brand Bubbles data (Portfolio Case Studies)
const BRAND_BUBBLES = [
  {
    id: "acme",
    logo: "AC",
    label: "E-Commerce Feed",
    color: "var(--brand-yellow)",
    brandName: "Acme Shop",
    industry: "Fashion E-commerce",
    brief: "Scale organic Instagram feed reach and turn casual scrolls into high-intent shoppers.",
    work: "We designed a cohesive editorial grid layout, produced premium product static posts, and established a video transition style for stories.",
    outcome: "+145% sales conversion rate directly from Instagram Stories.",
    avatar: "AS",
    feed: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop"
    ]
  },
  {
    id: "nike",
    logo: "NK",
    label: "Viral SNKRS Launch",
    color: "var(--brand-coral)",
    brandName: "Nike SNKRS",
    industry: "Retail / Apparel",
    brief: "Build viral hype on X and Reels for a limited-edition capsule sneaker release.",
    work: "We scripted short-form videos with built-in hooks, managed micro-influencer product seedings, and executed real-time community engagement in replies.",
    outcome: "12M+ organic views generated, shoe collection sold out in 4 minutes.",
    avatar: "NS",
    feed: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=400&auto=format&fit=crop"
    ]
  },
  {
    id: "lumos",
    logo: "LM",
    label: "SaaS Authority",
    color: "var(--brand-blue)",
    brandName: "Lumos SaaS",
    industry: "Tech / Enterprise",
    brief: "Establish LinkedIn and Twitter/X thought leadership within the cloud management niche.",
    work: "We created custom technical carousels, wrote high-value industry breakdowns, and ran a Thread-based early mover growth strategy.",
    outcome: "+340% increase in monthly qualified demo signups from social referrals.",
    avatar: "LS",
    feed: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=400&auto=format&fit=crop"
    ]
  },
  {
    id: "kaizen",
    logo: "KZ",
    label: "Portfolio Reels",
    color: "var(--brand-mint)",
    brandName: "Kaizen Agency",
    industry: "Creative Services",
    brief: "Position a top-tier creative studio through cinematic behind-the-scenes content on Instagram.",
    work: "We structured a Reels-first content calendar, color graded behind-the-scenes footage, and designed stylized typography overlays.",
    outcome: "Generated $180k in organic client leads through DM inquiries.",
    avatar: "KA",
    feed: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop"
    ]
  },
  {
    id: "equinox",
    logo: "EQ",
    label: "Grids & Pins",
    color: "var(--brand-lavender)",
    brandName: "Equinox Spa",
    industry: "Wellness / Hospitality",
    brief: "Construct a highly aesthetic, curated presence to drive luxury booking inquiries.",
    work: "We created a minimalist Pinterest strategy, organized rich boards for aesthetic decor search, and designed a grid theme for Instagram.",
    outcome: "+220% booking inquiries with zero paid ad spend.",
    avatar: "ES",
    feed: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&auto=format&fit=crop"
    ]
  }
];

// FAQS
const FAQS = [
  {
    q: "How many posts per month do we get?",
    a: "Packages typically include 12–20 posts/month depending on your tier and business goals. We tailor this post frequency to platform algorithms and your budget to optimize engagement and reach."
  },
  {
    q: "Do you handle paid ads as well?",
    a: "We offer organic social media management and paid advertising as separate services. Both can be bundled together for a full-funnel approach where paid ads retarget users engaged by organic content."
  },
  {
    q: "Will you create the content or do we provide it?",
    a: "We create everything — high-fidelity graphic designs, written copywriting, captions, and script formats. If photography/video is needed, we provide structured creative briefs. You maintain full approval."
  },
  {
    q: "How long before we see results?",
    a: "Typically, it takes 60–90 days for meaningful algorithm and follower growth. However, engagement improvements, comment replies, and profile conversions can begin showing in the first few weeks."
  }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const inclusionsRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const faqBodiesRef = useRef<(HTMLDivElement | null)[]>([]);

  // States
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<typeof BRAND_BUBBLES[0] | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", brief: "", budget: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);

  // Scroll to top instantly on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      // 2. PARALLAX EFFECT 1: Hero collage elements
      const collage1 = heroRef.current?.querySelector(`.${styles.collageItem1}`);
      const collage2 = heroRef.current?.querySelector(`.${styles.collageItem2}`);
      const collage3 = heroRef.current?.querySelector(`.${styles.collageItem3}`);
      const collage4 = heroRef.current?.querySelector(`.${styles.collageItem4}`);

      if (collage1) {
        gsap.to(collage1, {
          yPercent: -20,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }
      if (collage2) {
        gsap.to(collage2, {
          yPercent: -45,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }
      if (collage3) {
        gsap.to(collage3, {
          yPercent: -25,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }
      if (collage4) {
        gsap.to(collage4, {
          yPercent: -50,
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
        gsap.fromTo(approachHead.children,
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

      const bubbles = bubblesRef.current?.querySelectorAll(`.${styles.bubble}`);
      if (bubbles && bubbles.length > 0) {
        gsap.fromTo(bubbles,
          { opacity: 0, scale: 0.4 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.1,
            duration: 1.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: bubblesRef.current?.querySelector(`.${styles.bubbleCluster}`),
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

      // 9. Card Slide Up / Section Stacking effect (Exactly 100vh Stacking)
      if (window.innerWidth > 768) {
        const sectionsToPin = [
          { current: heroRef.current, next: whatWeDoRef.current },
          { current: whatWeDoRef.current, next: inclusionsRef.current },
          { current: inclusionsRef.current, next: approachRef.current },
          { current: approachRef.current, next: bubblesRef.current },
          { current: bubblesRef.current, next: faqRef.current },
        ];

        sectionsToPin.forEach(({ current, next }) => {
          if (!current || !next) return;

          ScrollTrigger.create({
            trigger: current,
            start: "top top",
            endTrigger: next,
            end: "top top",
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const openModal = (brand: typeof BRAND_BUBBLES[0]) => {
    setSelectedBrand(brand);
    setModalVisible(true);
  };

  const closeModal = () => {
    if (!modalOverlayRef.current || !modalCardRef.current) return;
    
    // Apple-like smooth exit
    gsap.timeline({
      onComplete: () => {
        setModalVisible(false);
        setSelectedBrand(null);
      }
    })
    .to(modalCardRef.current, {
      scale: 0.94,
      y: 25,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    })
    .to(modalOverlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    }, "-=0.15");
  };

  // Apple-like modal entrance
  useEffect(() => {
    if (modalVisible && modalOverlayRef.current && modalCardRef.current) {
      gsap.set(modalOverlayRef.current, { opacity: 0 });
      gsap.set(modalCardRef.current, { scale: 0.94, y: 25, opacity: 0 });

      gsap.timeline()
        .to(modalOverlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(modalCardRef.current, {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.05)"
        }, "-=0.2");
    }
  }, [modalVisible]);

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
    if (!form.name || !form.email) return;

    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", company: "", brief: "", budget: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      
      {/* SECTION: Hero Banner */}
      <section className={`${styles.hero} ${styles.zHero}`} ref={heroRef}>
        
        {/* PARALLAX COLLAGE BACKGROUND */}
        <div className={styles.heroBackground}>
          <div className={styles.collage}>
            <div className={`${styles.collageItem} ${styles.collageItem1}`}>
              <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=400&auto=format&fit=crop" alt="Collage 1" className={styles.collageImage} />
            </div>
            <div className={`${styles.collageItem} ${styles.collageItem2}`}>
              <img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=400&auto=format&fit=crop" alt="Collage 2" className={styles.collageImage} />
            </div>
            <div className={`${styles.collageItem} ${styles.collageItem3}`}>
              <img src="https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=400&auto=format&fit=crop" alt="Collage 3" className={styles.collageImage} />
            </div>
            <div className={`${styles.collageItem} ${styles.collageItem4}`}>
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop" alt="Collage 4" className={styles.collageImage} />
            </div>
          </div>
        </div>

        {/* HERO CONTENT */}
        <div className={styles.heroContent}>
          <div className={`${styles.badge} gsap-hero-el`} style={{ opacity: 0 }}>
            [ Service // organic growth ]
          </div>
          <h1 className="gsap-hero-el" style={{ opacity: 0 }}>
            Social Media That <br />Actually <span className={styles.serifAccent}>Converts</span>.
          </h1>
          <p className={`${styles.heroSub} gsap-hero-el`} style={{ opacity: 0 }}>
            Strategy-led, content-driven, and built for the algorithm — and for humans.
          </p>
          <div className="gsap-hero-el" style={{ opacity: 0 }}>
            <button className={styles.ctaButton} onClick={handleAuditClick}>
              Get My Social Audit <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </section>

      {/* SECTION: What We Do - Platforms */}
      <section className={`${styles.section} ${styles.zWhatWeDo}`} ref={whatWeDoRef} id="services">
        <div className={styles.containerInner}>
          <div className={`${styles.headingBlock} gsap-reveal-head`}>
            <span className={styles.badge} style={{ opacity: 0 }}>[ 01 / WHAT WE DO ]</span>
            <h2 style={{ opacity: 0 }}>Platforms We <span className={styles.serifAccent}>Handle</span>.</h2>
            <p style={{ opacity: 0 }}>We manage, grow, and monetise your social presence across channels. From strategy to consistency.</p>
          </div>

          <div className={styles.platformsGridCompact}>
            {[
              { name: "Instagram", desc: "Visual feed, Reels edits, story template strategies.", icon: Instagram },
              { name: "Facebook", desc: "Interactive community & meta conversion ads.", icon: Facebook },
              { name: "YouTube", desc: "Shorts creation & thumbnail search engine SEO.", icon: Youtube },
              { name: "Pinterest", desc: "Boards categorisation & rich catalog links.", icon: Share2 },
              { name: "Twitter / X", desc: "Voice guidelines & interactive trend monitoring.", icon: MessageSquare },
              { name: "Threads", desc: "Growth campaigns & text conversational hooks.", icon: Sparkles }
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className={`${styles.platformCardCompact} glassmorphism`} style={{ opacity: 0 }}>
                  <div className={styles.iconWrapperCompact}>
                    <Icon size={26} strokeWidth={2.5} />
                  </div>
                  <div className={styles.platformCardCompactContent}>
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION: Package Inclusions */}
      <section className={`${styles.section} ${styles.zWhatWeDoInclusions}`} ref={inclusionsRef}>
        <div className={styles.containerInner}>
          
          <div className={styles.inclusionsLayout}>
            
            {/* Left Column: Title Block & "You Get" Visual Badge */}
            <div className={`${styles.inclusionsLeft} gsap-reveal-inclusions-left`}>
              <span className={styles.badge} style={{ opacity: 0 }}>[ 02 / PACKAGE INCLUSIONS ]</span>
              <h2 style={{ opacity: 0 }} className={styles.inclusionsTitle}>
                What's Included In Our <span className={styles.serifAccent}>Packages</span>.
              </h2>
              <p style={{ opacity: 0 }} className={styles.inclusionsSub}>
                Everything you need for organic social growth, bundled into a clear monthly execution plan.
              </p>
              
              <div className={`${styles.youGetContainer} glassmorphism`} style={{ opacity: 0 }}>
                <div className={styles.youGetLabel}>you get.</div>
                <div className={styles.youGetSpecs}>
                  <div className={styles.specItem}>
                    <span className={styles.specDot} />
                    <span>Dedicated Content Director</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specDot} />
                    <span>24/7 Slack Channel Access</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specDot} />
                    <span>Weekly Custom Reporting</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specDot} />
                    <span>All Source Design Files</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specDot} />
                    <span>Monthly Audit Roadmaps</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specDot} />
                    <span>1-on-1 Strategy Calls</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inclusions Grid */}
            <div className={styles.inclusionsGridCompact}>
              {[
                { title: "Strategic Monthly Calendar", desc: "Post themes mapping back to core business targets." },
                { title: "Custom Styled Visuals", desc: "High-fidelity static and animated story assets." },
                { title: "Cinematic Reel Scripting", desc: "Word-by-word scripts and hooks guidance." },
                { title: "Active Community Management", desc: "Prompt comment replies and DM inquiries handling." },
                { title: "Weekly & Monthly Reporting", desc: "Attribution reports detailing absolute gains." },
                { title: "Algorithmic Trend Research", desc: "Competitor quarterly audits and updates." }
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
      <section className={`${styles.section} ${styles.zApproach}`} ref={approachRef} style={{ overflow: "hidden" }} id="methodology">
        
        {/* PARALLAX ORNAMENTS */}
        <div className={`${styles.ornament} ${styles.ornament1}`} />
        <div className={`${styles.ornament} ${styles.ornament2}`} />

        <div className={styles.containerInner}>
          
          <div className={`${styles.headingBlock} gsap-reveal-head`}>
            <span className={styles.badge} style={{ opacity: 0 }}>[ 02 / OUR METHODOLOGY ]</span>
            <h2 style={{ opacity: 0 }}>Purpose over <span className={styles.serifAccent}>vanity</span>.</h2>
            <p style={{ opacity: 0 }}>We don't post for the sake of posting. Every piece of content starts with understanding your audience, your competitors, and your goals. We then build a content strategy that maps to your business objectives — not just vanity metrics.</p>
          </div>

          <div className={styles.approachGrid}>
            {[
              { num: "01", title: "Strategy First", desc: "Before we create a single post, we do a full brand and audience audit. Zero guesswork." },
              { num: "02", title: "Platform-Specific", desc: "What works on Instagram won't work on LinkedIn. Each platform gets its own custom treatment." },
              { num: "03", title: "Data-Driven", desc: "We review analytics weekly and course-correct. No lazy set-and-forget loops." },
              { num: "04", title: "Brand-Consistent", desc: "Your grid will look curated, not chaotic. Colours, tone, and visual language stay consistent." }
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
      <section className={`${styles.section} ${styles.zBubbles}`} ref={bubblesRef} id="portfolio">
        <div className={styles.containerInner}>
          
          <div className={`${styles.headingBlock} gsap-reveal-head`}>
            <span className={styles.badge} style={{ opacity: 0 }}>[ 03 / FEATURED WORK ]</span>
            <h2 style={{ opacity: 0 }}>Interactive <span className={styles.serifAccent}>portfolio</span>.</h2>
            <p style={{ opacity: 0 }}>Click on the interactive bubbles below to explore live social feeds, project briefs, and performance outcomes for our selected partners.</p>
          </div>

          {/* Bubble Grid Cluster */}
          <div className={styles.bubbleCluster}>
            {BRAND_BUBBLES.map((b, i) => {
              const positionClass = styles[`bubble${i + 1}`];
              return (
                <div 
                  key={b.id} 
                  className={`${styles.bubble} glassmorphism ${positionClass}`}
                  style={{ borderColor: b.color, opacity: 0 }}
                  onClick={() => openModal(b)}
                >
                  <span className={styles.bubbleLogo} style={{ color: b.color, fontSize: "1.75rem" }}>{b.logo}</span>
                  <span className={styles.bubbleLabel}>{b.label.split(" ")[0]}</span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* INTERACTIVE POPUP MODAL */}
      {modalVisible && selectedBrand && (
        <div 
          className={styles.modalOverlay} 
          ref={modalOverlayRef}
          onClick={closeModal}
        >
          <div 
            className={styles.modalContent} 
            ref={modalCardRef}
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close */}
            <button className={styles.closeButton} onClick={closeModal}>
              <X size={18} />
            </button>

            {/* Left: Case Details */}
            <div className={styles.modalDetails}>
              <div className={styles.modalMeta}>
                <h3 className={styles.modalBrand} style={{ color: selectedBrand.color }}>{selectedBrand.brandName}</h3>
                <span className={styles.modalIndustry}>{selectedBrand.industry}</span>
              </div>
              
              <div className={styles.modalSection}>
                <h4>The Brief</h4>
                <p>{selectedBrand.brief}</p>
              </div>

              <div className={styles.modalSection}>
                <h4>Our Execution</h4>
                <p>{selectedBrand.work}</p>
              </div>

              <div className={styles.outcomeCard}>
                <span className={styles.outcomeLabel}>Key Outcome</span>
                <p className={styles.outcomeText} style={{ color: selectedBrand.color }}>{selectedBrand.outcome}</p>
              </div>
            </div>

            {/* Right: Phone Grid Mockup */}
            <div className={styles.phoneCol}>
              <div className={styles.phoneFrame}>
                <div className={styles.phoneScreen}>
                  <div className={styles.phoneHeader}>
                    <span>@{selectedBrand.brandName.toLowerCase().replace(" ", "")}</span>
                    <Instagram size={14} />
                  </div>
                  <div className={styles.phoneProfile}>
                    <div className={styles.phoneAvatar} style={{ color: selectedBrand.color, borderColor: selectedBrand.color }}>
                      {selectedBrand.logo}
                    </div>
                    <div className={styles.profileMeta}>
                      <span className={styles.profileName}>{selectedBrand.brandName}</span>
                      <span className={styles.profileBio}>{selectedBrand.industry}<br />Curated by ZZZ Agency.</span>
                    </div>
                  </div>
                  <div className={styles.phoneGrid}>
                    {selectedBrand.feed.map((img, idx) => (
                      <div key={idx} className={styles.gridPost}>
                        <img src={img} alt={`feed post ${idx}`} className={styles.gridPostImage} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SECTION: Frequently Asked Questions */}
      <section className={`${styles.section} ${styles.zFaq}`} ref={faqRef} id="faq">
        <div className={styles.containerInner}>
          
          <div className={`${styles.headingBlock} gsap-reveal-head`} style={{ alignSelf: "center", textAlign: "center", marginBottom: "2rem" }}>
            <span className={styles.badge} style={{ opacity: 0 }}>[ 04 / RESOURCES ]</span>
            <h2 style={{ opacity: 0 }}>Frequently asked <span className={styles.serifAccent}>questions</span>.</h2>
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
              <span className={styles.badge} style={{ opacity: 0 }}>[ 05 / KICKOFF ]</span>
              <h3 style={{ opacity: 0 }}>Ready to stop posting into <br />the <span className={styles.serifAccent}>void</span>?</h3>
              <p style={{ opacity: 0 }}>Don’t settle for templates and vanity metrics. Fill out the audit enquiry card to get a bespoke review of your brand's grid and conversion roadmap.</p>
              
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
                      placeholder="e.g. Acme Corp"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="budget" className={styles.label}>Monthly Budget Range (Optional)</label>
                  <select 
                    id="budget" 
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className={styles.select}
                  >
                    <option value="" disabled>Select a budget tier...</option>
                    <option value="tier1">$1,500 - $3,000 / mo</option>
                    <option value="tier2">$3,000 - $5,000 / mo</option>
                    <option value="tier3">$5,000 - $10,000 / mo</option>
                    <option value="tier4">$10,000+ / mo</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="brief" className={styles.label}>Brief Description of Need</label>
                  <textarea 
                    id="brief" 
                    rows={4} 
                    placeholder="Tell us about your social channels, audience plateaus, and objectives..."
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
                  {status === "idle" && "Start My Project →"}
                  {status === "sending" && "Sending Enquiry..."}
                  {status === "sent" && "Proposal Request Sent ✓"}
                </button>

                <p className={styles.smallPrint}>
                  We respond within 24 hours. No automated sales pitches — a real agency human reads every single message.
                </p>

              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
