import CircularGallery from "@/components/CircularGallery";
import MarqueeTagline from "@/components/sections/MarqueeTagline";
import AboutBrief from "@/components/sections/AboutBrief";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import StatsSection from "@/components/sections/StatsSection";
import PortfolioHighlights from "@/components/sections/PortfolioHighlights";
import Testimonials from "@/components/sections/Testimonials";
import HowWeWork from "@/components/sections/HowWeWork";
import AboutMe from "@/components/sections/AboutMe";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <main>
      <CircularGallery />
      <MarqueeTagline />
      <AboutBrief />
      <ServicesGrid />
      <WhyChooseUs />
      <StatsSection />
      <PortfolioHighlights />
      <Testimonials />
      <div id="methodology">
        <HowWeWork />
      </div>
      <AboutMe />
      <ContactCTA />
    </main>
  );
}
