"use client";

import styles from "./page.module.css";
import { ArrowUpRight, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";

export default function ContactPage() {
  return (
    <div className={styles.container}>
      
      {/* BRUTALIST HERO GRID */}
      <section className={styles.gridHero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.massiveText}>DROP US<br/>A LINE</h1>
        </div>
        
        <div className={styles.heroRight}>
          <div className={styles.gridCell}>
            <h3 className={styles.cellTitle}>HEADQUARTERS</h3>
            <p className={styles.cellText}>
              ZZZ Agency HQ,<br/>
              Level 4, Innovate Tech Park,<br/>
              Cyber City, New Delhi
            </p>
            <button className={styles.outlineBtn}>GET DIRECTIONS</button>
          </div>
          
          <div className={styles.gridCell}>
            <h3 className={styles.cellTitle}>CONTACT</h3>
            <p className={styles.cellText}>
              <a href="mailto:hello@zzz.agency" className={styles.link}>hello@zzz.agency</a><br/>
              <a href="tel:+919876543210" className={styles.link}>+91 98765 43210</a><br/>
              <a href="tel:+911122334455" className={styles.link}>+91 11223 34455</a>
            </p>
          </div>
          
          <div className={styles.gridCell}>
            <h3 className={styles.cellTitle}>GLOBAL REACH</h3>
            <div className={styles.tableText}>
              <div>Primary HQ:</div><div>IST (New Delhi)</div>
              <div>US Desk:</div><div>EST (New York)</div>
              <div>UK Desk:</div><div>GMT (London)</div>
              <div>Support:</div><div>24/7 Available</div>
            </div>
          </div>
          
          <div className={styles.gridCell}>
            <h3 className={styles.cellTitle}>STALK US</h3>
            <ul className={styles.socialList}>
              <li><a href="#" className={styles.link}>LinkedIn</a></li>
              <li><a href="#" className={styles.link}>Instagram</a></li>
              <li><a href="#" className={styles.link}>Twitter (X)</a></li>
              <li><a href="#" className={styles.link}>Dribbble</a></li>
            </ul>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className={styles.stripSection}>
        <div className={styles.stripText}>
          We are available to help with any queries regarding new campaigns, digital transformations, or creative partnerships. Reach out to our strategy team and you will be guaranteed to receive a response within 12 hours. We look forward to scaling your vision.
        </div>
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
      </section>

      {/* BOOKING SECTION */}
      <section className={styles.bookingSection}>
        <div className={styles.bookingHeader}>
          <h2>Ready to scale?</h2>
          <p>Book a discovery call with our strategy team or send us a direct message.</p>
        </div>
        
        <div className={styles.bookingGrid}>
          {/* FORM SIDE */}
          <div className={styles.formContainer}>
            <h3 className={styles.formTitle}>Send a Message</h3>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Work Email</label>
                <input type="email" placeholder="john@company.com" className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label>Project Details</label>
                <textarea placeholder="Tell us about your brand and goals..." className={styles.textarea}></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>Submit Request</button>
            </form>
          </div>

          {/* CALENDAR SIDE */}
          <div className={styles.calendarContainer}>
            <h3 className={styles.formTitle}>Book a Discovery Call</h3>
            <div className={styles.calendarCard}>
              <div className={styles.calHeader}>
                <div className={styles.calMonth}>
                  <CalendarIcon size={20} />
                  <span>October 2026</span>
                </div>
                <div className={styles.calNav}>
                  <button><ChevronLeft size={20} /></button>
                  <button><ChevronRight size={20} /></button>
                </div>
              </div>
              
              <div className={styles.calGrid}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className={styles.calDayLabel}>{day}</div>
                ))}
                
                {/* Empty days for offset */}
                <div className={styles.calDayEmpty}></div>
                <div className={styles.calDayEmpty}></div>
                <div className={styles.calDayEmpty}></div>
                <div className={styles.calDayEmpty}></div>
                
                {/* Days */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  // Mock active days
                  const isActive = [15, 16, 18, 22, 23, 25, 29].includes(day);
                  const isSelected = day === 22;
                  
                  return (
                    <button 
                      key={day} 
                      className={`${styles.calDay} ${isActive ? styles.calDayActive : ''} ${isSelected ? styles.calDaySelected : ''}`}
                      disabled={!isActive}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              
              <div className={styles.timeSlotsWrapper}>
                <h4>Available Times</h4>
                <div className={styles.timeSlots}>
                  <button className={styles.timeSlot}>09:30 AM</button>
                  <button className={styles.timeSlot}>11:00 AM</button>
                  <button className={`${styles.timeSlot} ${styles.timeSlotSelected}`}>02:00 PM</button>
                  <button className={styles.timeSlot}>04:30 PM</button>
                </div>
              </div>
              
              <button className={styles.confirmBtn}>
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
