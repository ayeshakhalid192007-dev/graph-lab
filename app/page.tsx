import { Section } from "@/components/ui/Section";
import { Hero } from "@/components/landing/Hero";
import { Curriculum } from "@/components/landing/Curriculum";
import { PatternGrid } from "@/components/landing/PatternGrid";
import { GetStarted } from "@/components/landing/GetStarted";
import { Maintainers } from "@/components/landing/Maintainers";
import { Footer } from "@/components/landing/Footer";
import { TwoGraphsSplit } from "@/components/landing/TwoGraphsSplit";
import { LifecycleDiagram } from "@/components/landing/LifecycleDiagram";
import { SubgraphViewer } from "@/components/landing/SubgraphViewer";

/**
 * A small, legible example rather than a realistic one: eight nodes is enough to
 * show that a slice is smaller than the whole, and few enough to read at a glance.
 */
const EXAMPLE_GRAPH = {
  nodes: ["Ticket", "Service", "Owner", "Deploy", "Incident", "Runbook", "Metric", "Receipt"],
  edges: [
    ["Ticket", "Service"],
    ["Service", "Owner"],
    ["Service", "Deploy"],
    ["Deploy", "Incident"],
    ["Incident", "Runbook"],
    ["Service", "Metric"],
    ["Deploy", "Receipt"],
    ["Owner", "Runbook"],
  ] as [string, string][],
};

export default function LandingPage() {
  return (
    <>
      <Section>
        <Hero />
      </Section>

      <Section className="border-t border-rule">
        <h2 className="mono text-2xl text-ink">Two graphs, not one</h2>
        <p className="mt-3 max-w-2xl text-graphite">
          They answer different questions and they age differently. One is a log of
          what was tried; the other is the set of claims that survived checking.
        </p>
        <div className="mt-8">
          <TwoGraphsSplit />
        </div>
      </Section>

      <Section className="border-t border-rule">
        <Curriculum />
        <div className="mt-12 border-t border-rule pt-8">
          <p className="mono text-xs uppercase tracking-wider text-muted">
            What Part 3 covers
          </p>
          <div className="mt-4">
            <LifecycleDiagram />
          </div>
        </div>
      </Section>

      <Section className="border-t border-rule">
        <PatternGrid />
      </Section>

      <Section className="border-t border-rule">
        <h2 className="mono text-2xl text-ink">Give a worker a slice</h2>
        <p className="mt-3 max-w-2xl text-graphite">
          A worker that can see everything will use everything. Bounding the context
          to the nodes a task actually needs is what keeps its answers checkable.
        </p>
        <div className="mt-8">
          <SubgraphViewer
            fullGraph={EXAMPLE_GRAPH}
            subgraphNodeIds={["Ticket", "Service", "Deploy", "Receipt"]}
          />
        </div>
      </Section>

      <Section className="border-t border-rule">
        <GetStarted />
      </Section>

      <Section className="border-t border-rule">
        <Maintainers />
      </Section>

      <Footer />
    </>
  );
}
