/**
 * Emits public/llms.txt — a plain-text map of the site for language models.
 *
 * Imports lib/docs.ts so the route list has exactly one definition, the same
 * reason app/sitemap.ts and scripts/build-search-index.mjs do.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public", "llms.txt");
const ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ayeshakhalid192007-dev.github.io/graph-lab";

const { getAllDocs, getSidebarTree, getRoadmap } = await import(join(root, "lib", "docs.ts"));
const { getAllPatterns } = await import(join(root, "lib", "patterns.ts"));
const { getSource } = await import(join(root, "lib", "content.ts"));

const source = getSource();
const lines = [
  "# graph-lab",
  "",
  "> The Graph Engineering course rendered as a static site: 86 doc pages, a 17-step",
  "> roadmap, 23 patterns with runnable starter kits, quizzes, flashcards, eight",
  "> projects, and the Graph Ready certification. All content is vendored byte-for-byte",
  `> from ${source.repo} at commit ${source.commit.slice(0, 8)}.`,
  "",
];

for (const group of getSidebarTree()) {
  lines.push(`## ${group.label}`, "");
  for (const doc of group.docs) lines.push(`- [${doc.title}](${ORIGIN}${doc.route})`);
  lines.push("");
}

lines.push("## Interactive", "");
lines.push(`- [Tracks and the 17-step roadmap](${ORIGIN}/tracks/)`);
lines.push(`- [Pattern browser](${ORIGIN}/patterns/)`);
for (const p of getAllPatterns()) lines.push(`- [${p.slug}](${ORIGIN}/patterns/${p.slug}/)`);
for (const p of getRoadmap()) lines.push(`- [${p.title} quiz](${ORIGIN}/quiz/${p.part}/)`);
lines.push(`- [Projects](${ORIGIN}/projects/)`);
lines.push(`- [Resources and attribution](${ORIGIN}/resources/)`);
lines.push(`- [Graph Ready certification](${ORIGIN}/certification/)`);
lines.push("");

await mkdir(dirname(OUT), { recursive: true });
const text = lines.join("\n");
await writeFile(OUT, text);
console.log(
  `generate:llms OK — ${getAllDocs().length} docs across ${getSidebarTree().length} sections, ` +
    `${text.split("\n").length} lines, ${Buffer.byteLength(text)} bytes`,
);
