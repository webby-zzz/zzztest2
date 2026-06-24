"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import PageAnimator from "../../../components/PageAnimator";
import ScopeAccordion from "../../../components/ScopeAccordion";
import styles from "./ProjectPage.module.css";

interface ProjectClientProps {
  slug: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ProjectClient({ slug, searchParams }: ProjectClientProps) {
  const projectName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const isSeamless = searchParams?.transition === 'seamless';
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (titleRef.current && introRef.current) {
      const titleWords = titleRef.current.querySelectorAll(`.${styles.wordSpan}`);
      
      gsap.fromTo(titleWords, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.05, 
          duration: 0.8, 
          ease: "power3.out",
          delay: isSeamless ? 0.4 : 0.8 // Wait for page transition
        }
      );

      gsap.fromTo(introRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: isSeamless ? 0.6 : 1.0
        }
      );
    }
  }, [isSeamless]);

  const renderText = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className={styles.wordSpan}>
        {word}{" "}
      </span>
    ));
  };
  
  // Dummy images to match the masonry layout requested
  const heroImage = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop";
  const gal1 = "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop";
  const gal2 = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop";
  const gal3 = "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=1000&auto=format&fit=crop";

  return (
    <PageAnimator shouldSlideUp={!isSeamless}>
      <main className={styles.main}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImage} alt={projectName} className={styles.heroImage} />
          <h1 className={styles.heroTitle} ref={titleRef}>
            {renderText(projectName)}
          </h1>
        </div>

        {/* Info Section */}
        <div className={styles.infoSection}>
          {/* Left Column */}
          <div className={styles.leftCol}>
            <div className={styles.label}>
              <div style={{width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--foreground)'}}></div>
              Introduction
            </div>
            <p className={styles.introText} ref={introRef}>
              {projectName} is a consumer-grade AI learning platform that helps anyone quickly get good at using modern AI tools for work and fun. It offers a fast, practical way to learn AI through short, hands-on tutorials rather than long, static courses.
            </p>

            <ScopeAccordion />
          </div>

          {/* Right Column */}
          <div className={styles.rightCol}>
            <div className={styles.label}>Details</div>
            <div className={styles.detailsTable}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Project Name</span>
                <span className={styles.detailValue}>{projectName}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Timeframe</span>
                <span className={styles.detailValue}>2024</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Role</span>
                <span className={styles.detailValue}>Brand, Website, Product</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className={styles.gallerySection}>
          <div className={`${styles.galleryItem} ${styles.galleryItemLarge}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gal1} alt="Gallery 1" />
          </div>
          <div className={`${styles.galleryItem} ${styles.galleryItemMedium}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gal2} alt="Gallery 2" />
          </div>
          <div className={`${styles.galleryItem} ${styles.galleryItemTall}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={gal3} alt="Gallery 3" />
          </div>
        </div>
      </main>
    </PageAnimator>
  );
}
