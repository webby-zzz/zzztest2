"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Folder, MapPin, Mail, Phone, Instagram, Linkedin, Twitter, Sparkles, ChevronDown } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    directory: false,
    services: false,
    connect: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
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
              <h3 className={styles.colTitle} onClick={() => toggleSection("directory")}>
                DIRECTORY
                <ChevronDown size={16} className={`${styles.mobileChevron} ${openSections.directory ? styles.chevronOpen : ""}`} />
              </h3>
              
              <div className={`${styles.collapsibleContent} ${openSections.directory ? styles.showContent : ""}`}>
                {/* macOS Blue Folder Illustration */}
                <div className={styles.blueFolder}>
                  <div className={styles.blueFolderTab} />
                  <div className={styles.blueFolderBack}>
                    <div className={styles.blueFolderPaper1} />
                    <div className={styles.blueFolderPaper2} />
                  </div>
                  <div className={styles.blueFolderFront} />
                </div>

                <div className={styles.links}>
                  <Link href="/#brand-beliefs"><span>Home</span> <Folder size={14} className={styles.linkFolderIcon} /></Link>
                  <Link href="/#about-us"><span>About</span> <Folder size={14} className={styles.linkFolderIcon} /></Link>
                  <Link href="/#services-grid"><span>Services</span> <Folder size={14} className={styles.linkFolderIcon} /></Link>
                  <Link href="/#portfolio-highlights"><span>Our Work</span> <Folder size={14} className={styles.linkFolderIcon} /></Link>
                  <Link href="/contact"><span>Connect</span> <Folder size={14} className={styles.linkFolderIcon} /></Link>
                </div>
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
              <h3 className={styles.colTitle} onClick={() => toggleSection("services")}>
                OUR SERVICES
                <ChevronDown size={16} className={`${styles.mobileChevron} ${openSections.services ? styles.chevronOpen : ""}`} />
              </h3>

              <div className={`${styles.collapsibleContent} ${openSections.services ? styles.showContent : ""}`}>
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

                <div className={styles.links}>
                  <Link href="/services/social-media-marketing">Social Media Marketing</Link>
                  <Link href="/services/content-creation">Content Creation</Link>
                  <Link href="/services/photography-videography">Photography & Videography</Link>
                  <Link href="/services/website-development">Website Development</Link>
                  <Link href="/services/branding-packaging">Branding & Packaging</Link>
                  <Link href="/services/brochures-catalogues">Brochures & Catalogues</Link>
                  <Link href="/services/linkedin-personal-branding">LinkedIn Personal Branding</Link>
                  <Link href="/services/event-invites-wedding-cards">Event Invites & Wedding Cards</Link>
                </div>
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
              <h3 className={styles.colTitle} onClick={() => toggleSection("connect")}>
                CONNECT WITH US
                <ChevronDown size={16} className={`${styles.mobileChevron} ${openSections.connect ? styles.chevronOpen : ""}`} />
              </h3>

              <div className={`${styles.collapsibleContent} ${openSections.connect ? styles.showContent : ""}`}>
                <div className={styles.contactDetails}>
                  <div className={styles.contactItem}>
                    <Mail size={16} className={styles.contactIcon} />
                    <div>
                      <strong>Email</strong>
                      <span>
                        <a href="mailto:info@zipzapzop.in" className={styles.contactLink}>info@zipzapzop.in</a> | <a href="mailto:avantika@zipzapzop.in" className={styles.contactLink}>avantika@zipzapzop.in</a>
                      </span>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <Phone size={16} className={styles.contactIcon} />
                    <div>
                      <strong>Phone</strong>
                      <span>+91 89109 76453</span>
                    </div>
                  </div>
                </div>

                {/* Social Grid */}
                <div className={styles.socialGrid}>
                  <a 
                    href="https://www.instagram.com/zipzapzop.marketing/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.socialPaperCard} 
                    aria-label="Instagram"
                  >
                    <Instagram size={18} className={styles.insta} />
                  </a>
                  <a 
                    href="https://in.linkedin.com/company/zipzapzop" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.socialPaperCard} 
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} className={styles.linkedin} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Grid Group (Row 1: Agency Info, Row 2: Copyright bar) */}
          <div className={styles.rightColumnGroup}>

            {/* Row 1: AGENCY INFO */}
            <div className={styles.rowOneGrid}>

              {/* Card 5: AGENCY INFO */}
              <div className={styles.folderCard}>
                <div className={styles.folderTab}>
                  <span className={styles.tabCover} />
                  <span className={styles.tabCurve} />
                </div>
                <div className={styles.folderBody}>
                  <h3 className={styles.colTitle}>AGENCY INFO</h3>
                  <div className={styles.agencyContent}>
                    <h4>Zip Zap Zop Marketing</h4>
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
                    {/* Hide for now
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#">Terms of Use</Link>
                    */}
                  </div>
                  <div className={styles.copyrightText}>
                    © 2026 Zip Zap Zop Marketing. All Rights Reserved.
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
