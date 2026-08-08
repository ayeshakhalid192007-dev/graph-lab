import type { Metadata } from "next";
import { getAllPatterns, getPatternFacets } from "@/lib/patterns.ts";
import { Section } from "@/components/ui/Section";
import { PatternBrowser } from "@/components/interactive/PatternBrowser";

export const metadata: Metadata = { title: "Patterns" };

export default function PatternsPage() {
  const patterns = getAllPatterns();
  const facets = getPatternFacets();

  return (
    <Section className="max-w-6xl">
      <h1 className="mono text-2xl text-ink">Patterns</h1>
      <p className="mt-3 max-w-2xl text-graphite">
        Twenty-three specs for problems that keep recurring once a graph is real.
        Narrow by where a pattern sits in the pipeline, which stage of the loop it
        runs in, or which harness its starter kit is written for.
      </p>

      <div className="mt-8">
        <PatternBrowser patterns={patterns} facets={facets} />
      </div>
    </Section>
  );
}
