import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { FadeIn } from "@/components/animations/FadeIn";
import { Hero } from "@/components/landing/Hero";
import { LiveTerminal } from "@/components/landing/LiveTerminal";
import { Curriculum } from "@/components/landing/Curriculum";
import { PatternGrid } from "@/components/landing/PatternGrid";
import { GetStarted } from "@/components/landing/GetStarted";
import { Footer } from "@/components/landing/Footer";
import { CombinedGraphDiagram } from "@/components/landing/CombinedGraphDiagram";
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

      {/* ── Diagram 1: Combined Graph — Core Concept ── */}
      <AnimatedSection className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            eyebrow="Core Concept"
            title="Two graphs, one system"
            description="Graph Engineering separates what was attempted from what turned out to be true. Every agent reads the same verified facts — none of them replay each other's trial and error."
          />

          <FadeIn delay={0.15}>
            <div className="mt-10 glass-card p-6 sm:p-10">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
                {/* Diagram — left */}
                <div className="flex-[3] w-full min-w-0">
                  <CombinedGraphDiagram />
                </div>

                {/* Explanation — right */}
                <div className="flex-[2] w-full min-w-0 space-y-6 lg:pt-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent-primary/10 border border-accent-primary/20">
                        <span className="w-2 h-2 rounded-full bg-accent-primary" />
                      </span>
                      <h3 className="font-mono text-sm font-semibold text-ink">
                        Work History
                      </h3>
                    </div>
                    <p className="text-sm text-graphite leading-relaxed pl-11">
                      Every attempt an agent makes is recorded in the
                      work-history graph. Previous attempts are marked
                      superseded — agents never act on stale work.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-accent-success/10 border border-accent-success/20">
                        <span className="w-2 h-2 rounded-full bg-accent-success" />
                      </span>
                      <h3 className="font-mono text-sm font-semibold text-ink">
                        Verified Facts
                      </h3>
                    </div>
                    <p className="text-sm text-graphite leading-relaxed pl-11">
                      The fact graph holds only what has been verified true.
                      Every edge carries a receipt — agents can trust the data
                      without re-verifying it themselves.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-card-border">
                    <p className="text-xs text-muted font-mono leading-relaxed">
                      Work history records attempts. Facts record what is true.
                      Agents read facts; they do not replay history.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* ── Diagram 2: Lifecycle ── */}
      <AnimatedSection className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            eyebrow="How It Works"
            title="The lifecycle of a fact"
            description="A fact is not created all at once. It passes through three stages — each one adding confidence, context, and a verifiable trail. This is how raw input becomes structured, trustworthy knowledge."
          />

          <FadeIn delay={0.15}>
            <div className="mt-10 glass-card p-6 sm:p-10 overflow-hidden">
              <LifecycleDiagram />
            </div>
          </FadeIn>
        </div>
      </AnimatedSection>

      {/* ── Live Terminal Preview ── */}
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

      {/* ── Curriculum / Roadmap ── */}
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

      {/* ── Pattern Grid ── */}
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

      {/* ── Get Started ── */}
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
