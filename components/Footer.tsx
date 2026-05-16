"use client";

import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* MENU */}
          <div className={styles.column}>
            <h3 className={styles.colTitle}>MENU</h3>
            <div className={styles.links}>
              <Link href="/">Home</Link>
              <Link href="/services">Services</Link>
              <Link href="/work">Work</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          {/* SOCIALS */}
          <div className={styles.column}>
            <h3 className={styles.colTitle}>SOCIALS</h3>
            <div className={styles.links}>
              <a href="#" target="_blank" rel="noreferrer">X</a>
              <a href="#" target="_blank" rel="noreferrer">Instagram</a>
              <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>

          {/* RESOURCES */}
          <div className={styles.column}>
            <h3 className={styles.colTitle}>RESOURCES</h3>
            <div className={styles.links}>
              <Link href="#">Weekstack App</Link>
              <Link href="#">Newsletter</Link>
              <Link href="#">Case Studies</Link>
            </div>
            
            <button className={styles.actionButton}>
              Send a message
            </button>
          </div>
        </div>
      </div>

      <div className={styles.largeTextWrapper}>
        <h1 className={styles.largeText}>ZIP ZAP ZOP</h1>
      </div>
    </footer>
  );
}
