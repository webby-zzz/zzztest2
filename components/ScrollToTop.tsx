"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import styles from "./ScrollToTop.module.css";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`${styles.badgeWrapper} ${visible ? styles.visible : ""}`}>
      <button
        className={styles.rotatingBadge}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 100 100" className={styles.badgeSvg}>
          <path id="scrollCirclePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
          <text>
            <textPath href="#scrollCirclePath" startOffset="0%" fill="currentColor">
              SCROLL TO TOP • SCROLL TO TOP • SCROLL TO TOP • 
            </textPath>
          </text>
        </svg>
        <div className={styles.badgeIcon}>
          <ArrowUp size={16} />
        </div>
      </button>
    </div>
  );
}
