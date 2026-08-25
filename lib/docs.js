import { listFiles, readContent, firstHeading } from "./content.js";
/**
 * Human labels for the top-level directories, in sidebar order. Directory names
 * are already numbered for sort order, so the order here is just the sorted set;
 * the labels exist because "02-foundations" is a path, not a heading.
 */
const SECTIONS = [
    ["", "Overview"],
    ["00-start-here", "Start here"],
    ["01-prerequisites", "Prerequisites"],
    ["02-foundations", "Foundations"],
    ["03-part-1-the-memory-problem", "Part 1 · The memory problem"],
    ["04-part-2-the-dag-of-work", "Part 2 · The DAG of work"],
    ["05-part-3-the-graph-of-facts", "Part 3 · The graph of facts"],
    ["06-part-4-working-from-the-graph", "Part 4 · Working from the graph"],
    ["07-part-5-the-graph-of-loops", "Part 5 · The graph of loops"],
    ["08-part-6-one-graph-end-to-end", "Part 6 · One graph end to end"],
    ["09-part-7-staying-grounded", "Part 7 · Staying grounded"],
    ["methods", "Methods"],
    ["operating", "Operating"],
    ["advanced", "Advanced"],
    ["projects", "Projects"],
    ["assessments", "Assessments"],
    ["appendix", "Appendix"],
];
let cache = null;
export function getAllDocs() {
    if (cache)
        return cache;
    cache = listFiles("docs", ".md").map((repoPath) => {
        const rel = repoPath.slice("docs/".length).replace(/\.md$/, "");
        const parts = rel.split("/");
        // A README is the index of its directory: docs/foo/README.md → /docs/foo/.
        const slug = parts[parts.length - 1] === "README" ? parts.slice(0, -1) : parts;
        const body = readContent(repoPath);
        const section = slug.length > 1 || parts[parts.length - 1] === "README" ? (slug[0] ?? "") : "";
        const partMatch = section.match(/^\d+-part-(\d+)-/);
        return {
            slug,
            route: `/docs/${slug.join("/")}${slug.length ? "/" : ""}`,
            title: firstHeading(body, slug[slug.length - 1] ?? "Overview"),
            repoPath,
            section,
            part: partMatch ? Number(partMatch[1]) : null,
        };
    });
    // Sidebar order = directory order = the numeric prefixes the course already uses.
    const rank = new Map(SECTIONS.map(([dir], i) => [dir, i]));
    cache.sort((a, b) => (rank.get(a.section) ?? 99) - (rank.get(b.section) ?? 99) ||
        a.repoPath.localeCompare(b.repoPath));
    return cache;
}
export function getDoc(slug) {
    const key = slug.join("/");
    const meta = getAllDocs().find((d) => d.slug.join("/") === key);
    if (!meta)
        throw new Error(`No doc for slug: /${key}`);
    return { ...meta, body: readContent(meta.repoPath) };
}
export function getSidebarTree() {
    const docs = getAllDocs();
    return SECTIONS
        .map(([dir, label]) => ({ section: dir, label, docs: docs.filter((d) => d.section === dir) }))
        .filter((group) => group.docs.length > 0);
}
/**
 * The seven Parts and their step pages, in order.
 *
 * A step file is `step-N-*.md`; README, quiz, flashcards, and labs/ are part of the
 * Part but are not steps, so the 17-step count the progress tracker reports stays
 * the roadmap's 17 and not "every file under a Part directory".
 */
export function getRoadmap() {
    return SECTIONS
        .filter(([dir]) => /^\d+-part-\d+-/.test(dir))
        .map(([dir, title]) => ({
        part: Number(dir.match(/^\d+-part-(\d+)-/)[1]),
        dir,
        title,
        steps: getAllDocs()
            .filter((d) => d.section === dir && /^step-\d+-/.test(d.slug[d.slug.length - 1] ?? ""))
            .sort((a, b) => a.repoPath.localeCompare(b.repoPath)),
    }));
}
/** Flat reading order across every doc, used for prev/next at the page footer. */
export function getPrevNext(slug) {
    const docs = getAllDocs();
    const i = docs.findIndex((d) => d.slug.join("/") === slug.join("/"));
    return {
        prev: i > 0 ? docs[i - 1] : null,
        next: i >= 0 && i < docs.length - 1 ? docs[i + 1] : null,
    };
}
