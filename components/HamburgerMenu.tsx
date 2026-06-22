"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Instagram, Linkedin, Twitter } from "lucide-react";
import gsap from "gsap";
import styles from "./HamburgerMenu.module.css";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Animate In
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(panelRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.1
      });

      // Filter out null values before animating
      const elementsToAnimate = linksRef.current.filter(Boolean);

      gsap.fromTo(elementsToAnimate,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          delay: 0.2,
          clearProps: "transform,opacity" // Clear inline styles so CSS hover works
        }
      );
    } else {
      // Animate Out
      gsap.to(panelRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in"
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.in",
        delay: 0.2
      });
    }
  }, [isOpen]);

  const menuItems = [
    { label: "Home", href: "/#brand-beliefs" },
    { label: "About", href: "/#about-us" },
    { label: "Services", href: "/#hero-gallery" },
    { label: "Our Work", href: "/#portfolio-highlights" },
    { label: "Connect", href: "/contact" },
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={styles.overlay}
        ref={overlayRef}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className={styles.panel} ref={panelRef}>
        <div className={styles.header}>
          <span className={styles.title}>MENU</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={styles.navLink}
              ref={(el) => { linksRef.current[index] = el; }}
              onClick={onClose}
              scroll={false}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Social Icons Section */}
        <div 
          className={styles.socialsSection}
          ref={(el) => { linksRef.current[menuItems.length] = el; }}
        >
          <a 
            href="https://www.instagram.com/zipzapzop.marketing/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a 
            href="https://in.linkedin.com/company/zipzapzop" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a 
            href="https://x.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
            aria-label="Twitter / X"
          >
            <Twitter size={18} />
          </a>
          <a 
            href="https://behance.net" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
            aria-label="Behance"
          >
            <span className={styles.socialLabelText}>Bē</span>
          </a>
          <a 
            href="https://dribbble.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.socialLink}
            aria-label="Dribbble"
          >
            <span className={styles.socialLabelText}>🏀</span>
          </a>
        </div>
      </div>
    </>
  );
}
