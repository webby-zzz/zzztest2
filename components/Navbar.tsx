"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { theme, setTheme, systemTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHidden, setIsLogoHidden] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide logo on homepage after scrolling past 1200px. Hide logo on other pages after scrolling past 300px.
      if (pathname === "/") {
        if (window.scrollY > 1200) {
          setIsLogoHidden(true);
        } else {
          setIsLogoHidden(false);
        }
      } else {
        if (window.scrollY > 300) {
          setIsLogoHidden(true);
        } else {
          setIsLogoHidden(false);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount or route change to handle pre-scrolled pages
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleTheme = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ""}`}>
      <div className={`${styles.logo} ${isLogoHidden ? styles.logoHidden : ""}`}>
        <Link href="/" scroll={false}>
          <Logo size={145} />
        </Link>
      </div>
      <div className={styles.actions}>
        <button
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label="Toggle Theme"
        >
          {mounted ? (
            theme === "dark" || (theme === 'system' && systemTheme === 'dark') ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )
          ) : (
            <div style={{ width: 20, height: 20 }} />
          )}
        </button>

        <button 
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
      </div>

      <HamburgerMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </nav>
  );
}
