"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import HamburgerMenu from "./HamburgerMenu";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" scroll={false}>
          <Logo size={110} />
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
