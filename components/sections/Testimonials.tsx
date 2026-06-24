"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Testimonials.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ROW1_DATA = [
  {
    quote: "They are a great team of professionals who are highly skilled and determined towards their job! Their commitment towards their clients is remarkable. I have been connected with ZZZ for 4–6 months now, and they have always worked like an \"in-house\" department. Highly recommended!",
    author: "Aayush Varma",
    role: "Cabcon India Pvt. Ltd.",
    company: "Cabcon",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote: "Zip Zap Zop is one of the best marketing agencies I have come across. We are extremely happy with the way they work and look into every fine detail minutely. Their response system is so strong and they are available for any query any minute. Their quality of work is great and they really know what your brand needs are.",
    author: "Vidushi Dhandhania",
    role: "Krishna Fashions",
    company: "Krishna Fashions",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote: "The team is great and experienced in executing their work. They completed the work in the stipulated time frame they committed.",
    author: "Vinod Jodhani",
    role: "Quality Chrome",
    company: "Quality Chrome",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  }
];

const ROW2_DATA = [
  {
    quote: "It's been more than half a year, Nikunjnayak's social platform is being managed by Zip Zap Zop Marketing. Not only the followers have increased from around 100 to more than 1000 but we are also receiving around 2–3 queries from our target audience everyday. They have created an aesthetic look of the profile in such a way that it has increased the reach by around 400%. The first 2–3 months were like building the base but then it has shown multiplication effect in terms of overall growth. Their way of responding to the queries has increased our conversion rate as well. Very happy with the kind of work they do.",
    author: "Niraj Hindocha",
    role: "Nikunj Nayak",
    company: "Nikunj Nayak",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote: "Got my website built from them, great work, would definitely recommend to people looking to get any of their marketing needs met!",
    author: "Satwik Agarwal",
    role: "70/30 Logo",
    company: "70/30 Logo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote: "Zip Zap Zop Marketing is one of my favourite agencies. Not only is the team highly proactive but they've managed to deliver results in a shorter time than promised. Communication has never been a problem which is an issue with most agencies today. Being on the brand's end, you can definitely trust them to work with you, than for you!",
    author: "Krish Ginodja",
    role: "KidsKart India",
    company: "KidsKart India",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop",
  }
];

export default function Testimonials() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current.children,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 92%",
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.container}>
        <div className={`${styles.headingBlock} gsap-reveal-children`} ref={headingRef}>
          <span className={styles.badge} style={{ opacity: 0 }}>[ 06 / CLIENT REVIEWS ]</span>
          <h2 style={{ opacity: 0 }}>Hear from our <span className={styles.headingAccent}>partners</span>.</h2>
          <p style={{ opacity: 0 }}>With over 150+ clients served, here is what they have to say.</p>
        </div>

          <div className={styles.marqueeContainer}>
            {/* Row 1: Right to Left */}
            <div className={styles.marqueeTrack}>
              <div className={`${styles.marqueeRow} ${styles.scrollLeft}`}>
                {[...ROW1_DATA, ...ROW1_DATA].map((t, idx) => (
                  <div key={`row1-${idx}`} className={`${styles.testimonialCard} glassmorphism`}>
                    <p className={styles.quote}>"{t.quote}"</p>
                    <div className={styles.meta}>
                      <div className={styles.authorDetails}>
                        <span className={styles.authorName}>{t.author}</span>
                        <span className={styles.authorRole}>{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Row 2: Left to Right */}
            <div className={styles.marqueeTrack}>
              <div className={`${styles.marqueeRow} ${styles.scrollRight}`}>
                {[...ROW2_DATA, ...ROW2_DATA].map((t, idx) => (
                  <div key={`row2-${idx}`} className={`${styles.testimonialCard} glassmorphism`}>
                    <p className={styles.quote}>"{t.quote}"</p>
                    <div className={styles.meta}>
                      <div className={styles.authorDetails}>
                        <span className={styles.authorName}>{t.author}</span>
                        <span className={styles.authorRole}>{t.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
