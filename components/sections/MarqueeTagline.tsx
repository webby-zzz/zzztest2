"use client";

import React from "react";
import styles from "./MarqueeTagline.module.css";

const TAGLINES = [
  "YOUR COMPETITOR IS PROBABLY READING THIS TOO",
];

export default function MarqueeTagline() {
  return (
    <section className={styles.section} id="brand-beliefs">
      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          {[...TAGLINES, ...TAGLINES, ...TAGLINES].map((text, idx) => (
            <span key={idx} className={styles.item}>
              <span className={styles.bullet}>•</span>
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
