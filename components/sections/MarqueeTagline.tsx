"use client";

import React from "react";
import styles from "./MarqueeTagline.module.css";

const TAGLINES = [
  "We don't just make things look good. We make them work.",
  "Design with absolute purpose.",
  "Aesthetics meet commercial strategy.",
];

export default function MarqueeTagline() {
  return (
    <section className={styles.section} id="brand-beliefs">
      <div className={styles.badge}>[ 01 / CORE BELIEFS ]</div>
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
