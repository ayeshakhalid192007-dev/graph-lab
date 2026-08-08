import type { Metadata } from "next";
import { readContent } from "@/lib/content.ts";
import { getDoc } from "@/lib/docs.ts";
import { renderMarkdown } from "@/lib/markdown.ts";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = { title: "Resources" };

export default async function ResourcesPage() {
  const sourcesBody = readContent("resources/sources.md");
  const antiPatterns = getDoc(["operating", "anti-patterns"]);

  // Ten attributed sources, each a `## N. …` heading. The page claims the number
  // in its own subheading, so prove it rather than trusting the file.
  const sourceCount = (sourcesBody.match(/^##\s+\d+\.\s+/gm) ?? []).length;
  if (sourceCount !== 10) {
    throw new Error(`resources/sources.md yielded ${sourceCount} sources, expected 10`);
  }

  const [sources, anti] = await Promise.all([
    renderMarkdown(sourcesBody, "resources/sources.md"),
    renderMarkdown(antiPatterns.body, antiPatterns.repoPath),
  ]);

  return (
    <Section className="max-w-4xl">
      <h1 className="mono text-2xl text-ink">Resources</h1>
      <p className="mt-3 max-w-2xl text-graphite">
        Where the course&apos;s ideas came from, and the mistakes it keeps warning
        you about. Both are the course&apos;s own pages, rendered here rather than
        summarised.
      </p>

      <h2 className="mono mt-12 border-t border-rule pt-6 text-xl text-ink">
        Attribution — {sourceCount} sources
      </h2>
      <div className="prose-blueprint mt-6">{sources.content}</div>

      <h2 className="mono mt-16 border-t border-rule pt-6 text-xl text-ink">
        Anti-patterns
      </h2>
      <div className="prose-blueprint mt-6">{anti.content}</div>
    </Section>
  );
}
