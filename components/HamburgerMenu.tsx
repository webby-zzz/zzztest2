"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import gsap from "gsap";
import styles from "./HamburgerMenu.module.css";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

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

      gsap.fromTo(linksRef.current,
        { y: 20, opacity: 0 },
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
    { label: "Home", href: "/" },
    { label: "Work", href: "/#portfolio-highlights" },
    { label: "Book a Call", href: "/contact" },
  ];

  const resourceItems = [
    { label: "Writing", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Terms of Service", href: "#" },
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
            <X size={24} />
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

        <div className={styles.resourcesSection} ref={(el) => { linksRef.current[menuItems.length] = el as any; }}>
          <span className={styles.resourcesTitle}>RESOURCES</span>
          <nav className={styles.resourcesNav}>
            {resourceItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={styles.resourceLink}
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
