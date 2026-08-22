import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/landing/Hero";
import { LiveTerminal } from "@/components/landing/LiveTerminal";
import { Curriculum } from "@/components/landing/Curriculum";
import { PatternGrid } from "@/components/landing/PatternGrid";
import { GetStarted } from "@/components/landing/GetStarted";
import { Footer } from "@/components/landing/Footer";
import { TwoGraphsDiagram } from "@/components/landing/TwoGraphsDiagram";
import { LifecycleDiagram } from "@/components/landing/LifecycleDiagram";

/**
 * Landing page for graph-lab.
 * Clean, minimal layout inspired by loop-lab with bright, vibrant colors.
 */

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="py-20 sm:py-28">
        <Hero />
      </Section>

      {/* Two Graphs Diagram - Core Concept */}
      <Section className="border-t border-rule py-16 sm:py-20 bg-gradient-to-b from-surface to-surface/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-bold uppercase tracking-wider mb-4">
              Core Concept
            </span>
            <h2 className="text-3xl font-bold text-ink mb-4">Work History vs. Facts</h2>
            <p className="text-graphite max-w-2xl mx-auto">
              Graph Engineering separates what was attempted from what turned out to be true,
              creating resilient systems that multiple agents can navigate safely.
            </p>
          </div>
          <div className="bg-surface rounded-2xl border border-rule p-6 shadow-sm">
            <TwoGraphsDiagram />
          </div>
        </div>
      </Section>

      {/* Lifecycle Diagram */}
      <Section className="border-t border-rule py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-accent-secondary/10 text-accent-secondary text-xs font-bold uppercase tracking-wider mb-4">
              How It Works
            </span>
            <h2 className="text-3xl font-bold text-ink mb-4">The Fact Lifecycle</h2>
            <p className="text-graphite max-w-2xl mx-auto">
              Facts move through three stages: extraction, resolution, and provenance.
              Each stage adds value while preserving the trail of what came before.
            </p>
          </div>
          <div className="bg-surface rounded-2xl border border-rule p-6 shadow-sm">
            <LifecycleDiagram />
          </div>
        </div>
      </Section>

      {/* Live Terminal Preview */}
      <Section className="border-t border-rule py-16 sm:py-20 bg-surface/50">
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
      <Section className="border-t border-rule py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <Curriculum />
        </div>
      </Section>

      {/* Pattern Grid */}
      <Section className="border-t border-rule py-16 sm:py-20 bg-surface/50">
        <div className="max-w-4xl mx-auto">
          <PatternGrid />
        </div>
      </Section>

      {/* Get Started */}
      <Section className="border-t border-rule py-16 sm:py-20">
        <div className="max-w-2xl mx-auto">
          <GetStarted />
        </div>
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
