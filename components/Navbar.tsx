"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
        <Link href="/">
          <Logo size={60} />
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
      </div>
    </nav>
  );
}
