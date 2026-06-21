"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  if (window.history && "scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
}

export function SmoothScroller({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (lenis) {
      // Instantly reset scroll positions
      lenis.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);

      // Stop scrolling momentarily to let Next.js render and layout settle
      lenis.stop();
      
      // Refresh ScrollTrigger at progressive intervals to handle hydration and layout settling
      const timers = [
        setTimeout(() => {
          lenis.start();
          ScrollTrigger.clearScrollMemory();
          ScrollTrigger.refresh(true);
        }, 100),
        setTimeout(() => {
          ScrollTrigger.refresh(true);
        }, 300),
        setTimeout(() => {
          ScrollTrigger.refresh(true);
        }, 600)
      ];

      return () => {
        timers.forEach(clearTimeout);
        lenis.start(); // Ensure scroller is always restarted on cleanup
      };
    }
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    (window as any).lenis = lenis;

    // Sync ScrollTrigger updates with Lenis scrolling
    lenis.on("scroll", ScrollTrigger.update);

    // Watch body height changes to refresh ScrollTrigger dynamically
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    if (document.body) {
      resizeObserver.observe(document.body);
    }

    // Sync GSAP animations with Lenis frames
    const updatePhysics = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updatePhysics);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updatePhysics);
      resizeObserver.disconnect();
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}
