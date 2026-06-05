"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HowWeWork.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    step: "01",
    phase: "DISCOVERY CALL",
    title: "Discovery Call",
    desc: "We understand your brand, goals, and audience requirements in detail.",
    accent: "brand"
  },
  {
    step: "02",
    phase: "STRATEGY & PROPOSAL",
    title: "Strategy & Proposal",
    desc: "We put together a tailored deployment plan and a custom commercial quote.",
    accent: "quote"
  },
  {
    step: "03",
    phase: "CREATIVE KICKOFF",
    title: "Creative Kickoff",
    desc: "Our creative leads get to work constructing designs, writing copy, and preparing content.",
    accent: "work"
  },
  {
    step: "04",
    phase: "REVIEW & REVISE",
    title: "Review & Revise",
    desc: "You review the work-in-progress, provide iterative feedback, and we refine.",
    accent: "refine"
  },
  {
    step: "05",
    phase: "DELIVERY & DEPLOYMENT",
    title: "Delivery & Deployment",
    desc: "Files, technical source code assets, and go-live deployment are handed over cleanly.",
    accent: "live"
  },
  {
    step: "06",
    phase: "ONGOING SUPPORT",
    title: "Ongoing Support",
    desc: "We stay in your corner for regular maintenance, analytics tracking, or ad-hoc tasks.",
    accent: "corner"
  }
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineProgressRef = useRef<HTMLDivElement>(null);
  const backgroundLineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const descRef = useRef<(HTMLDivElement | null)[]>([]);
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

    const section = sectionRef.current;
    const container = containerRef.current;
    const lineProgress = lineProgressRef.current;
    const backgroundLine = backgroundLineRef.current;

    if (!section || !container || !lineProgress || !backgroundLine) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const nodes = nodesRef.current.filter(Boolean) as HTMLDivElement[];
      const descs = descRef.current.filter(Boolean) as HTMLDivElement[];
      const items = Array.from(container.getElementsByClassName(styles.timelineItem)) as HTMLDivElement[];

      if (items.length === 0) return;

      const node1Left = items[0].offsetLeft + items[0].offsetWidth / 2;
      const nodeLastLeft = items[items.length - 1].offsetLeft + items[items.length - 1].offsetWidth / 2;
      const lineDistance = nodeLastLeft - node1Left;

      // Position the background line from 0 to last node
      gsap.set(backgroundLine, { left: 0, width: nodeLastLeft });
      // Initialize progress line to 0 width
      gsap.set(lineProgress, { left: 0, width: 0 });

      // Create main timeline for horizontal scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${lineDistance * 1.5}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      // Phase 1: Draw progress line to node 1 (center) and highlight card 0
      tl.to(lineProgress, {
        width: node1Left,
        duration: 0.15,
        ease: "power1.inOut"
      }, 0);

      tl.to(cards[0], {
        opacity: 1,
        scale: 1.06,
        borderColor: "var(--accent-color)",
        boxShadow: "0 10px 40px rgba(96, 165, 250, 0.05)",
        duration: 0.15,
        ease: "power1.inOut"
      }, 0);

      tl.to(nodes[0], {
        backgroundColor: "var(--accent-color)",
        borderColor: "var(--accent-color)",
        scale: 1.35,
        boxShadow: "0 0 15px var(--accent-color)",
        duration: 0.15,
        ease: "power1.inOut"
      }, 0);

      tl.to(descs[0], {
        opacity: 1,
        y: 0,
        duration: 0.15,
        ease: "power1.inOut"
      }, 0);

      // Phase 2: Horizontal scroll translation and progress line growth to the end
      tl.to(container, {
        x: -lineDistance,
        duration: 1.0,
        ease: "none",
      }, 0.15);

      tl.to(lineProgress, {
        width: nodeLastLeft,
        duration: 1.0,
        ease: "none",
      }, 0.15);

      // Card 0 fades back down as it leaves the center
      tl.to(cards[0], {
        opacity: 0.3,
        scale: 0.94,
        borderColor: "var(--glass-border)",
        boxShadow: "none",
        duration: 0.15,
        ease: "power2.in"
      }, 0.15);

      tl.to(nodes[0], {
        backgroundColor: "var(--background)",
        borderColor: "var(--border)",
        scale: 1,
        boxShadow: "none",
        duration: 0.15,
        ease: "power2.in"
      }, 0.15);

      tl.to(descs[0], {
        opacity: 0,
        y: 10,
        duration: 0.15,
        ease: "power2.in"
      }, 0.15);

      // Animate intermediate/last cards and nodes as they align with the center
      cards.forEach((card, idx) => {
        if (idx === 0) return;
        const desc = descs[idx];
        const node = nodes[idx];
        const item = items[idx];
        if (!desc || !node || !item) return;

        const nodeLeft = item.offsetLeft + item.offsetWidth / 2;
        const centerT_phase2 = (nodeLeft - node1Left) / lineDistance;
        const centerT = 0.15 + centerT_phase2;
        const fadeDuration = 0.15;

        // Fade In / Highlight
        tl.to(card, {
          opacity: 1,
          scale: 1.06,
          borderColor: "var(--accent-color)",
          boxShadow: "0 10px 40px rgba(96, 165, 250, 0.05)",
          duration: fadeDuration,
          ease: "power2.out"
        }, centerT - fadeDuration);

        tl.to(node, {
          backgroundColor: "var(--accent-color)",
          borderColor: "var(--accent-color)",
          scale: 1.35,
          boxShadow: "0 0 15px var(--accent-color)",
          duration: fadeDuration,
          ease: "power2.out"
        }, centerT - fadeDuration);

        tl.to(desc, {
          opacity: 1,
          y: 0,
          duration: fadeDuration,
          ease: "power2.out"
        }, centerT - fadeDuration);

        // Fade Out / Unhighlight (if not the last card)
        if (idx < cards.length - 1) {
          tl.to(card, {
            opacity: 0.3,
            scale: 0.94,
            borderColor: "var(--glass-border)",
            boxShadow: "none",
            duration: fadeDuration,
            ease: "power2.in"
          }, centerT);

          tl.to(node, {
            backgroundColor: "var(--background)",
            borderColor: "var(--border)",
            scale: 1,
            boxShadow: "none",
            duration: fadeDuration,
            ease: "power2.in"
          }, centerT);

          tl.to(desc, {
            opacity: 0,
            y: 10,
            duration: fadeDuration,
            ease: "power2.in"
          }, centerT);
        }
      });
    });

    mm.add("(max-width: 1024px)", () => {
      // Mobile Fallback: Vertical scroll triggers highlight cards
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const descs = descRef.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, idx) => {
        const desc = descs[idx];
        if (!desc) return;

        // Set mobile default to fully visible
        gsap.set(desc, { opacity: 1, y: 0 });

        gsap.fromTo(card,
          { opacity: 0.3, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "bottom 55%",
              toggleActions: "play reverse play reverse",
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.headerContainer}>
        <div className={`${styles.headingBlock} gsap-reveal-children`} ref={headingRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 07 / WORKFLOW ]</span>
          <h2 style={{ opacity: 0 }}>How we <span className={styles.headingAccent}>work</span>.</h2>
          <p style={{ opacity: 0 }}>A transparent timeline mapping our deployment pipeline from kickoff to delivery.</p>
        </div>
      </div>

      <div className={styles.timelineWrapper}>
        <div className={styles.timelineContainer} ref={containerRef}>
          
          {/* Progress Line inside scrollable container */}
          <div className={styles.backgroundLine} ref={backgroundLineRef}>
            <div className={styles.lineProgress} ref={lineProgressRef} />
          </div>

          {STEPS.map((step, index) => (
            <div key={index} className={styles.timelineItem}>
              
              {/* Timeline dot/node representing current step */}
              <div 
                className={styles.timelineNode}
                ref={(el) => { nodesRef.current[index] = el; }}
              >
                <span className={styles.nodeInnerDot} />
              </div>

              {/* Card Container below the node */}
              <div 
                className={`${styles.card} glassmorphism`}
                ref={(el) => { cardsRef.current[index] = el; }}
              >
                <div className={styles.topBar}>
                  <span className={styles.stepNum}>{step.step}</span>
                  <span className={styles.phase}>{step.phase}</span>
                </div>
                <div className={styles.cardContent}>
                  <h4>
                    {step.title.split(" ").map((word, i) => {
                      const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
                      const cleanAccent = step.accent.toLowerCase();
                      const isHighlight = cleanWord.includes(cleanAccent) || cleanAccent.includes(cleanWord);
                      return (
                        <span key={i} className={isHighlight ? styles.serifWord : ""}>
                          {word}{" "}
                        </span>
                      );
                    })}
                  </h4>
                  
                  {/* Stable Fading Description Wrapper */}
                  <div 
                    className={styles.cardDescWrapper}
                    ref={(el) => { descRef.current[index] = el; }}
                  >
                    <p>{step.desc}</p>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
