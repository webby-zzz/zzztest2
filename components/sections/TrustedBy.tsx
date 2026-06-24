"use client";

import React from "react";
import styles from "./TrustedBy.module.css";

const CLIENTS = [
  { name: "Altwood", logo: "/zzz%20clientele%20optimized/Altwood%20logo.webp" },
  { name: "BC Sen", logo: "/zzz%20clientele%20optimized/BC%20Sen%20logo.webp" },
  { name: "BoldPack", logo: "/zzz%20clientele%20optimized/BoldPack%20logo.webp" },
  { name: "Cabcon", logo: "/zzz%20clientele%20optimized/Cabcon%20logo.webp" },
  { name: "Chef TeeDee", logo: "/zzz%20clientele%20optimized/Chef%20TeeDee%20logo.webp" },
  { name: "Crepes", logo: "/zzz%20clientele%20optimized/Crepes%20Logo.webp" },
  { name: "Deco Imagination", logo: "/zzz%20clientele%20optimized/Deco%20Imagination%20logo.webp" },
  { name: "Dragon King", logo: "/zzz%20clientele%20optimized/Dragon%20King%20logo.webp" },
  { name: "Funcorp", logo: "/zzz%20clientele%20optimized/Funcorp%20logo.webp" },
  { name: "Gokul", logo: "/zzz%20clientele%20optimized/Gokul%20logo.webp" },
  { name: "House Of Dreams", logo: "/zzz%20clientele%20optimized/House%20Of%20Dreams%20logo.webp" },
  { name: "Hustle Culture", logo: "/zzz%20clientele%20optimized/Hustle%20Culture%20logo.webp" },
  { name: "Klocal", logo: "/zzz%20clientele%20optimized/Klocal%20logo.webp" },
  { name: "Koala Kidz", logo: "/zzz%20clientele%20optimized/Koala%20Kidz%20logo.webp" },
  { name: "Lokaloom", logo: "/zzz%20clientele%20optimized/Lokaloom%20logo.webp" },
  { name: "Matri", logo: "/zzz%20clientele%20optimized/Matri%20Logo%20.webp" },
  { name: "PDS", logo: "/zzz%20clientele%20optimized/PDS%20logo.webp" },
  { name: "Travellers Paraadise", logo: "/zzz%20clientele%20optimized/Travellers%20Paraadise%20logo.webp" },
  { name: "Vedic Fuel", logo: "/zzz%20clientele%20optimized/Vedic%20Fuel%20logo.webp" }
];

export default function TrustedBy() {
  // Triple the list to create a seamless infinite marquee loop
  const duplicatedClients = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.badge}>[ Trusted By Brands Worldwide ]</span>
        <div className={styles.marqueeContainer}>
          <div className={styles.marquee}>
            {duplicatedClients.map((client, idx) => (
              <div key={idx} className={styles.logoBubble}>
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className={styles.logo}
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
