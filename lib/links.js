import { posix } from "node:path";
import { getAllDocs } from "./docs.js";
import { getSource, listFiles } from "./content.js";
/**
 * The pattern and starter slugs that actually exist in content/, so a link to a
 * pattern that was renamed in the course repo fails the link check instead of
 * resolving to a confident-looking /patterns/<slug>/ that nothing serves.
 */
let slugCache = null;
function knownSlugs() {
    if (!slugCache) {
        slugCache = {
            patterns: new Set(listFiles("patterns", ".md")
                .map((p) => p.slice("patterns/".length, -".md".length))
                .filter((slug) => slug !== "README" && slug !== "pattern-template")),
            starters: new Set(listFiles("starters").map((p) => p.split("/")[1]).filter(Boolean)),
        };
    }
    return slugCache;
}
/**
 * The course repo, at the exact commit content/ was synced from.
 *
 * Some course material is not markdown and therefore owns no site route — the 17
 * lab scripts under docs/<part>/labs/ are .py and .sh. A link to one of those is
 * valid on GitHub and has nowhere to go here, so it is sent to GitHub at the
 * pinned commit rather than dropped. Pinned, not `main`: the link then always
 * points at the same bytes the surrounding page was rendered from.
 */
function githubUrl(repoPath, isDirectory) {
    const { repo, commit } = getSource();
    return `https://github.com/${repo}/${isDirectory ? "tree" : "blob"}/${commit}/${repoPath}`;
}
/**
 * Rewrites a link found inside course markdown to a site route.
 *
 * The course files link each other the way GitHub renders them — relative paths
 * with a .md extension, e.g. ../02-foundations/glossary.md#node. Those resolve
 * correctly on GitHub and 404 on the site, so they are resolved here exactly the
 * way GitHub resolves them (relative to the *directory* of the linking file) and
 * then mapped through the known route table.
 *
 * Returns null for a link that resolves to no known page. That is deliberate:
 * check-links.mjs turns it into a red build, which is the only thing that keeps a
 * folder rename in the course repo from silently producing 404s.
 */
export function resolveContentLink(href, fromRepoPath) {
    if (!href)
        return null;
    if (/^(https?:|mailto:|tel:)/i.test(href))
        return { href, external: true };
    if (href.startsWith("#"))
        return { href, external: false }; // same-page anchor
    if (href.startsWith("/"))
        return { href, external: false }; // already a site route
    const [path, hash] = href.split("#");
    if (!path)
        return { href, external: false };
    const resolved = posix.normalize(posix.join(posix.dirname(fromRepoPath), path));
    // A .md link maps to whatever route that file owns. Only docs/ files own a doc
    // route, so a .md outside that tree falls through to the rules below rather than
    // returning null here — patterns/, starters/ and resources/ are markdown too, and
    // each owns a route of its own.
    if (resolved.endsWith(".md")) {
        const doc = getAllDocs().find((d) => d.repoPath === resolved);
        if (doc)
            return { href: doc.route + (hash ? `#${hash}` : ""), external: false };
    }
    // A directory link maps to that directory's README route.
    const asReadme = posix.join(resolved, "README.md");
    const dirDoc = getAllDocs().find((d) => d.repoPath === asReadme);
    if (dirDoc)
        return { href: dirDoc.route + (hash ? `#${hash}` : ""), external: false };
    // Links into patterns/ and starters/ point at their own site routes.
    const pattern = resolved.match(/^patterns\/([a-z0-9-]+)\.md$/);
    if (pattern && knownSlugs().patterns.has(pattern[1])) {
        return { href: `/patterns/${pattern[1]}/`, external: false };
    }
    const starter = resolved.match(/^starters\/([a-z0-9-]+)(\/.*)?$/);
    if (starter && knownSlugs().starters.has(starter[1])) {
        return { href: `/patterns/${starter[1]}/`, external: false };
    }
    // The index of a runnable tree. patterns/README.md and starters/README.md are
    // both "here is the catalogue" pages, and the catalogue on this site is the
    // pattern browser — there is no /starters/ route in the spec's route table,
    // because a kit is shown under the pattern it implements.
    if (/^patterns(\/README\.md)?\/?$/.test(resolved))
        return { href: "/patterns/", external: false };
    if (/^starters(\/README\.md)?\/?$/.test(resolved))
        return { href: "/patterns/", external: false };
    // resources/ is two files, both of which the /resources/ page renders.
    if (/^resources\/(README|sources)\.md$/.test(resolved) || /^resources\/?$/.test(resolved)) {
        return { href: `/resources/${hash ? `#${hash}` : ""}`, external: false };
    }
    // Course material that is not markdown owns no route — the lab scripts are .py
    // and .sh. Send the reader to GitHub at the pinned commit rather than returning
    // null, which would (correctly) fail the link check over a link that is not
    // actually broken. A trailing slash in the source marks a directory.
    // .md is excluded on purpose: content/ holds no markdown under labs/, so a .md
    // that reached here is a broken link into the docs tree and must stay null.
    if (!resolved.endsWith(".md") && /^docs\/[^/]+\/labs\/?/.test(resolved)) {
        return { href: githubUrl(resolved, !posix.extname(resolved)), external: true };
    }
    return null;
}
