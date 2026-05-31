"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactCTA.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactCTA() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const infoColRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (infoColRef.current) {
      gsap.fromTo(infoColRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoColRef.current,
            start: "top 92%",
          }
        }
      );
    }

    if (formColRef.current) {
      gsap.fromTo(formColRef.current,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: formColRef.current,
            start: "top 92%",
          }
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", msg: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <section className={styles.section} id="contact-cta">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Info Column */}
          <div className={`${styles.infoCol} gsap-reveal-children`} ref={infoColRef}>
            <span className={styles.badge} style={{ opacity: 0 }}>[ 12 / ENGAGEMENT ]</span>
            <h2 style={{ opacity: 0 }}>Let’s start building something <span className={styles.headingAccent}>extraordinary</span>.</h2>
            <p style={{ opacity: 0 }}>Have an idea or a brand ready for scaling? Reach out and we'll reply with a custom strategy within 24 hours.</p>
            
            <div className={styles.detailsList} style={{ opacity: 0 }}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Direct Line</span>
                <span className={styles.detailValue}>hello@zzz.design</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Studio Location</span>
                <span className={styles.detailValue}>New Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className={`${styles.formCol} glassmorphism gsap-reveal-item`} style={{ opacity: 0 }} ref={formColRef}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>Your Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="e.g. Jean Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="e.g. jean@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="msg" className={styles.label}>Project Scope / Message</label>
                <textarea
                  id="msg"
                  rows={4}
                  placeholder="Describe your goals, timeframe, and budget..."
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  className={styles.textarea}
                />
              </div>

              <button
                type="submit"
                disabled={status !== "idle"}
                className={styles.submitBtn}
              >
                {status === "idle" && "Send Proposal →"}
                {status === "sending" && "Submitting..."}
                {status === "sent" && "Proposal Received ✓"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
