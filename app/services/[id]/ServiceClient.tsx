"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  X
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import { use3DTilt } from "@/lib/use3DTilt";
import styles from "./page.module.css";
import { CASE_STUDIES_DATA } from "../../../lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INCLUSION_COLORS = [
  { bg: "#0E2D54", text: "#FAF8F1", desc: "rgba(250, 248, 241, 0.8)", iconBg: "rgba(246, 108, 81, 0.2)", iconColor: "#F66C51" }, // Navy bg, Cream text, Coral check
  { bg: "#5188B5", text: "#FFFFFF", desc: "rgba(255, 255, 255, 0.85)", iconBg: "rgba(255, 183, 3, 0.25)", iconColor: "#FFB703" }, // Blue bg, White text, Yellow check
  { bg: "#DCC5DF", text: "#0E2D54", desc: "rgba(14, 45, 84, 0.8)", iconBg: "rgba(14, 45, 84, 0.1)", iconColor: "#0E2D54" },      // Lavender bg, Navy text, Navy check
  { bg: "#FFB703", text: "#0E2D54", desc: "rgba(14, 45, 84, 0.8)", iconBg: "rgba(14, 45, 84, 0.1)", iconColor: "#0E2D54" },      // Yellow bg, Navy text, Navy check
  { bg: "#FAF8F1", text: "#0E2D54", desc: "rgba(14, 45, 84, 0.8)", iconBg: "rgba(246, 108, 81, 0.15)", iconColor: "#F66C51" },  // Cream bg, Navy text, Coral check
  { bg: "#C0E1D2", text: "#0E2D54", desc: "rgba(14, 45, 84, 0.8)", iconBg: "rgba(14, 45, 84, 0.1)", iconColor: "#0E2D54" },      // Mint bg, Navy text, Navy check
];

const DEFAULT_YOU_ALSO_GET = [
  "Dedicated Account Manager",
  "Fast Turnaround & Communication",
  "Monthly Strategy Calls",
  "Clear Timelines & Deliverables",
  "Collaborative Feedback Process",
  "Ongoing Support & Guidance"
];

const SERVICE_OPTIONS = [
  "Social Media Marketing",
  "Content Creation",
  "Photography & Videography",
  "Website Development",
  "Branding & Packaging",
  "Brochures & Catalogues",
  "LinkedIn Personal Branding",
  "Event Invites & Wedding Cards",
];

export default function ServiceClient({ service }: { service: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const whatWeDoRef = useRef<HTMLDivElement>(null);
  const inclusionsRef = useRef<HTMLDivElement>(null);
  const tiltFrame = use3DTilt(5, -10);
  const youGetTilt = use3DTilt(10, -12); // Deep 3D dip-in hover effect
  const bubblesRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const faqBodiesRef = useRef<(HTMLDivElement | null)[]>([]);
  const approachTextRef = useRef<HTMLParagraphElement>(null);

  // States
  const [mounted, setMounted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    company: "", 
    brief: "", 
    socialLinks: "", 
    location: "",
    selectedServices: [] as string[]
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  // Safe defaults if details structure is missing (though we've added it to all)
  const details = service.details || {
    inclusionsTitle: `What's included in our ${service.name} plans?`,
    inclusionsSub: `Everything you need to scale your ${service.name} and operations.`,
    inclusions: [],
    methodologyHeading: "Standard Execution.",
    methodologySub: "Quiet, intentional, and impeccably executed.",
    methodology: [],
    featuredWorkHeading: "Work portfolio",
    featuredWorkSub: "Explore some of our featured accounts and case studies.",
    logos: [],
    faqs: []
  };

  const BRAND_BUBBLES = details.logos && details.logos.length > 0 ? details.logos : [];
  const FAQS = details.faqs && details.faqs.length > 0 ? details.faqs : [];

  // Slider States & Functions for Interactive Featured Work
  const N_BUBBLES = BRAND_BUBBLES.length;
  const [activeLogoIndex, setActiveLogoIndex] = useState<number>(BRAND_BUBBLES.length > 0 ? BRAND_BUBBLES.length + Math.floor(BRAND_BUBBLES.length / 2) : 0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const dragStartX = useRef(0);
  const autoRotateTimer = useRef<NodeJS.Timeout | null>(null);
  const resumeAutoRotateTimeout = useRef<NodeJS.Timeout | null>(null);

  const startAutoRotate = () => {
    if (N_BUBBLES === 0) return;
    stopAutoRotate();
    autoRotateTimer.current = setInterval(() => {
      setTransitionEnabled(true);
      setActiveLogoIndex((prev: number) => prev + 1);
    }, 3200);
  };

  const stopAutoRotate = () => {
    if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
    if (resumeAutoRotateTimeout.current) clearTimeout(resumeAutoRotateTimeout.current);
  };

  const resetAutoRotateTimer = () => {
    stopAutoRotate();
    resumeAutoRotateTimeout.current = setTimeout(() => {
      startAutoRotate();
    }, 5000);
  };

  useEffect(() => {
    if (N_BUBBLES > 0) {
      startAutoRotate();
    }
    return () => stopAutoRotate();
  }, [N_BUBBLES]);

  // Infinite wrapping logic
  useEffect(() => {
    if (N_BUBBLES === 0) return;
    if (activeLogoIndex >= 2 * N_BUBBLES) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setActiveLogoIndex(activeLogoIndex - N_BUBBLES);
      }, 600);
      return () => clearTimeout(timer);
    } else if (activeLogoIndex < N_BUBBLES) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setActiveLogoIndex(activeLogoIndex + N_BUBBLES);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      if (!transitionEnabled) {
        const timer = setTimeout(() => {
          setTransitionEnabled(true);
        }, 30);
        return () => clearTimeout(timer);
      }
    }
  }, [activeLogoIndex, transitionEnabled, N_BUBBLES]);

  const startDrag = (clientX: number) => {
    if (N_BUBBLES === 0) return;
    setIsDragging(true);
    setTransitionEnabled(false);
    dragStartX.current = clientX;
    stopAutoRotate();
  };

  const moveDrag = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartX.current;
    setDragOffset(deltaX);
  };

  const endDrag = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // Determine closest snap item based on drag offset and width
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    const itemWidth = isMobile ? 110 : 150;
    const itemGap = isMobile ? 40 : 60;
    const itemFullWidth = itemWidth + itemGap;
    const threshold = itemFullWidth * 0.25;
    let offsetIndex = 0;
    
    if (dragOffset < -threshold) {
      offsetIndex = Math.ceil(-dragOffset / itemFullWidth);
    } else if (dragOffset > threshold) {
      offsetIndex = -Math.ceil(dragOffset / itemFullWidth);
    }
    
    setTransitionEnabled(true);
    setActiveLogoIndex((prev: number) => prev + offsetIndex);
    setDragOffset(0);
    resetAutoRotateTimer();
  };

  const handleMouseDown = (e: React.MouseEvent) => startDrag(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => moveDrag(e.clientX);
  const handleMouseUp = () => endDrag();
  const handleMouseLeave = () => endDrag();

  const handleTouchStart = (e: React.TouchEvent) => startDrag(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => moveDrag(e.touches[0].clientX);
  const handleTouchEnd = () => endDrag();

  // Scroll to top instantly on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    setMounted(true);
  }, []);

  // Resolve banner images based on service.id and theme
  const getBannerPaths = (id: string, isDarkTheme: boolean) => {
    let desktop = "/service banner.jpeg";
    let mobile = "/service banner.jpeg";

    if (id === "content-creation") {
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
    if (!mounted) return;

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

      // Scroll Reveal for Inclusions List
      const inclusionsLeft = inclusionsRef.current?.querySelector(".gsap-reveal-inclusions-left");
      if (inclusionsLeft) {
        gsap.fromTo(inclusionsLeft.children,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: inclusionsLeft,
              start: "top 92%",
            }
          }
        );
      }

      const inclusionCards = inclusionsRef.current?.querySelectorAll(`.${styles.inclusionCard}`);
      if (inclusionCards && inclusionCards.length > 0) {
        gsap.fromTo(inclusionCards,
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

      const youGetCard = inclusionsRef.current?.querySelector(`.${styles.youGetContainer}`);
      if (youGetCard) {
        gsap.fromTo(youGetCard,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: youGetCard,
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

      const ctaForm = ctaRef.current?.querySelector(`.gsap-reveal-form-card`);
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
  }, [mounted, service]);

  const handleAuditClick = () => {
    const auditSection = document.getElementById("audit-form");
    if (auditSection) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(auditSection, { duration: 1.5 });
      } else {
        auditSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleFaqClick = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
    
    const body = faqBodiesRef.current[index];
    if (body) {
      if (activeFaq === index) {
        gsap.to(body, { height: 0, duration: 0.4, ease: "power2.inOut" });
      } else {
        faqBodiesRef.current.forEach((b, idx) => {
          if (b && idx !== index) {
            gsap.to(b, { height: 0, duration: 0.4, ease: "power2.inOut" });
          }
        });
        
        gsap.set(body, { height: "auto" });
        const targetHeight = body.offsetHeight;
        gsap.set(body, { height: 0 });
        gsap.to(body, { height: targetHeight, duration: 0.45, ease: "power3.out" });
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.company || !form.location || !form.brief) return;

    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ 
        name: "", 
        email: "", 
        phone: "", 
        company: "", 
        brief: "", 
        socialLinks: "", 
        location: "",
        selectedServices: []
      });
    }, 1500);
  };

  const toggleService = (srv: string) => {
    setForm((prev) => {
      const isSelected = prev.selectedServices.includes(srv);
      return {
        ...prev,
        selectedServices: isSelected
          ? prev.selectedServices.filter((s) => s !== srv)
          : [...prev.selectedServices, srv],
      };
    });
  };

  return (
    <div className={styles.container} ref={containerRef}>
      
      {/* SECTION: Hero */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroBackground}>
          <img 
            src={banners.desktop} 
            alt={`${service.name} Banner`} 
            className={`${styles.heroImage} ${styles.desktopBanner} ${isDark ? styles.darkBanner : styles.lightBanner}`}
          />
          <img 
            src={banners.mobile} 
            alt={`${service.name} Banner Mobile`} 
            className={`${styles.heroImage} ${styles.mobileBanner} ${isDark ? styles.darkBanner : styles.lightBanner}`}
          />
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

          {/* Breadcrumbs */}
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbsSeparator}>/</span>
            <span className={styles.breadcrumbsActive}>{service.name}</span>
          </div>

          <div className={styles.inclusionsLayout}>

            {/* Left Column: Title Block */}
            <div className={`${styles.inclusionsLeft} gsap-reveal-inclusions-left`}>
              <span className={styles.badge} style={{ opacity: 0 }}>[ 01 / PACKAGE INCLUSIONS ]</span>
              <h2 style={{ opacity: 0 }} className={styles.inclusionsTitle}>
                {details.inclusionsTitle}
              </h2>
              <p style={{ opacity: 0 }} className={styles.inclusionsSub}>
                {details.inclusionsSub}
              </p>
            </div>

            {/* Inclusions Main Grid Content wrapper */}
            <div className={styles.inclusionsMainContent}>
              {/* Left Column: Inclusions Grid */}
              <div className={styles.inclusionsGridCompact}>
                {details.inclusions.map((inc: any, i: number) => {
                  const colors = INCLUSION_COLORS[i % INCLUSION_COLORS.length];
                  return (
                    <div
                      key={i}
                      className={styles.inclusionCard}
                      style={{ 
                        opacity: 0,
                        "--inc-bg": colors.bg,
                        "--inc-text": colors.text,
                        "--inc-desc": colors.desc,
                        "--inc-icon-bg": colors.iconBg,
                        "--inc-icon-color": colors.iconColor,
                      } as React.CSSProperties}
                    >
                      <div className={styles.inclusionIconWrapper}>
                        <Check size={16} />
                      </div>
                      <div className={styles.inclusionContentCompact}>
                        <h4>{inc.title}</h4>
                        <p>{inc.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* You Also Get Section */}
              <div 
                ref={youGetTilt.ref}
                style={{ ...youGetTilt.style, opacity: 0 }}
                className={`${styles.youGetContainer} glassmorphism`}
              >
                <div className={styles.youGetLabel}>you also get</div>
                <div className={styles.youGetSpecs}>
                  {DEFAULT_YOU_ALSO_GET.map((spec: string, idx: number) => (
                    <div className={styles.specItem} key={idx}>
                      <span className={styles.specDot} />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
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
            <h2 style={{ opacity: 0 }}>{details.methodologyHeading}</h2>
            <p className={styles.revealParagraph} ref={approachTextRef}>
              {details.methodologySub.split(" ").map((word: string, idx: number) => (
                <span key={idx} className={styles.word}>
                  {word}{" "}
                </span>
              ))}
            </p>
          </div>

          <div className={styles.approachGrid}>
            {details.methodology.map((app: any, i: number) => (
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
      {BRAND_BUBBLES.length > 0 && (
        <section className={`${styles.section} ${styles.zBubbles}`} ref={bubblesRef}>
          <div className={styles.containerInner}>
            <div className={`${styles.headingBlock} gsap-reveal-head`}>
              <span className={styles.badge} style={{ opacity: 0 }}>[ 03 / FEATURED WORK ]</span>
              <h2 style={{ opacity: 0 }}>Work <span className={styles.serifAccent}>portfolio</span>.</h2>
              <p style={{ opacity: 0 }}>{details.featuredWorkSub}</p>
            </div>
          </div>

          {/* 1-Line Interactive Slider */}
          <div 
            className={styles.sliderContainer}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className={styles.sliderTrack}
              style={{
                "--active-index": activeLogoIndex,
                "--drag-offset": `${dragOffset}px`,
                transition: (isDragging || !transitionEnabled) ? "none" : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
              } as React.CSSProperties}
            >
              {[...BRAND_BUBBLES, ...BRAND_BUBBLES, ...BRAND_BUBBLES].map((b: any, i: number) => {
                const distance = Math.abs(i - activeLogoIndex);
                
                let scale = 0.7;
                let opacity = 0.45;
                let zIndex = 1;
                
                if (distance === 0) {
                  scale = 1.35;
                  opacity = 1;
                  zIndex = 10;
                } else if (distance === 1) {
                  scale = 1.05;
                  opacity = 0.8;
                  zIndex = 5;
                } else if (distance === 2) {
                  scale = 0.85;
                  opacity = 0.6;
                  zIndex = 3;
                }

                return (
                  <div 
                    key={i}
                    className={`${styles.sliderItem} ${distance === 0 ? styles.activeItem : ""}`}
                    style={{
                      transform: `scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    onClick={() => {
                      if (!isDragging) {
                        setActiveLogoIndex(i);
                        resetAutoRotateTimer();
                      }
                    }}
                  >
                    <div className={`${styles.sliderBubble} ${distance === 0 ? styles.activeBubble : ""}`}>
                      <img 
                        src={`/zzz clientele optimized/${b.logoFile}`} 
                        alt={b.brandName} 
                        className={styles.clientLogoImg}
                        draggable="false"
                      />
                    </div>
                    <span className={styles.brandNameText}>{b.brandName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SECTION: Frequently Asked Questions */}
      {FAQS.length > 0 && (
        <section className={`${styles.section} ${styles.zFaq}`} ref={faqRef}>
          <div className={styles.containerInner}>
            <div className={`${styles.headingBlock} gsap-reveal-head`} style={{ alignSelf: "center", textAlign: "center", marginBottom: "2rem" }}>
              <span className={styles.badge} style={{ opacity: 0 }}>[ 05 / RESOURCES ]</span>
              <h2 style={{ opacity: 0, whiteSpace: "nowrap" }}>Frequently asked <span className={styles.serifAccent}>questions</span>.</h2>
            </div>

            <div className={styles.faqGrid}>
              {FAQS.map((faq: any, i: number) => (
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
                    onClick={() => handleFaqClick(i)}
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
      )}

      {/* SECTION: CTA / Enquiry Form */}
      <section className={`${styles.section} ${styles.zCta}`} ref={ctaRef} id="audit-form">
        <div className={styles.containerInner}>
          <div className={styles.formGrid}>

            {/* Info */}
            <div className={`${styles.contactInfo} gsap-reveal-info`}>
              <span className={styles.badge} style={{ opacity: 0 }}>[ 06 / CONNECT ]</span>
              <h3 style={{ opacity: 0 }}>Ready to grow your brand with <br /><span className={styles.serifAccent}>{service.name}</span>?</h3>
              <p style={{ opacity: 0 }}>Tell us about your brand and goals. We'll explore how {service.name} can drive meaningful growth and build brand equity for your business.</p>
            </div>

            {/* Form Card Wrapper for GSAP */}
            <div className="gsap-reveal-form-card" style={{ opacity: 0, width: "100%" }}>
              <div 
                ref={tiltFrame.ref}
                style={{ ...tiltFrame.style, width: "100%" }}
                className={`${styles.formCard} glassmorphism`}
              >
                <form onSubmit={handleFormSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="name" className={styles.label}>Your Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="John Doe"
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
                        placeholder="john@example.com"
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
                        type="tel"
                        id="phone"
                        required
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="company" className={styles.label}>Company / Brand Name</label>
                      <input
                        type="text"
                        id="company"
                        required
                        placeholder="My Awesome Brand"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="social" className={styles.label}>Social Links / Website</label>
                      <input
                        type="text"
                        id="social"
                        placeholder="instagram.com/brand"
                        value={form.socialLinks}
                        onChange={(e) => setForm({ ...form, socialLinks: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label htmlFor="location" className={styles.label}>Location</label>
                      <input
                        type="text"
                        id="location"
                        required
                        placeholder="City, Country"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                  </div>

                  {/* Multiselect Services Chips */}
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>What services are you interested in?</label>
                    <div className={styles.servicesGrid}>
                      {SERVICE_OPTIONS.map((srv) => {
                        const isSelected = form.selectedServices.includes(srv);
                        return (
                          <div
                            key={srv}
                            onClick={() => toggleService(srv)}
                            className={`${styles.serviceChip} ${isSelected ? styles.serviceChipSelected : ""}`}
                          >
                            {srv}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="brief" className={styles.label}>Project Brief / Scope of Work</label>
                    <textarea
                      id="brief"
                      required
                      rows={2}
                      placeholder="Tell us a little bit about what you're looking to build or achieve..."
                      value={form.brief}
                      onChange={(e) => setForm({ ...form, brief: e.target.value })}
                      className={styles.textarea}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={status === "sending"}
                  >
                    {status === "idle" && "Submit Inquiry"}
                    {status === "sending" && "Sending..."}
                    {status === "sent" && "Inquiry Sent! We will connect soon."}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Button */}
      <div className={styles.backButtonContainer}>
        <Link href="/" className={styles.backButton}>
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
