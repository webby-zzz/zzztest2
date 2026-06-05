"use client";

import React from "react";
import Link from "next/link";
import { Folder, MapPin, Mail, Phone, Instagram, Linkedin, Twitter, Sparkles } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Card 1: DIRECTORY */}
          <div className={styles.folderCard}>
            <div className={styles.folderTab}>
              <span className={styles.tabCover} />
              <span className={styles.tabCurve} />
            </div>
            <div className={styles.folderBody}>
              {/* macOS Blue Folder Illustration */}
              <div className={styles.blueFolder}>
                <div className={styles.blueFolderTab} />
                <div className={styles.blueFolderBack}>
                  <div className={styles.blueFolderPaper1} />
                  <div className={styles.blueFolderPaper2} />
                </div>
                <div className={styles.blueFolderFront} />
              </div>

              <h3 className={styles.colTitle}>DIRECTORY</h3>
              <div className={styles.links}>
                <Link href="/"><span>Home</span> <Folder size={14} className={styles.linkFolderIcon} /></Link>
                <Link href="/#about-us"><span>About Us</span> <Folder size={14} className={styles.linkFolderIcon} /></Link>
                <Link href="/#services-grid"><span>Services</span> <Folder size={14} className={styles.linkFolderIcon} /></Link>
                <Link href="/#portfolio-highlights"><span>Portfolio</span> <Folder size={14} className={styles.linkFolderIcon} /></Link>
                <Link href="/#blog-insights"><span>Blog</span> <Folder size={14} className={styles.linkFolderIcon} /></Link>
                <Link href="/#contact-cta"><span>Careers</span> <Folder size={14} className={styles.linkFolderIcon} /></Link>
              </div>
            </div>
          </div>

          {/* Card 2: OUR SERVICES */}
          <div className={styles.folderCard}>
            <div className={styles.folderTab}>
              <span className={styles.tabCover} />
              <span className={styles.tabCurve} />
            </div>
            <div className={styles.folderBody}>
              {/* Staggered Floating Documents Illustration */}
              <div className={styles.documentsIllustration}>
                <div className={`${styles.doc} ${styles.doc1}`}>
                  <span className={styles.docEmoji}>🌄</span>
                </div>
                <div className={`${styles.doc} ${styles.doc2}`}>
                  <span className={styles.docEmoji}>📊</span>
                </div>
                <div className={`${styles.doc} ${styles.doc3}`}>
                  <div className={styles.docLines}>
                    <span className={styles.docLine} />
                    <span className={styles.docLine} />
                    <span className={styles.docLine} style={{ width: "60%" }} />
                  </div>
                </div>
              </div>

              <h3 className={styles.colTitle}>OUR SERVICES</h3>
              <div className={styles.links}>
                <Link href="/#services-grid">Branding</Link>
                <Link href="/#services-grid">Web Design</Link>
                <Link href="/#services-grid">Digital Marketing</Link>
                <Link href="/#services-grid">UX/UI</Link>
                <Link href="/#services-grid">Motion Graphics</Link>
                <Link href="/#services-grid">Photography</Link>
              </div>
            </div>
          </div>

          {/* Card 3: CONNECT WITH US */}
          <div className={styles.folderCard}>
            <div className={styles.folderTab}>
              <span className={styles.tabCover} />
              <span className={styles.tabCurve} />
            </div>
            <div className={styles.folderBody}>
              <h3 className={styles.colTitle}>CONNECT WITH US</h3>

              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <MapPin size={16} className={styles.contactIcon} />
                  <div>
                    <strong>Address</strong>
                    <span>1323 Month, 23306</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <Mail size={16} className={styles.contactIcon} />
                  <div>
                    <strong>Email</strong>
                    <span>hello@zzz.design</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <Phone size={16} className={styles.contactIcon} />
                  <div>
                    <strong>Phone</strong>
                    <span>+123-356-6678</span>
                  </div>
                </div>
              </div>

              {/* Social Grid */}
              <div className={styles.socialGrid}>
                <a href="#" className={styles.socialPaperCard} aria-label="Instagram">
                  <Instagram size={18} className={styles.insta} />
                </a>
                <a href="#" className={styles.socialPaperCard} aria-label="LinkedIn">
                  <Linkedin size={18} className={styles.linkedin} />
                </a>
                <a href="#" className={styles.socialPaperCard} aria-label="Behance">
                  <span className={styles.behanceText}>Bē</span>
                </a>
                <a href="#" className={styles.socialPaperCard} aria-label="Dribbble">
                  <span className={styles.dribbbleEmoji}>🏀</span>
                </a>
                <a href="#" className={styles.socialPaperCard} aria-label="Twitter">
                  <Twitter size={18} className={styles.twitter} />
                </a>
                <a href="#" className={styles.socialPaperCard} aria-label="X">
                  <span className={styles.xText}>X</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column Grid Group (Row 1: Resources & Agency Info, Row 2: Copyright bar) */}
          <div className={styles.rightColumnGroup}>

            {/* Row 1: RESOURCES & AGENCY INFO */}
            <div className={styles.rowOneGrid}>

              {/* Card 4: RESOURCES */}
              <div className={styles.folderCard}>
                <div className={styles.folderTab}>
                  <span className={styles.tabCover} />
                  <span className={styles.tabCurve} />
                </div>
                <div className={styles.folderBody}>
                  <h3 className={styles.colTitle}>RESOURCES</h3>
                  <div className={styles.links}>
                    <Link href="#">Client Portal</Link>
                    <Link href="#">Our Work</Link>
                    <Link href="#">Whitepapers</Link>
                    <Link href="#">Download Brochure</Link>
                  </div>
                </div>
              </div>

              {/* Card 5: AGENCY INFO */}
              <div className={styles.folderCard}>
                <div className={styles.folderTab}>
                  <span className={styles.tabCover} />
                  <span className={styles.tabCurve} />
                </div>
                <div className={styles.folderBody}>
                  <h3 className={styles.colTitle}>AGENCY INFO</h3>
                  <div className={styles.agencyContent}>
                    <h4>ZZZ<span className={styles.agencyCo}>&CO.</span></h4>
                    <p>Designing premium digital experiences that elevate progressive brands.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Row 2: COPYRIGHT BAR */}
            <div className={`${styles.folderCard} ${styles.copyrightCard}`}>
              <div className={styles.folderTab}>
                <span className={styles.tabCover} />
                <span className={styles.tabCurve} />
              </div>
              <div className={styles.folderBody}>
                <div className={styles.copyrightInner}>
                  <div className={styles.copyrightLinks}>
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#">Terms of Use</Link>
                  </div>
                  <div className={styles.copyrightText}>
                    © 2026 ZZZ & CO. All Rights Reserved.
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
