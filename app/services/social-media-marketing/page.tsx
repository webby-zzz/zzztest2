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
import { CASE_STUDIES_DATA } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Brand Bubbles data (Portfolio Case Studies)
const BRAND_BUBBLES = CASE_STUDIES_DATA.filter(item => 
  item.services.includes("social-media-marketing")
);

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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<typeof BRAND_BUBBLES[0] | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", brief: "", socialLinks: "", location: "" });
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
          <img 
            src="/service banner.jpeg" 
            alt="Service Page Banner" 
            className={styles.heroImage}
          />
        </div>

        {/* HERO CONTENT */}
        <div className={styles.heroContent}>
          <div className="gsap-hero-el" style={{ opacity: 0 }}>
            <button className={styles.ctaButton} onClick={handleAuditClick}>
              Get My Social Audit <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </section>

      {/* SECTION: What We Do - Platforms */}
      <section className={`${styles.section} ${styles.zWhatWeDo}`} ref={whatWeDoRef}>
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
      <section className={`${styles.section} ${styles.zApproach}`} ref={approachRef} style={{ overflow: "hidden" }}>

        {/* PARALLAX ORNAMENTS */}
        <div className={`${styles.ornament} ${styles.ornament1}`} />
        <div className={`${styles.ornament} ${styles.ornament2}`} />

        <div className={styles.containerInner}>

          <div className={`${styles.headingBlock} gsap-reveal-head`}>
            <span className={styles.badge} style={{ opacity: 0 }}>[ 03 / OUR METHODOLOGY ]</span>
            <h2 style={{ opacity: 0 }}>Purpose over <span className={styles.serifAccent}>vanity</span>.</h2>
            <p className={styles.revealParagraph} ref={approachTextRef}>
              {`We don't post for the sake of posting. Every piece of content starts with understanding your audience, your competitors, and your goals. We then build a content strategy that maps to your business objectives — not just vanity metrics.`.split(" ").map((word, idx) => (
                <span key={idx} className={styles.word}>
                  {word}{" "}
                </span>
              ))}
            </p>
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
      <section className={`${styles.section} ${styles.zBubbles}`} ref={bubblesRef}>
        <div className={styles.containerInner}>

          <div className={`${styles.headingBlock} gsap-reveal-head`}>
            <span className={styles.badge} style={{ opacity: 0 }}>[ 04 / FEATURED WORK ]</span>
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
                    {selectedBrand.feed?.map((img, idx) => (
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
              <span className={styles.badge} style={{ opacity: 0 }}>[ 06 / KICKOFF ]</span>
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

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="socialLinks" className={styles.label}>Brand Social Media & Other Links</label>
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
                      placeholder="e.g. Mumbai, India"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="brief" className={styles.label}>Brief Description of Project</label>
                  <textarea
                    id="brief"
                    rows={4}
                    placeholder="Tell us about your project, social channels, and objectives..."
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
