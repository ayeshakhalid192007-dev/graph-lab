import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
export const contentRoot = join(process.cwd(), "content");
export function readContent(relPath) {
    const full = join(contentRoot, relPath);
    if (!existsSync(full))
        throw new Error(`No content file at ${relPath}`);
    return readFileSync(full, "utf8");
}
/**
 * Every file under content/<tree>, recursively, as paths relative to content/.
 *
 * Dot-directories are listed, not skipped: each starter kit's Claude Code half
 * lives in `.claude/skills/…`. Skipping them here would hide 32 real kit files,
 * which is the same mistake scripts/sync-docs.mjs made — see R3.
 */
export function listFiles(tree, ext = "") {
    const root = join(contentRoot, tree);
    if (!existsSync(root))
        return [];
    const out = [];
    (function walk(dir) {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            const full = join(dir, entry.name);
            if (entry.isDirectory())
                walk(full);
            else if (!ext || entry.name.endsWith(ext))
                out.push(relative(contentRoot, full));
        }
    })(root);
    return out.sort();
}
export function getSource() {
    return JSON.parse(readContent("SOURCE.json"));
}
/** First `# ` heading, or the filename humanised if a file somehow has none. */
export function firstHeading(body, fallback) {
    const match = body.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : fallback;
}
