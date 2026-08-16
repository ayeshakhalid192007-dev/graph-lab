import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/landing/Hero";
import { Curriculum } from "@/components/landing/Curriculum";
import { PatternGrid } from "@/components/landing/PatternGrid";
import { GetStarted } from "@/components/landing/GetStarted";
import { Footer } from "@/components/landing/Footer";

/**
 * Landing page for graph-lab. Clean, focused layout with essential sections:
 * Hero, Curriculum, Patterns, Getting Started, and Footer.
 */

export default function LandingPage() {
  return (
    <>
      <Section>
        <Hero />
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

      <Footer />
    </>
  );
}
