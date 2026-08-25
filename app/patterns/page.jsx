import { getAllPatterns, getPatternFacets } from "@/lib/patterns.js";
import { Section } from "@/components/ui/Section";
import { PatternBrowser } from "@/components/interactive/PatternBrowser";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = { title: "Patterns" };

export default function PatternsPage() {
  const patterns = getAllPatterns();
  const facets = getPatternFacets();

  return (
    <Section className="max-w-6xl">
      <SectionHeading
        eyebrow="Pattern Library"
        title="Patterns"
        description="Twenty-three specs for problems that keep recurring once a graph is real. Narrow by where a pattern sits in the pipeline, which stage of the loop it runs in, or which harness its starter kit is written for."
        align="left"
      />
      <div className="mt-8">
        <PatternBrowser patterns={patterns} facets={facets} />
      </div>
    </Section>
  );
}
