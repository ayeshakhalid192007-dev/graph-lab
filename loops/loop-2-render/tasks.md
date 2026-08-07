# Loop 2 tasks

Tasks 5–9. Full detail is in `plan/2026-08-07-graph-lab-implementation-plan.md` under each task's heading.

**Tick a box only after its command was run and its output read.** Red means not done.

---

## Task 5 — `lib/content.ts` and `lib/docs.ts`

*Plan: `## Task 5` · 4 steps*

**Consumes:** `content/` (Task 2).

**Produces:** the module set every page in Loops 2–4 imports by name — frontmatter reads, the slug map, the 17-step roadmap, the sidebar tree, prev/next. **Record the real shipped signatures in `state.md`.**

- [x] 5.1 Write `lib/content.ts` — reads `content/`, parses frontmatter, reads `SOURCE.json`
- [x] 5.2 Write `lib/docs.ts` — slug map, roadmap, sidebar tree, prev/next
- [x] 5.3 **Verify the counts the spec promises** — 86 doc pages, 17 roadmap steps
- [x] 5.4 Typecheck and commit

**Task done when:** the counts match and `tsc --noEmit` is clean.

---

## Task 6 — `lib/links.ts`, relative markdown links to site routes

*Plan: `## Task 6` · 3 steps*

**Produces:** the resolver that turns `../02-foundations/glossary.md#node` into `/docs/02-foundations/glossary/#node`. Resolves relative links **the way GitHub does**, then maps the repo path to its site route.

- [ ] 6.1 Write `lib/links.ts`
- [ ] 6.2 Sanity-check the resolver against real links drawn from the content
- [ ] 6.3 Typecheck and commit

**Task done when:** real links from `content/docs/` resolve correctly, and a link to no known page produces a failure rather than a dead route.

---

## Task 7 — `lib/markdown.ts`, `CodeBlock`, `GraphDiagram`

*Plan: `## Task 7` · 5 steps*

**Consumes:** `lib/links.ts` (Task 6).

**Produces:** the remark/rehype pipeline that turns plain course markdown into React elements. **No MDX** — constraint C3.

| Convention | Handling |
| --- | --- |
| ` ```mermaid ` fence (20, across 20 files) | `GraphDiagram` — client-side render to SVG |
| Any other fence (41 markdown + 23 json/yaml/text/jsonl) | Shiki at build time, dual-themed, zero client JS |
| Relative `.md` links | Rewritten by `lib/links.ts` |
| `##` / `###` headings | Slugged anchors, collected into the page TOC |

- [ ] 7.1 Write `components/content/GraphDiagram.tsx` — explicit dark theme so diagrams stay legible; keeps source text as no-JS fallback
- [ ] 7.2 Write `components/content/CodeBlock.tsx`
- [ ] 7.3 Write `lib/markdown.ts`
- [ ] 7.4 **Verify the pipeline against the hardest real page** in the content
- [ ] 7.5 Typecheck and commit

**Do not build** `CodeTabs`, `Callout`, or `CheckYourself` — constraint C4. Their degraded fallbacks are correct output.

---

## Task 8 — The doc route and its chrome

*Plan: `## Task 8` · 7 steps*

**Consumes:** Tasks 5, 6, 7.

**Produces:** all 86 doc pages at `/docs/[...slug]/`, plus a `/docs/` index.

- [ ] 8.1 Write `components/docs/DocSidebar.tsx`
- [ ] 8.2 Write `components/docs/DocToc.tsx`
- [ ] 8.3 Write `DocBreadcrumbs.tsx` and `DocFooterNav.tsx`
- [ ] 8.4 Write `app/docs/[...slug]/page.tsx`
- [ ] 8.5 Write `app/docs/page.tsx` for the `/docs/` index
- [ ] 8.6 **Build and count the emitted pages** — expect 86 doc routes
- [ ] 8.7 Commit

**Task done when:** the build emits 86 doc pages, each reachable from the sidebar, with working prev/next.

---

## Task 9 — `scripts/check-links.mjs`

*Plan: `## Task 9` · 4 steps*

**Produces:** the link check that runs against the emitted `out/`, wired into `verify:2` and every later gate.

- [ ] 9.1 Write `scripts/check-links.mjs`
- [ ] 9.2 **Run the Loop 2 gate** — `npm run verify:2`
- [ ] 9.3 **Spot-check three pages by eye** — not just green output
- [ ] 9.4 Commit and record loop state

**Task done when:** `verify:2` is green and three real pages have been looked at.

---

## Gate

- [ ] `npm run verify:2` green
- [ ] All Task 5–9 boxes above ticked
- [ ] Five entries in `state.md`, one per task, with the shipped interface signatures
- [ ] Gate entry appended to `shared/state.md`, row set to `gate green, awaiting review`
- [ ] **Stopped.** Loop 3 not started.

See `gate.md`.
