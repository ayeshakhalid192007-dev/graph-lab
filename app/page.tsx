import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/landing/Hero";
import { LiveTerminal } from "@/components/landing/LiveTerminal";
import { Curriculum } from "@/components/landing/Curriculum";
import { PatternGrid } from "@/components/landing/PatternGrid";
import { GetStarted } from "@/components/landing/GetStarted";
import { MaintainersSection } from "@/components/landing/MaintainersSection";
import { Footer } from "@/components/landing/Footer";

/**
 * Landing page for graph-lab. Clean, focused layout with essential sections:
 * Hero, Live Terminal, Curriculum, Patterns, Getting Started, Maintainers, and Footer.
 */

export default function LandingPage() {
  return (
    <>
      <Section>
        <Hero />
      </Section>

      <Section className="border-t border-rule">
        <div className="w-full max-w-3xl">
          <LiveTerminal />
        </div>
      </Section>

      <Section className="border-t border-rule">
        <Curriculum />
      </Section>

      <Section className="border-t border-rule">
        <PatternGrid />
      </Section>

      <Section className="border-t border-rule">
        <GetStarted />
      </Section>

      <Section className="border-t border-rule">
        <MaintainersSection />
      </Section>

      <Footer />
    </>
  );
}
