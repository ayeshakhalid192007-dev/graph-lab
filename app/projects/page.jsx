import Link from "next/link";
import { getAllDocs, getDoc } from "@/lib/docs.js";
import { renderMarkdown } from "@/lib/markdown.js";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { Stagger, StaggerItem } from "@/components/animations/Stagger";

export const metadata = { title: "Projects" };

function plain(markdown) {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*|__|`/g, "")
    .trim();
}

function cardCopy(body) {
  const field = (name) =>
    plain(
      body.match(new RegExp(`^\\*\\*${name}:\\*\\*\\s*(.+)$`, "m"))?.[1] ?? ""
    );
  const scenario = body.split(/^##\s+The scenario\s*$/m)[1] ?? "";
  const firstParagraph =
    scenario
      .split("\n")
      .map((l) => l.trim())
      .find((l) => l && !l.startsWith(">") && !l.startsWith("#")) ?? "";
  return {
    difficulty: field("Difficulty"),
    time: field("Time"),
    excerpt: plain(firstParagraph),
  };
}

export default async function ProjectsPage() {
  const index = getDoc(["projects"]);
  const { content } = await renderMarkdown(index.body, index.repoPath);
  const projects = getAllDocs().filter(
    (d) => d.section === "projects" && d.slug.length === 2
  );

  if (projects.length !== 8) {
    throw new Error(
      `docs/projects yielded ${projects.length} projects, expected 8`
    );
  }

  return (
    <Section className="max-w-5xl">
      <SectionHeading
        eyebrow="Practice"
        title="Projects"
        align="left"
      />

      <Stagger className="mt-8 grid gap-4 md:grid-cols-2" staggerDelay={0.08}>
        {projects.map((p) => {
          const copy = cardCopy(getDoc(p.slug).body);
          return (
            <StaggerItem key={p.route}>
              <Link href={p.route} className="block h-full">
                <div className="glass-card h-full hover:border-accent-primary/30 transition-all duration-200">
                  <h2 className="mono text-base text-ink">{p.title}</h2>
                  <p className="mono mt-2 text-[11px] text-muted">
                    {copy.difficulty} · {copy.time}
                  </p>
                  <p className="mt-3 text-sm text-graphite">{copy.excerpt}</p>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>

      <FadeIn delay={0.3}>
        <div className="prose-blueprint mt-16 border-t border-rule-strong pt-8">
          {content}
        </div>
      </FadeIn>
    </Section>
  );
}
