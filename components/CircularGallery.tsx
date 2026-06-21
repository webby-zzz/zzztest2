"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CircularGallery.module.css";
import { SERVICES_DATA } from "../lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = SERVICES_DATA;

const colors = [
  "--brand-navy",
  "--brand-blue",
  "--brand-yellow",
  "--brand-coral",
  "--brand-lavender",
  "--brand-mint",
];

export default function CircularGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioningCircle, setTransitioningCircle] = useState<{ color: string, rect: DOMRect } | null>(null);
  const transitionOverlayRef = useRef<HTMLDivElement>(null);

  const numItems = SERVICES.length;
  const anglePerItem = 360 / numItems;

  useEffect(() => {
    // Reset scroll positions before initializing ScrollTrigger to prevent pin/offset calculation bugs
    window.scrollTo(0, 0);
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    if (!wrapperRef.current || !containerRef.current) return;

    let ctx = gsap.context(() => {
      const items = itemsRef.current;
      
      // Calculate radius dynamically to ensure it stays on screen but is large enough for gaps
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const radius = vw < 768 ? Math.min(vw * 0.8, 400) : Math.min(vh * 0.85, 800); 

      // 1. Position items in a full circle
      items.forEach((item, i) => {
        if (item) {
          // Arrange counter-clockwise: subtract angle instead of adding
          const angle = -90 - (i * anglePerItem);
          const theta = angle * (Math.PI / 180);
          const x = Math.cos(theta) * radius;
          const y = Math.sin(theta) * radius;
          
          gsap.set(item, {
            x: x,
            y: y,
            rotation: 0,
            transformOrigin: "50% 50%",
          });
        }
      });

      // 2. Position wrapper at the bottom center to create a circle where only top half is shown
      gsap.set(wrapperRef.current, {
        top: "100%",
        y: 0, 
        rotation: 0,
      });

      // 3. Staggered Entrance Animations
      const entranceTl = gsap.timeline({
        defaults: { ease: "power4.out" }
      });

      // Slide up and fade in hero text
      if (heroTextRef.current) {
        entranceTl.fromTo(heroTextRef.current.children, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, stagger: 0.12 }
        );
      }

      // Blossom out circles (fade in and scale up from center with elegant elastic overshoot)
      const validItems = items.filter(Boolean);
      if (validItems.length > 0) {
        entranceTl.fromTo(validItems,
          { scale: 0.4, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 1.2, 
            stagger: 0.08, 
            ease: "back.out(1.15)"
          },
          "-=0.6" // start slightly before the text finishes for continuity
        );
      }

      // ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800", 
          scrub: 0.5,
          pin: true,
          snap: {
            snapTo: 1 / numItems,
            duration: { min: 0.2, max: 0.5 },
            delay: 0.05,
            ease: "power2.out"
          },
          onUpdate: (self) => {
            // Adjust index calculation for 360 degree rotation
            const index = Math.round(self.progress * numItems) % numItems;
            setCurrentIndex(index);
            
            // Counter-rotate the cards so they remain perfectly upright
            gsap.set(itemsRef.current, {
              rotation: -(self.progress * 360)
            });
          }
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger || null;

      // Rotate the wrapper a full 360 degrees
      tl.fromTo(wrapperRef.current, 
        { rotation: 0 },
        {
          rotation: 360,
          ease: "none",
        }
      );
    }, containerRef); // Scope to container

    // Force ScrollTrigger to recalculate after layout and fonts are fully settled
    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
    });
    
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(refreshTimeout);
      ctx.revert(); // Cleanup all GSAP animations and ScrollTriggers on unmount
    };
  }, [numItems, anglePerItem]);

  const handleServiceClick = (index: number, element: HTMLElement | null) => {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const service = SERVICES[index];
    const colorVar = colors[index % colors.length];
    
    setTransitioningCircle({ color: `var(${colorVar})`, rect });

    // Wait a tick for the overlay to render, then animate
    setTimeout(() => {
      if (transitionOverlayRef.current) {
        gsap.to(transitionOverlayRef.current, {
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            router.push(`/services/${service.id}`);
          }
        });
      }
    }, 50);
  };

  return (
    <div className={styles.galleryContainer} ref={containerRef}>
      
      <div className={styles.stickyContent}>
        
        <div className={styles.heroText} ref={heroTextRef}>
          <h1 style={{ opacity: 0 }}>Reimagining marketing <br />as a digital <span className={styles.serifAccent}>experience</span>.</h1>
          <p style={{ opacity: 0 }}>Think success. Think <span className={styles.boldWord}>ZZZ</span>.</p>
          <div className={styles.centerActions} style={{ opacity: 0 }}>
            <div 
              className={styles.scrollDownContainer} 
              onClick={() => {
                const lenis = (window as any).lenis;
                if (lenis) {
                  lenis.scrollTo("#brand-beliefs", { duration: 1.5 });
                } else {
                  const target = document.getElementById("brand-beliefs");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
            >
              <span className={styles.scrollDownText}>Scroll Down</span>
              <svg 
                className={styles.scrollDownArrow} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div className={styles.scene}>
          <div className={styles.galleryWrapper} ref={wrapperRef}>
            {SERVICES.map((service, i) => {
              const colorVar = colors[i % colors.length];
              // Navy (0), Blue (1), Coral (3) are dark backgrounds; Yellow (2), Lavender (4), Mint (5) are light backgrounds
              const isDark = i % 6 === 0 || i % 6 === 1 || i % 6 === 3;
              const textColor = isDark ? "var(--brand-cream)" : "var(--brand-navy)";
              return (
                <div 
                  key={i} 
                  className={`${styles.galleryItem} ${currentIndex === i ? styles.active : ""}`}
                  ref={(el) => { itemsRef.current[i] = el; }}
                  onClick={(e) => handleServiceClick(i, e.currentTarget)}
                  style={{
                    backgroundColor: `var(${colorVar})`,
                    color: textColor,
                    opacity: 0
                  }}
                >
                  <div className={styles.circleContent}>
                    <span className={styles.circleNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.circleName}>{service.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Transition Overlay */}
      {transitioningCircle && (
        <div
          ref={transitionOverlayRef}
          style={{
            position: "fixed",
            top: transitioningCircle.rect.top,
            left: transitioningCircle.rect.left,
            width: transitioningCircle.rect.width,
            height: transitioningCircle.rect.height,
            backgroundColor: transitioningCircle.color,
            borderRadius: "50%",
            zIndex: 9999,
          }}
        />
      )}

    </div>
  );
}
