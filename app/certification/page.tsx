import type { Metadata } from "next";
import { getDoc } from "@/lib/docs.ts";
import { renderMarkdown } from "@/lib/markdown.ts";
import { Section } from "@/components/ui/Section";
import { GraphReadyChecklist } from "@/components/interactive/GraphReadyChecklist";

export const metadata: Metadata = { title: "Graph Ready certification" };

/**
 * The seven Graph Ready criteria, read from the doc that defines them.
 *
 * Hardcoding these would create a second copy that can drift from the course
 * page — exactly the failure this whole site is built to avoid. The count check
 * is not defensive noise: the certificate asserts all seven were met, so a
 * six-item checklist would make the site issue a false claim.
 */
function getCriteria(body: string): string[] {
  const table = body.split("## The checklist")[1]?.split("\n## ")[0] ?? "";
  const items = table
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\|\s*\d+\s*\|/.test(line))
    .map((line) => line.split("|")[2]?.trim() ?? "");
  if (items.length !== 7 || items.some((i) => !i)) {
    throw new Error(`graph-ready-certification.md yielded ${items.length} criteria, expected 7`);
  }
  return items;
}

export default async function CertificationPage() {
  const doc = getDoc(["assessments", "graph-ready-certification"]);
  const criteria = getCriteria(doc.body);
  const { content } = await renderMarkdown(doc.body, doc.repoPath);

  return (
    <Section className="max-w-4xl">
      <h1 className="mono text-2xl text-ink">Graph Ready</h1>
      <p className="mt-3 max-w-2xl text-graphite">
        Seven criteria, self-assessed against one real system. Tick them off as you
        can point at the thing that implements each one; all seven produces a
        certificate you can download.
      </p>

      <h2 className="mono mt-12 border-t border-rule pt-6 text-xl text-ink">
        The checklist
      </h2>
      <div className="mt-6 max-w-2xl">
        <GraphReadyChecklist criteria={criteria} />
      </div>

      <h2 className="mono mt-16 border-t border-rule pt-6 text-xl text-ink">
        What each criterion means
      </h2>
      <div className="prose-blueprint mt-6">{content}</div>
    </Section>
  );
}
