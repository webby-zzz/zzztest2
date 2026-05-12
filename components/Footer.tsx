"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Dribbble, Search } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        {/* Left: Nav Links */}
        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/works">Works</Link>
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact">Contact us</Link>
        </div>

        {/* Center: Follow Us */}
        <div className={styles.followSection}>
          <span className={styles.followTitle}>Follow us</span>
          <div className={styles.contactInfo}>
            <a href="mailto:mail@studio.com">mail@studio.com</a>
            <a href="tel:+910123456789">+91 0123456789</a>
          </div>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialIcon}><Instagram size={20} /></a>
            <a href="#" className={styles.socialIcon}><Twitter size={20} /></a>
            <a href="#" className={styles.socialIcon}><Dribbble size={20} /></a>
            <a href="#" className={styles.socialIcon}><Search size={20} /></a>
          </div>
        </div>

        {/* Right: Address */}
        <div className={styles.addressSection}>
          <span className={styles.addressTitle}>Address</span>
          <p>#21, North Street,</p>
          <p>Velachery,</p>
          <p>Chennai.</p>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div>
          © {currentYear} Studio. All Rights Reserved.
        </div>
        <div className={styles.bottomLinks}>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>

      {/* Large Background Text */}
      <div className={styles.largeText}>
        ZIP ZAP ZOP
      </div>
    </footer>
  );
}
