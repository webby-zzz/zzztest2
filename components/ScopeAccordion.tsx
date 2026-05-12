"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "../app/work/[slug]/ProjectPage.module.css";
import { Plus, Minus } from "lucide-react";

interface ScopeItem {
  title: string;
  index: string;
  content: string;
}

const DUMMY_SCOPE: ScopeItem[] = [
  {
    title: "Brand Design",
    index: "01",
    content: "Crafting a unique visual identity that resonates with the target audience, including logo development, typography, and brand guidelines."
  },
  {
    title: "Web & Experiential",
    index: "02",
    content: "Building immersive digital experiences that combine cutting-edge technology with intuitive user interfaces to drive engagement."
  },
  {
    title: "Prototyping as Design",
    index: "03",
    content: "Rapidly iterating through interactive prototypes to validate concepts and ensure a seamless final product experience."
  }
];

export default function ScopeAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    contentRefs.current.forEach((ref, i) => {
      if (ref) {
        if (activeIndex === i) {
          gsap.to(ref, {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        } else {
          gsap.to(ref, {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      }
    });
  }, [activeIndex]);

  return (
    <div className={styles.scopeSection}>
      <div className={styles.label}>Scope</div>
      {DUMMY_SCOPE.map((item, i) => (
        <div key={i} className={styles.accordionItem}>
          <button 
            className={styles.scopeRow} 
            onClick={() => toggleAccordion(i)}
            aria-expanded={activeIndex === i}
          >
            <div className={styles.scopeTitleContainer}>
              <span>{item.title}</span>
              {activeIndex === i ? <Minus size={18} /> : <Plus size={18} />}
            </div>
            <span className={styles.scopeIndex}>{item.index}</span>
          </button>
          <div 
            className={styles.accordionContent}
            ref={(el) => { contentRefs.current[i] = el; }}
          >
            <p className={styles.scopeDescription}>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
