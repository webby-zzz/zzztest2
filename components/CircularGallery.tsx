"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CircularGallery.module.css";
import Logo from "./Logo";
import { SERVICES_DATA } from "../lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = SERVICES_DATA;

export default function CircularGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioningImage, setTransitioningImage] = useState<{ src: string, rect: DOMRect } | null>(null);
  const transitionOverlayRef = useRef<HTMLImageElement>(null);

  const numItems = SERVICES.length;
  const anglePerItem = 360 / numItems;

  useEffect(() => {
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
          const angle = (i * anglePerItem) - 90;
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

      // Initial text slide-up animation
      if (heroTextRef.current) {
        gsap.fromTo(heroTextRef.current.children, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
        );
      }

      // ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=6000", // Increased to require 3-4 more scrolls
          scrub: 0.5,
          pin: true,
          snap: 1 / numItems,
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
    
    // Get the bounding box of the clicked image container
    const rect = element.getBoundingClientRect();
    const service = SERVICES[index];
    
    setTransitioningImage({ src: service.image, rect });

    // Wait a tick for the overlay image to render, then animate
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
          <h1>India's best marketing agency</h1>
          <p>Think success? Think ZZZ</p>
          <div className={styles.centerActions}>
            <button className={styles.joinButton} onClick={() => handleServiceClick(currentIndex, itemsRef.current[currentIndex])}>
              View {SERVICES[currentIndex].name}
            </button>
          </div>
        </div>
        
        <div className={styles.scene}>
          <div className={styles.galleryWrapper} ref={wrapperRef}>
            {SERVICES.map((service, i) => (
              <div 
                key={i} 
                className={`${styles.galleryItem} ${currentIndex === i ? styles.active : ""}`}
                ref={(el) => { itemsRef.current[i] = el; }}
                onClick={(e) => handleServiceClick(i, e.currentTarget)}
              >
                <div className={styles.imageContainer}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.image} alt={service.name} className={styles.image} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Transition Overlay */}
      {transitioningImage && (
        <img
          ref={transitionOverlayRef}
          src={transitioningImage.src}
          alt="Transition overlay"
          style={{
            position: "fixed",
            top: transitioningImage.rect.top,
            left: transitioningImage.rect.left,
            width: transitioningImage.rect.width,
            height: transitioningImage.rect.height,
            objectFit: "cover",
            borderRadius: "40px", // matches gallery item border radius
            zIndex: 9999,
          }}
        />
      )}

    </div>
  );
}
