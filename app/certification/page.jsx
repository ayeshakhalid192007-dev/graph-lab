import { getDoc } from "@/lib/docs.js";
import { renderMarkdown } from "@/lib/markdown.js";
import { Section } from "@/components/ui/Section";
import { GraphReadyChecklist } from "@/components/interactive/GraphReadyChecklist";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata = { title: "Graph Ready certification" };

function getCriteria(body) {
  const table =
    body.split("## The checklist")[1]?.split("\n## ")[0] ?? "";
  const items = table
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\|\s*\d+\s*\|/.test(line))
    .map((line) => line.split("|")[2]?.trim() ?? "");

  if (items.length !== 7 || items.some((i) => !i)) {
    throw new Error(
      `graph-ready-certification.md yielded ${items.length} criteria, expected 7`
    );
  }
  return items;
}

export default async function CertificationPage() {
  const doc = getDoc(["assessments", "graph-ready-certification"]);
  const criteria = getCriteria(doc.body);
  const { content } = await renderMarkdown(doc.body, doc.repoPath);

  return (
    <Section className="max-w-4xl">
      <SectionHeading
        eyebrow="Certification"
        title="Graph Ready"
        description="Seven criteria, self-assessed against one real system. Tick them off as you can point at the thing that implements each one; all seven produces a certificate you can download."
        align="left"
      />

      <FadeIn delay={0.1}>
        <h2 className="mono mt-12 border-t border-rule-strong pt-6 text-xl text-ink">
          The checklist
        </h2>
        <div className="mt-6 max-w-2xl">
          <GraphReadyChecklist criteria={criteria} />
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h2 className="mono mt-16 border-t border-rule-strong pt-6 text-xl text-ink">
          What each criterion means
        </h2>
        <div className="prose-blueprint mt-6">{content}</div>
      </FadeIn>
    </Section>
  );
}
