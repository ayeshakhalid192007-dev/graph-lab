import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

export const contentRoot = join(process.cwd(), "content");

export function readContent(relPath: string): string {
  const full = join(contentRoot, relPath);
  if (!existsSync(full)) throw new Error(`No content file at ${relPath}`);
  return readFileSync(full, "utf8");
}

/** Every file under content/<tree>, recursively, as paths relative to content/. */
export function listFiles(tree: string, ext = ""): string[] {
  const root = join(contentRoot, tree);
  if (!existsSync(root)) return [];
  const out: string[] = [];
  (function walk(dir: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (!ext || entry.name.endsWith(ext)) out.push(relative(contentRoot, full));
    }
  })(root);
  return out.sort();
}

export type Source = { repo: string; commit: string; syncedAt: string; files: number };

export function getSource(): Source {
  return JSON.parse(readContent("SOURCE.json")) as Source;
}

/** First `# ` heading, or the filename humanised if a file somehow has none. */
export function firstHeading(body: string, fallback: string): string {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}
