import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroller } from "@/components/SmoothScroller";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  metadataBase: new URL("https://zipzapzop.in"),
  title: "ZZZ | Social Media Marketing Agency",
  description: "ZZZ is a premier social media marketing agency specializing in brand growth, content creation, and high-impact digital strategies.",
  icons: {
    icon: "/circle-favicon.png",
    shortcut: "/circle-favicon.png",
    apple: "/circle-favicon.png",
  },
  openGraph: {
    title: "ZZZ | Social Media Marketing Agency",
    description: "ZZZ is a premier social media marketing agency specializing in brand growth, content creation, and high-impact digital strategies.",
    images: [
      {
        url: "/circle-favicon.png",
        width: 800,
        height: 800,
        alt: "ZZZ Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ZZZ | Social Media Marketing Agency",
    description: "ZZZ is a premier social media marketing agency specializing in brand growth, content creation, and high-impact digital strategies.",
    images: ["/circle-favicon.png"],
  },
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
