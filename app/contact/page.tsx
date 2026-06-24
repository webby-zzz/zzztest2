"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { ArrowUpRight, Mail, Phone, Instagram, Linkedin } from "lucide-react";
import { use3DTilt } from "@/lib/use3DTilt";

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

export default function ContactPage() {
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
  const tiltFrame = use3DTilt(5, -10);

  const handleFormSubmit = async (e: React.FormEvent) => {
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
                We are available to help with any queries regarding new campaigns, digital transformations, or creative partnerships. Reach out to our strategy team to discuss your goals and we will begin structuring a roadmap to scale your vision.
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
                  Kolkata, India.<br/>
                  Operating globally.
                </p>
              </div>

              <div className={`${styles.infoCard} glassmorphism`}>
                <h3 className={styles.cellTitle}>CONTACT DIRECT</h3>
                <p className={styles.cellText} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span className={styles.contactLine}>
                    <Mail size={16} className={styles.contactIcon} />
                    <a href="mailto:info@zipzapzop.in" className={styles.link}>info@zipzapzop.in</a>
                  </span>
                  <span className={styles.contactLine}>
                    <Mail size={16} className={styles.contactIcon} />
                    <a href="mailto:avantika@zipzapzop.in" className={styles.link}>avantika@zipzapzop.in</a>
                  </span>
                  <span className={styles.contactLine}>
                    <Phone size={16} className={styles.contactIcon} />
                    <a href="tel:+918910976453" className={styles.link}>+91 89109 76453</a>
                  </span>
                </p>
              </div>
            </div>

            {/* Column 3: Socials */}
            <div className={styles.heroColSide}>
              <div className={`${styles.infoCard} glassmorphism`}>
                <h3 className={styles.cellTitle}>STALK US</h3>
                <ul className={styles.socialList}>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Linkedin size={16} className={styles.contactIcon} />
                    <a href="https://in.linkedin.com/company/zipzapzop" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Instagram size={16} className={styles.contactIcon} />
                    <a href="https://www.instagram.com/zipzapzop.marketing/" target="_blank" rel="noopener noreferrer" className={styles.link}>Instagram</a>
                  </li>
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
        </div>
        
        <div className={styles.formContainerWrapper}>
          <div 
            ref={tiltFrame.ref}
            style={{ ...tiltFrame.style, width: "100%" }}
            className={`${styles.formContainer} glassmorphism`}
          >
            <h3 className={styles.formTitle}>Send a Message</h3>
            <form className={styles.form} onSubmit={handleFormSubmit}>
              
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Your Name</label>
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
                  <label htmlFor="email">Email Address</label>
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
                  <label htmlFor="phone">Phone Number</label>
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
                  <label htmlFor="company">Company Name</label>
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
                  <label htmlFor="socialLinks">Website & Social links</label>
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
                  <label htmlFor="location">City / Country</label>
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
                <label htmlFor="brief">Tell us about your brand</label>
                <textarea 
                  id="brief"
                  required
                  rows={4}
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
      </section>

    </div>
  );
}
