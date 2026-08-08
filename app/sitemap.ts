import type { MetadataRoute } from "next";
import { getAllDocs, getRoadmap } from "@/lib/docs.ts";
import { getAllPatterns } from "@/lib/patterns.ts";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { contentRoot } from "@/lib/content.ts";

const ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ayeshakhalid192007-dev.github.io/graph-lab";

/**
 * Required by `output: "export"`. Without it the build fails outright with
 * `export const dynamic = "force-static" … not configured on route "/sitemap.xml"`
 * — a sitemap is a route handler, and a static export has to be told it never
 * needs to run at request time.
 */
export const dynamic = "force-static";

/**
 * Every emitted route, enumerated from the same loaders the pages use.
 *
 * Hand-listing them would be a second route table that drifts the first time the
 * course repo gains a page — the same reason lib/docs.ts owns the doc routes and
 * check-links.mjs verifies against the real export.
 *
 * The origin already carries the basePath, so routes are appended raw rather than
 * through withBasePath(): doing both would emit /graph-lab/graph-lab/….
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const roadmap = getRoadmap();
  const routes = [
    "/",
    "/docs/",
    ...getAllDocs().filter((d) => d.slug.length > 0).map((d) => d.route),
    "/tracks/",
    "/patterns/",
    ...getAllPatterns().map((p) => `/patterns/${p.slug}/`),
    ...roadmap.map((p) => `/quiz/${p.part}/`),
    ...roadmap
      .filter((p) => existsSync(join(contentRoot, "docs", p.dir, "flashcards.md")))
      .map((p) => `/flashcards/${p.part}/`),
    "/projects/",
    "/resources/",
    "/certification/",
  ];

  const lastModified = new Date();
  return routes.map((route) => ({ url: `${ORIGIN}${route}`, lastModified }));
}
