import { readContent } from "@/lib/content.js";
import { getDoc } from "@/lib/docs.js";
import { renderMarkdown } from "@/lib/markdown.js";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata = { title: "Resources" };

export default async function ResourcesPage() {
  const sourcesBody = readContent("resources/sources.md");
  const antiPatterns = getDoc(["operating", "anti-patterns"]);

  const sourceCount = (sourcesBody.match(/^##\s+\d+\.\s+/gm) ?? []).length;
  if (sourceCount !== 10) {
    throw new Error(
      `resources/sources.md yielded ${sourceCount} sources, expected 10`
    );
  }

  const [sources, anti] = await Promise.all([
    renderMarkdown(sourcesBody, "resources/sources.md"),
    renderMarkdown(antiPatterns.body, antiPatterns.repoPath),
  ]);

  return (
    <Section className="max-w-4xl">
      <SectionHeading
        eyebrow="References"
        title="Resources"
        description="Where the course's ideas came from, and the mistakes it keeps warning you about. Both are the course's own pages, rendered here rather than summarised."
        align="left"
      />

      <FadeIn delay={0.1}>
        <h2 className="mono mt-12 border-t border-rule-strong pt-6 text-xl text-ink">
          Attribution — {sourceCount} sources
        </h2>
        <div className="prose-blueprint mt-6">{sources.content}</div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <h2 className="mono mt-16 border-t border-rule-strong pt-6 text-xl text-ink">
          Anti-patterns
        </h2>
        <div className="prose-blueprint mt-6">{anti.content}</div>
      </FadeIn>
    </Section>
  );
}
