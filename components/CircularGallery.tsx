"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CircularGallery.module.css";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const DUMMY_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=1000&auto=format&fit=crop",
];

export default function CircularGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const router = useRouter();

  const [showButtons, setShowButtons] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const numItems = DUMMY_IMAGES.length;
  const anglePerItem = 360 / numItems;

  useEffect(() => {
    if (!wrapperRef.current || !containerRef.current || !heroTextRef.current) return;

    const items = itemsRef.current;
    const radius = window.innerWidth < 768 ? 300 : 600;

    // 1. Position items in a 2D circle on the screen
    items.forEach((item, i) => {
      if (item) {
        // start at top (-90deg)
        const theta = (i * anglePerItem - 90) * (Math.PI / 180);
        const x = Math.cos(theta) * radius;
        const y = Math.sin(theta) * radius;
        gsap.set(item, {
          x: x,
          y: y,
          rotation: 0, // Always start upright
          transformOrigin: "50% 50%",
        });
      }
    });

    // 2. Initial state of the wrapper
    gsap.set(wrapperRef.current, {
      scale: 0.5,
      y: 0,
      rotation: 0,
    });


    // 3. Create the master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1200", // further reduced
        scrub: 1,
        pin: true,
        snap: {
          snapTo: (progress) => {
            if (progress < 0.15) return progress;
            const carouselWidth = 0.85;
            const step = carouselWidth / (numItems * 5);
            const carouselProgress = Math.max(0, progress - 0.15);
            const currentStep = Math.round(carouselProgress / step);
            return 0.15 + (currentStep * step);
          },
          duration: { min: 0.1, max: 0.3 },
          delay: 0.1,
          ease: "power2.inOut"
        },
        onUpdate: (self) => {
          // Show buttons only when we've passed the zoom phase (e.g., 15% progress)
          if (self.progress >= 0.15 && !showButtons) {
            setShowButtons(true);
          } else if (self.progress < 0.15 && showButtons) {
            setShowButtons(false);
          }

          if (self.progress >= 0.15) {
            const carouselProgress = (self.progress - 0.15) / 0.85;
            const itemsPassed = Math.round(carouselProgress * (numItems * 5)); // 5 rotations
            let calcIndex = (numItems - (itemsPassed % numItems)) % numItems;
            setCurrentIndex(calcIndex);
          }
        }
      },
    });

    // Save ST instance for button navigation
    scrollTriggerRef.current = tl.scrollTrigger || null;

    // Phase 1: Zoom In (takes first 20% of scroll)
    const targetScale = 2.2; // Reduced to keep images further back for an Apple vibe
    const zoomRotation = 180; // Rotate half-circle clockwise to bring item 0 to the bottom
    
    tl.to(wrapperRef.current, {
      scale: targetScale,
      y: -radius * targetScale,
      rotation: zoomRotation,
      duration: 0.15, // slightly faster
      ease: "power2.inOut",
    }, 0);

    // Counter-rotate items to keep them upright
    tl.to(itemsRef.current, {
      rotation: -zoomRotation,
      duration: 0.15,
      ease: "power2.inOut",
    }, 0);

    // Fade out and slide up hero text (h1 words)
    const words = gsap.utils.toArray(`.${styles.wordSpan}`, heroTextRef.current);
    tl.to(words, {
      y: -50,
      opacity: 0,
      stagger: 0.005,
      duration: 0.06,
      ease: "power2.in",
    }, 0);

    // Fade out and slide up sub-header at once
    const subHeader = heroTextRef.current.querySelector('p');
    if (subHeader) {
      tl.to(subHeader, {
        y: -50,
        opacity: 0,
        duration: 0.06,
        ease: "power2.in",
      }, 0);
    }

    // Phase 2: Carousel Scroll (takes remaining 80% of scroll)
    // Rotate the massive dial to scrub through the items clockwise (5 rotations).
    tl.to(wrapperRef.current, {
      rotation: `+=${360 * 5}`,
      duration: 0.85,
      ease: "none",
    }, 0.15);

    // Counter-rotate items to keep them upright
    tl.to(itemsRef.current, {
      rotation: `-=${360 * 5}`,
      duration: 0.85,
      ease: "none",
    }, 0.15);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [showButtons, anglePerItem, numItems]);


  const handleNext = () => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    
    // We are in the 0.15 - 1.0 progress range.
    // There are `numItems * 5` steps in this range.
    const progressPerStep = 0.85 / (numItems * 5);
    
    // Calculate current step based on current progress
    const currentCarouselProgress = Math.max(0, st.progress - 0.15);
    const currentStep = Math.round(currentCarouselProgress / progressPerStep);
    
    const nextStep = Math.min(numItems * 5, currentStep + 1);
    const targetProgress = 0.15 + (nextStep * progressPerStep);
    
    // Calculate target scroll position
    const targetScroll = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (!scrollTriggerRef.current) return;
    const st = scrollTriggerRef.current;
    
    const progressPerStep = 0.85 / (numItems * 5);
    const currentCarouselProgress = Math.max(0, st.progress - 0.15);
    const currentStep = Math.round(currentCarouselProgress / progressPerStep);
    
    const prevStep = Math.max(0, currentStep - 1);
    const targetProgress = 0.15 + (prevStep * progressPerStep);
    
    const targetScroll = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const handleItemClick = (e: React.MouseEvent, href: string, src: string, index: number) => {
    e.preventDefault();
    const item = itemsRef.current[index];
    if (!item || !containerRef.current) return;

    const img = item.querySelector(`.${styles.image}`) as HTMLImageElement;
    if (!img) return;

    const rect = img.getBoundingClientRect();

    // Create a clone for the transition
    const clone = document.createElement("div");
    clone.style.position = "fixed";
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.borderRadius = "50%";
    clone.style.backgroundImage = `url(${src})`;
    clone.style.backgroundSize = "cover";
    clone.style.backgroundPosition = "center";
    clone.style.zIndex = "1000";
    clone.style.pointerEvents = "none";
    document.body.appendChild(clone);

    // Fade out the gallery and text
    gsap.to([wrapperRef.current, heroTextRef.current, `.${styles.navButtons}`], {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    });

    // Animate the clone to fill the hero area
    gsap.to(clone, {
      top: "1vw",
      left: "1vw",
      width: "calc(100vw - 2vw)",
      height: "90vh",
      borderRadius: "2vw",
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        router.push(href + "?transition=seamless");
        // Keep clone for a moment to ensure seamless handoff
        gsap.to(clone, {
          opacity: 0,
          duration: 0.4,
          delay: 0.2,
          onComplete: () => {
            clone.remove();
          }
        });
      }
    });
  };

  const renderText = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className={styles.wordSpan}>
        {word}{" "}
      </span>
    ));
  };

  return (
    <div className={styles.galleryContainer} ref={containerRef}>
      <div className={styles.stickyContent}>
        <div className={styles.heroText} ref={heroTextRef}>
          <h1>{renderText("India's leading marketing agency.")}</h1>
          <p>Think Success? Think ZZZ</p>
        </div>
        
        <div className={styles.scene}>
          <div className={styles.galleryWrapper} ref={wrapperRef}>
            {DUMMY_IMAGES.map((src, i) => (
              <div 
                key={i} 
                className={styles.galleryItem}
                ref={(el) => { itemsRef.current[i] = el; }}
                onClick={(e) => handleItemClick(e, `/work/test-project-${i + 1}`, src, i)}
              >
                <div className={styles.imageContainer}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="test" className={styles.image} />
                </div>
                <div className={styles.itemInfo}>
                  <h3>test {i + 1}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className={`${styles.navButtons} ${showButtons ? styles.show : ""}`}>
          <button onClick={handlePrev} className={styles.navButton} aria-label="Previous">
            <ArrowLeft size={24} />
          </button>
          <button onClick={handleNext} className={styles.navButton} aria-label="Next">
            <ArrowRight size={24} />
          </button>
        </div>

      </div>
    </div>
  );
}
