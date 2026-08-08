import matter from "gray-matter";
import { readContent, listFiles, firstHeading } from "./content.ts";

export type PatternMeta = {
  slug: string;
  category: string; // "A-extraction", "B-resolution", …
  stage: string; // "write" | "read" | "governance" | "storage"
  cost: string; // "low" | "medium" | "high"
  core: boolean; // core kit vs extended
  tools: string[]; // "Claude Code", "OpenCode" — from the spec's own frontmatter
  title: string; // first # heading of the spec
};

/**
 * Parses patterns/registry.yaml.
 *
 * NOT a general YAML implementation — it handles exactly the shape the registry
 * uses: a `patterns:` key holding a list of flat maps with unquoted scalar values.
 * This mirrors the course repo's scripts/validate-registry.mjs deliberately, so
 * the site and the course's own validator agree about what the registry says
 * rather than diverging through two implementations. If the registry ever grows a
 * nested value, both parsers get replaced, not extended.
 */
function parseFlatYamlList(text: string): Record<string, string | boolean>[] {
  const items: Record<string, string | boolean>[] = [];
  let current: Record<string, string | boolean> | null = null;
  for (const line of text.split("\n")) {
    if (/^\s*-\s+name:/.test(line)) {
      if (current) items.push(current);
      current = {};
    }
    const m = line.match(/^\s*-?\s*(\w+):\s*(.+?)\s*$/);
    if (m && current) {
      const [, key, raw] = m;
      current[key] = raw === "true" ? true : raw === "false" ? false : raw;
    }
  }
  if (current) items.push(current);
  return items;
}

/**
 * A pattern spec's own frontmatter, which the registry does not carry.
 *
 * The registry is the list — it says which 23 patterns exist and how they are
 * categorised. `tools:` lives only in the spec file, so the spec's "filter across
 * category, stage, and tool" needs both sources. Splitting body from data here
 * also keeps the frontmatter block out of the rendered page.
 */
function readSpec(slug: string): { body: string; tools: string[]; title: string } {
  const parsed = matter(readContent(`patterns/${slug}.md`));
  const raw = (parsed.data as { tools?: unknown }).tools;
  return {
    body: parsed.content,
    tools: Array.isArray(raw) ? raw.map(String) : [],
    title: firstHeading(parsed.content, slug),
  };
}

let cache: PatternMeta[] | null = null;

export function getAllPatterns(): PatternMeta[] {
  if (cache) return cache;
  const entries = parseFlatYamlList(readContent("patterns/registry.yaml"));
  cache = entries.map((entry) => {
    const slug = String(entry.name);
    const spec = readSpec(slug);
    return {
      slug,
      category: String(entry.category ?? ""),
      stage: String(entry.stage ?? ""),
      cost: String(entry.cost ?? ""),
      core: entry.core === true,
      tools: spec.tools,
      title: spec.title,
    };
  });
  // README.md and pattern-template.md are not registry entries, so they never
  // appear here. A count other than 23 means the registry changed — fail loudly
  // rather than quietly shipping a browser that is missing a pattern.
  if (cache.length !== 23) {
    throw new Error(`registry.yaml parsed to ${cache.length} patterns, expected 23`);
  }
  return cache;
}

/**
 * Every starter kit directory under content/starters, `_template` included.
 *
 * listFiles returns files, so a directory is anything a file sits inside;
 * `starters/README.md` has no second segment and is correctly not a kit.
 */
export function getStarterSlugs(): string[] {
  const slugs = new Set<string>();
  for (const path of listFiles("starters")) {
    const parts = path.split("/"); // "starters/<slug>/<rest…>"
    if (parts.length > 2 && parts[1]) slugs.add(parts[1]);
  }
  return [...slugs].sort();
}

export function getPatternBySlug(slug: string) {
  const meta = getAllPatterns().find((p) => p.slug === slug);
  if (!meta) throw new Error(`No pattern named ${slug}`);
  const starters = new Set(getStarterSlugs());
  return {
    ...meta,
    body: readSpec(slug).body,
    repoPath: `patterns/${slug}.md`,
    starterSlug: starters.has(slug) ? slug : null,
  };
}

/** The distinct filter values the browser offers, derived rather than hardcoded. */
export function getPatternFacets() {
  const patterns = getAllPatterns();
  const uniq = (xs: string[]) => [...new Set(xs)].sort();
  return {
    categories: uniq(patterns.map((p) => p.category)),
    stages: uniq(patterns.map((p) => p.stage)),
    tools: uniq(patterns.flatMap((p) => p.tools)),
  };
}

export type PatternFacets = ReturnType<typeof getPatternFacets>;
