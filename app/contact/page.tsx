"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", brief: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", brief: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      
      {/* 3-COLUMN HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.containerInner}>
          <div className={styles.heroLayout}>
            
            {/* Column 1: Massive Heading, Subtitle, and CTAs */}
            <div className={styles.heroColMain}>
              <span className={styles.badge}>[ Let's start a project ]</span>
              <h1 className={styles.massiveText}>
                Drop us<br/>a <span className={styles.serifAccent}>line</span>.
              </h1>
              <p className={styles.heroSubText}>
                We are available to help with any queries regarding new campaigns, digital transformations, or creative partnerships. Reach out to our strategy team and you will receive a response within 12 hours. We look forward to scaling your vision.
              </p>
              
              <div className={styles.badgeWrapper}>
                <div className={styles.rotatingBadge}>
                  <svg viewBox="0 0 100 100" className={styles.badgeSvg}>
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                    <text>
                      <textPath href="#circlePath" startOffset="0%" fill="currentColor">
                        GET IN TOUCH • GET IN TOUCH • GET IN TOUCH • 
                      </textPath>
                    </text>
                  </svg>
                  <div className={styles.badgeIcon}>
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Column 2: Headquarters & Contact info */}
            <div className={styles.heroColSide}>
              <div className={`${styles.infoCard} glassmorphism`}>
                <h3 className={styles.cellTitle}>HEADQUARTERS</h3>
                <p className={styles.cellText}>
                  Level 4, Innovate Tech Park,<br/>
                  Cyber City, New Delhi
                </p>
                <button className={styles.outlineBtn}>GET DIRECTIONS</button>
              </div>

              <div className={`${styles.infoCard} glassmorphism`}>
                <h3 className={styles.cellTitle}>CONTACT DIRECT</h3>
                <p className={styles.cellText}>
                  <a href="mailto:hello@zzz.design" className={styles.link}>hello@zzz.design</a><br/>
                  <a href="tel:+919876543210" className={styles.link}>+91 98765 43210</a><br/>
                  <a href="tel:+911122334455" className={styles.link}>+91 11223 34455</a>
                </p>
              </div>
            </div>

            {/* Column 3: Global Reach & Socials */}
            <div className={styles.heroColSide}>
              <div className={`${styles.infoCard} glassmorphism`}>
                <h3 className={styles.cellTitle}>GLOBAL AVAILABILITY</h3>
                <div className={styles.tableText}>
                  <div>Primary HQ:</div><div>IST (New Delhi)</div>
                  <div>US Desk:</div><div>EST (New York)</div>
                  <div>UK Desk:</div><div>GMT (London)</div>
                  <div>Support:</div><div>24/7 Support</div>
                </div>
              </div>

              <div className={`${styles.infoCard} glassmorphism`}>
                <h3 className={styles.cellTitle}>STALK US</h3>
                <ul className={styles.socialList}>
                  <li><a href="#" className={styles.link}>LinkedIn</a></li>
                  <li><a href="#" className={styles.link}>Instagram</a></li>
                  <li><a href="#" className={styles.link}>Twitter (X)</a></li>
                  <li><a href="#" className={styles.link}>Dribbble</a></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className={styles.bookingSection}>
        <div className={styles.bookingHeader}>
          <span className={styles.badge}>[ Let's Connect ]</span>
          <h2>Ready to <span className={styles.serifAccent}>scale</span>?</h2>
          <p>Send us a direct message and let's start building something extraordinary.</p>
        </div>
        
        <div className={styles.formContainerWrapper}>
          <div className={`${styles.formContainer} glassmorphism`}>
            <h3 className={styles.formTitle}>Send a Message</h3>
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  placeholder="John Doe" 
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={styles.input} 
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Work Email</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  placeholder="john@company.com" 
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={styles.input} 
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="brief">Project Details</label>
                <textarea 
                  id="brief"
                  required
                  placeholder="Tell us about your brand, timeframe, and goals..." 
                  value={form.brief}
                  onChange={(e) => setForm({ ...form, brief: e.target.value })}
                  className={styles.textarea}
                />
              </div>
              <button 
                type="submit" 
                disabled={status !== "idle"}
                className={styles.submitBtn}
              >
                {status === "idle" && "Submit Request →"}
                {status === "sending" && "Submitting..."}
                {status === "sent" && "Enquiry Received ✓"}
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
