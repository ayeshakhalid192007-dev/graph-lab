import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/landing/Hero";
import { LiveTerminal } from "@/components/landing/LiveTerminal";
import { Curriculum } from "@/components/landing/Curriculum";
import { PatternGrid } from "@/components/landing/PatternGrid";
import { GetStarted } from "@/components/landing/GetStarted";
import { Footer } from "@/components/landing/Footer";
import { TwoGraphsDiagram } from "@/components/landing/TwoGraphsDiagram";
import { LifecycleDiagram } from "@/components/landing/LifecycleDiagram";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Landing page for graph-lab.
 * Dark theme with bold black + yellow accent design.
 */

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="py-20 sm:py-28">
        <Hero />
      </Section>

      {/* Two Graphs Diagram - Core Concept */}
      <Section className="border-t border-rule-strong py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow className="mb-4">Core Concept</Eyebrow>
            <h2 className="text-3xl font-bold text-ink mb-4">Work History vs. Facts</h2>
            <p className="text-graphite max-w-2xl mx-auto">
              Graph Engineering separates what was attempted from what turned out to be true,
              creating resilient systems that multiple agents can navigate safely.
            </p>
          </div>
          <div className="bg-surface rounded-lg border border-card-border p-6">
            <TwoGraphsDiagram />
          </div>
        </div>
      </Section>

      {/* Lifecycle Diagram */}
      <Section className="border-t border-rule-strong py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow className="mb-4">How It Works</Eyebrow>
            <h2 className="text-3xl font-bold text-ink mb-4">The Fact Lifecycle</h2>
            <p className="text-graphite max-w-2xl mx-auto">
              Facts move through three stages: extraction, resolution, and provenance.
              Each stage adds value while preserving the trail of what came before.
            </p>
          </div>
          <div className="bg-surface rounded-lg border border-card-border p-6">
            <LifecycleDiagram />
          </div>
        </div>
      </Section>

      {/* Live Terminal Preview */}
      <Section className="border-t border-rule-strong py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-4">
              Ready to build?
            </h2>
            <p className="text-graphite max-w-2xl mx-auto">
              Start learning graph engineering in minutes with no setup required.
            </p>
          </div>
          <LiveTerminal />
        </div>
      </Section>

      {/* Curriculum / Roadmap */}
      <Section className="border-t border-rule-strong py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <Curriculum />
        </div>
      </Section>

      {/* Pattern Grid - reduced prominence */}
      <Section className="border-t border-rule-strong py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <PatternGrid />
        </div>
      </Section>

      {/* Get Started */}
      <Section className="border-t border-rule-strong py-16 sm:py-20">
        <div className="max-w-2xl mx-auto">
          <GetStarted />
        </div>
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
