"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/lib/use3DTilt";
import styles from "./ContactCTA.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICE_OPTIONS = [
  "Social Media Marketing",
  "Content Creation",
  "Photography & Videography",
  "Website Development",
  "Branding & Packaging",
  "Brochures & Catalogues",
  "LinkedIn Personal Branding",
  "Event Invites & Wedding Cards",
];

export default function ContactCTA() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    company: "", 
    brief: "", 
    socialLinks: "", 
    location: "",
    selectedServices: [] as string[]
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const infoColRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const tiltFrame = use3DTilt(5, -10);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.company || !form.location || !form.brief) return;

    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "edf00ae3-b8ce-480b-8fd6-145cbf610df6",
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          location: form.location,
          brief: form.brief,
          socialLinks: form.socialLinks,
          selectedServices: form.selectedServices.join(", "),
          subject: `New Lead from ${form.name} (${form.company})`
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("sent");
        setForm({ 
          name: "", 
          email: "", 
          phone: "", 
          company: "", 
          brief: "", 
          socialLinks: "", 
          location: "",
          selectedServices: []
        });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        console.error("Web3Forms submission failed:", result);
        setStatus("idle");
        alert("Failed to send message. Please try again or email us directly at info@zipzapzop.in");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("idle");
      alert("An error occurred. Please try again or email us directly at info@zipzapzop.in");
    }
  };

  return (
    <section className={styles.section} id="contact-cta">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Info Column */}
          <div className={`${styles.infoCol} gsap-reveal-children`} ref={infoColRef}>
            <span className={styles.badge} style={{ opacity: 0 }}>[ 12 / ENGAGEMENT ]</span>
            <h2 style={{ opacity: 0 }}>You've got the business. We've got <span className={styles.headingAccent}>ideas</span>.</h2>
            <p style={{ opacity: 0 }}>Tell us about your brand, your goals and where you'd like to grow. We'll take it from there.</p>
            
            <div className={styles.detailsList} style={{ opacity: 0 }}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Official Email</span>
                <span className={styles.detailValue}>info@zipzapzop.in</span>
              </div>
            </div>
          </div>

          {/* Form Column Wrapper for GSAP */}
          <div ref={formColRef} style={{ opacity: 0, width: "100%" }} className="gsap-reveal-item">
            <div 
              ref={tiltFrame.ref}
              style={{ ...tiltFrame.style, width: "100%" }}
              className={`${styles.formCol} glassmorphism`}
            >
              <form onSubmit={handleSubmit} className={styles.form}>
                
                <div className={styles.formRow}>
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
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      required
                      placeholder="e.g. +91 99999 99999"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="company" className={styles.label}>Company Name</label>
                    <input
                      type="text"
                      id="company"
                      required
                      placeholder="e.g. Acme Corp"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="socialLinks" className={styles.label}>Website & Social links</label>
                    <input
                      type="text"
                      id="socialLinks"
                      placeholder="e.g. instagram.com/brandname"
                      value={form.socialLinks}
                      onChange={(e) => setForm({ ...form, socialLinks: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="location" className={styles.label}>City / Country</label>
                    <input
                      type="text"
                      id="location"
                      required
                      placeholder="e.g. Mumbai, India"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Services you'd like to explore</label>
                  <div className={styles.servicesGrid}>
                    {SERVICE_OPTIONS.map((service) => {
                      const isSelected = form.selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          className={`${styles.serviceChip} ${isSelected ? styles.serviceChipSelected : ""}`}
                          onClick={() => {
                            const updated = isSelected
                              ? form.selectedServices.filter((s) => s !== service)
                              : [...form.selectedServices, service];
                            setForm({ ...form, selectedServices: updated });
                          }}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="brief" className={styles.label}>Tell us about your brand</label>
                  <textarea
                    id="brief"
                    rows={4}
                    required
                    placeholder="What do you do, what are your goals, and what challenges are you currently facing?"
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
                  {status === "idle" && "Book A Discovery Call →"}
                  {status === "sending" && "Sending Enquiry..."}
                  {status === "sent" && "Proposal Request Sent ✓"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
