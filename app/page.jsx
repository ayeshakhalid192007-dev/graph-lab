import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { FadeIn } from "@/components/animations/FadeIn";
import { Hero } from "@/components/landing/Hero";
import { LiveTerminal } from "@/components/landing/LiveTerminal";
import { Curriculum } from "@/components/landing/Curriculum";
import { PatternGrid } from "@/components/landing/PatternGrid";
import { GetStarted } from "@/components/landing/GetStarted";
import { Footer } from "@/components/landing/Footer";
import { TwoGraphsDiagram } from "@/components/landing/TwoGraphsDiagram";
import { LifecycleDiagram } from "@/components/landing/LifecycleDiagram";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllDocs } from "@/lib/docs.js";
import { getAllPatterns, getStarterSlugs } from "@/lib/patterns.js";

export default function LandingPage() {
  const docsCount = getAllDocs().length;
  const patternsCount = getAllPatterns().length;
  const starterCount = getStarterSlugs().length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        docsCount={docsCount}
        patternsCount={patternsCount}
        starterCount={starterCount}
      />

      {/* Two Graphs Diagram - Core Concept */}
      <AnimatedSection className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="Core Concept"
            title="Work History vs. Facts"
            description="Graph Engineering separates what was attempted from what turned out to be true, creating resilient systems that multiple agents can navigate safely."
          />
          <FadeIn delay={0.2}>
            <div className="glass-card p-6 sm:p-8">
              <TwoGraphsDiagram />
            </div>
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* Lifecycle Diagram */}
      <AnimatedSection className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="How It Works"
            title="The Fact Lifecycle"
            description="Facts move through three stages: extraction, resolution, and provenance. Each stage adds value while preserving the trail of what came before."
          />
          <FadeIn delay={0.2}>
            <div className="glass-card p-6 sm:p-8">
              <LifecycleDiagram />
            </div>
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* Live Terminal Preview */}
      <AnimatedSection className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            eyebrow="Getting Started"
            title="Ready to build?"
            description="Start building resilient multi-agent systems with Graph Engineering in minutes. No setup required — just install the core package and explore starter kits designed for real-world scenarios."
          />
          <FadeIn delay={0.2}>
            <LiveTerminal />
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* Curriculum / Roadmap */}
      <AnimatedSection className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            eyebrow="Learning Path"
            title="Seventeen steps, seven parts"
            description="Master Graph Engineering through a carefully structured curriculum. Steps 1–13 build the foundation with queryable fact graphs and worker coordination. Steps 14–17 explore advanced patterns for scaling and optimization across distributed systems."
          />
          <FadeIn delay={0.2}>
            <Curriculum />
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* Pattern Grid */}
      <AnimatedSection className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            eyebrow="Patterns & Solutions"
            title="Core Patterns"
            description="Twenty-three battle-tested patterns covering extraction, resolution, provenance, governance, and storage. Each pattern addresses specific challenges in building reliable graph systems that scale across multiple agents."
          />
          <FadeIn delay={0.2}>
            <PatternGrid />
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* Get Started */}
      <AnimatedSection className="py-16 sm:py-24">
        <div className="max-w-2xl mx-auto px-6">
          <SectionHeading
            eyebrow="Quick Start"
            title="Get Started"
            description="Follow four simple steps to begin your Graph Engineering journey. From initial setup to running your first starter kit, you'll have a working example in minutes."
          />
          <FadeIn delay={0.2}>
            <GetStarted />
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <Footer />
    </div>
  );
}
