import type { Metadata } from "next";
import Link from "next/link";
import { getAllDocs, getDoc } from "@/lib/docs.ts";
import { renderMarkdown } from "@/lib/markdown.ts";
import { Section } from "@/components/ui/Section";
import { Panel } from "@/components/ui/Panel";

export const metadata: Metadata = { title: "Projects" };

function plain(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*|__|`/g, "")
    .trim();
}

/**
 * Card copy, read out of the project page rather than written here.
 *
 * Every project opens with a `**Difficulty:** … **Time:** …` block and then a
 * `## The scenario` section. The block is the two badges; the scenario's opening
 * sentence is the excerpt — that is the line that actually distinguishes one
 * project from another, where the shared "throwaway repo" banner above it does not.
 */
function cardCopy(body: string): { difficulty: string; time: string; excerpt: string } {
  const field = (name: string) =>
    plain(body.match(new RegExp(`^\\*\\*${name}:\\*\\*\\s*(.+)$`, "m"))?.[1] ?? "");

  const scenario = body.split(/^##\s+The scenario\s*$/m)[1] ?? "";
  const firstParagraph =
    scenario
      .split("\n")
      .map((l) => l.trim())
      .find((l) => l && !l.startsWith(">") && !l.startsWith("#")) ?? "";

  return { difficulty: field("Difficulty"), time: field("Time"), excerpt: plain(firstParagraph) };
}

export default async function ProjectsPage() {
  const index = getDoc(["projects"]);
  const { content } = await renderMarkdown(index.body, index.repoPath);

  // section === "projects" also catches the eight reference solutions nested under
  // projects/solutions/, and the section README itself. A project is exactly a
  // two-segment slug that is not the index.
  const projects = getAllDocs().filter(
    (d) => d.section === "projects" && d.slug.length === 2,
  );
  if (projects.length !== 8) {
    throw new Error(`docs/projects yielded ${projects.length} projects, expected 8`);
  }

  return (
    <Section className="max-w-5xl">
      <h1 className="mono text-2xl text-ink">Projects</h1>

      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {projects.map((p) => {
          const copy = cardCopy(getDoc(p.slug).body);
          return (
            <li key={p.route}>
              <Panel className="h-full">
                <h2 className="mono text-base">
                  <Link href={p.route} className="text-ink hover:text-accent">
                    {p.title}
                  </Link>
                </h2>
                <p className="mono mt-2 text-[11px] text-muted">
                  {copy.difficulty} · {copy.time}
                </p>
                <p className="mt-3 text-sm text-graphite">{copy.excerpt}</p>
              </Panel>
            </li>
          );
        })}
      </ul>

      <div className="prose-blueprint mt-16 border-t border-rule pt-8">{content}</div>
    </Section>
  );
}
