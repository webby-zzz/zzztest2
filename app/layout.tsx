import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroller } from "@/components/SmoothScroller";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "ZZZ | Design Agency",
  description: "Test for ZZZ - Replicating offmenu.design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <Preloader />
          <SmoothScroller>
            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
          </SmoothScroller>
        </ThemeProvider>
      </body>
    </html>
  );
}
