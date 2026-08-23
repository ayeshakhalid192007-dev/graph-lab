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
            <Eyebrow className="mb-4">Getting Started</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-4">
              Ready to build?
            </h2>
            <p className="text-graphite max-w-2xl mx-auto">
              Start building resilient multi-agent systems with Graph Engineering in minutes. No setup required — just install the core package and explore starter kits designed for real-world scenarios.
            </p>
          </div>
          <LiveTerminal />
        </div>
      </Section>

      {/* Curriculum / Roadmap */}
      <Section className="border-t border-rule-strong py-16 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Eyebrow className="mb-4 inline-block">Learning Path</Eyebrow>
            <h2 className="text-3xl font-bold text-ink mb-2">Seventeen steps, seven parts</h2>
            <p className="text-graphite max-w-2xl">
              Master Graph Engineering through a carefully structured curriculum. Steps 1–13 build the foundation with queryable fact graphs and worker coordination. Steps 14–17 explore advanced patterns for scaling and optimization across distributed systems.
            </p>
          </div>
          <Curriculum />
        </div>
      </Section>

      {/* Pattern Grid - reduced prominence */}
      <Section className="border-t border-rule-strong py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Eyebrow className="mb-4 inline-block">Patterns & Solutions</Eyebrow>
            <h2 className="text-3xl font-bold text-ink mb-2">Core Patterns</h2>
            <p className="text-graphite max-w-2xl">
              Twenty-three battle-tested patterns covering extraction, resolution, provenance, governance, and storage. Each pattern addresses specific challenges in building reliable graph systems that scale across multiple agents.
            </p>
          </div>
          <PatternGrid />
        </div>
      </Section>

      {/* Get Started */}
      <Section className="border-t border-rule-strong py-16 sm:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <Eyebrow className="mb-4 inline-block">Quick Start</Eyebrow>
            <h2 className="text-3xl font-bold text-ink mb-2">Get Started</h2>
            <p className="text-graphite max-w-2xl">
              Follow four simple steps to begin your Graph Engineering journey. From initial setup to running your first starter kit, you'll have a working example in minutes.
            </p>
          </div>
          <GetStarted />
        </div>
      </Section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
