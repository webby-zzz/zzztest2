"use client";

import React, { useEffect } from "react";
import { X, ArrowRight, Check } from "lucide-react";
import { BrandCaseStudy } from "@/lib/data";
import styles from "./CaseStudyModal.module.css";

interface CaseStudyModalProps {
  caseStudy: BrandCaseStudy | null;
  onClose: () => void;
  onEnquireClick?: () => void;
}

export default function CaseStudyModal({
  caseStudy,
  onClose,
  onEnquireClick,
}: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (caseStudy) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  const logoSrc = caseStudy.logoFile
    ? `/zzz clientele optimized/${caseStudy.logoFile}`
    : null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-brand-name"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.logoWrapper}>
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt={`${caseStudy.brandName} Logo`}
                  className={styles.logoImg}
                />
              ) : (
                <span className={styles.logoFallback}>
                  {caseStudy.brandName.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className={styles.brandInfo}>
              <div className={styles.brandTitleRow}>
                <h3 id="modal-brand-name" className={styles.brandName}>
                  {caseStudy.brandName}
                </h3>
                {caseStudy.industry && (
                  <span className={styles.industryTag}>
                    {caseStudy.industry}
                  </span>
                )}
              </div>
              <span className={styles.serviceSub}>
                Case Study Report • {caseStudy.serviceCategory}
              </span>
            </div>
          </div>

          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.body}>
          <div className={styles.grid}>
            {/* Left Column: Vision & Execution Report */}
            <div className={styles.leftCol}>
              {/* Vision Block */}
              <div className={styles.sectionBlock}>
                <span className={styles.sectionBadge}>[ The Vision ]</span>
                <h4 className={styles.visionHeading}>"{caseStudy.vision}"</h4>
              </div>

              {/* Impact / Metrics */}
              {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                <div className={styles.sectionBlock}>
                  <span className={styles.sectionBadge}>[ Key Results ]</span>
                  <div className={styles.metricsGrid}>
                    {caseStudy.metrics.map((m, i) => (
                      <div key={i} className={styles.metricCard}>
                        <span className={styles.metricValue}>{m.value}</span>
                        <span className={styles.metricLabel}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Done Report */}
              <div className={styles.sectionBlock}>
                <span className={styles.sectionBadge}>[ Execution Report ]</span>
                <ul className={styles.workList}>
                  {caseStudy.workDone.map((item, idx) => (
                    <li key={idx} className={styles.workItem}>
                      <span className={styles.checkIcon}>
                        <Check size={12} />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Visual Media Showcase */}
            <div className={styles.rightCol}>
              <span className={styles.sectionBadge}>[ Visual Showcase ]</span>
              <div className={styles.mediaGallery}>
                {caseStudy.images.slice(0, 2).map((imgUrl, i) => (
                  <div key={i} className={styles.mediaCard}>
                    <img
                      src={imgUrl}
                      alt={`${caseStudy.brandName} showcase ${i + 1}`}
                      className={styles.mediaImg}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className={styles.footer}>
          <span className={styles.footerText}>
            Want results like this for your brand?
          </span>
          <button
            className={styles.enquireBtn}
            onClick={() => {
              onClose();
              if (onEnquireClick) {
                onEnquireClick();
              } else {
                const auditForm = document.getElementById("audit-form");
                if (auditForm) {
                  auditForm.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
          >
            Enquire For Similar Project <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
