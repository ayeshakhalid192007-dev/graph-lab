# Loop 4 tasks

Tasks 15–18. Full detail is in `plan/2026-08-07-graph-lab-implementation-plan.md` under each task's heading.

**Tick a box only after its command was run and its output read.** Red means not done.

---

## Task 15 — Search: index, query, dialog

*Plan: `## Task 15` · 5 steps*

**Produces:** `public/search-index.json` (generated), `lib/search.ts`, and the `SearchDialog` that fills the slot Loop 1 left empty in `NavBar`.

One record per page: route, title, breadcrumb section, heading list, body excerpt truncated to ~300 characters, plus a compact inverted index over title and heading tokens.

- [ ] 15.1 Write `scripts/build-search-index.mjs` — runs before `next build`
- [ ] 15.1a **Wire it into `prebuild`** — extend the key to `"prebuild": "npm run build:starters && npm run build:search"`. Loop 1 removed it, Loop 3 Task 11 restored the first half; see **D3** in `../shared/state.md`. Skipping this builds cleanly and silently ships dead search from a clean checkout.
- [ ] 15.2 Write `lib/search.ts` — scored matching: **title hits > heading hits > body hits**, results grouped by course section
- [ ] 15.3 Write `components/ui/SearchDialog.tsx` — index loads **lazily** on first keystroke or `Cmd/Ctrl-K`
- [ ] 15.4 **Verify search against three known terms** — one from a body paragraph, one from a heading, one from a page title
- [ ] 15.5 Commit

**Task done when:** all three terms return correct results, and the index is **under ~400 KB** pre-compression. Over that, the fallback is headings-only with body excerpts dropped. **Record the actual size.**

No external search service. No third-party script.

---

## Task 16 — The landing page

*Plan: `## Task 16` · 6 steps*

**Consumes:** `ProgressTracker` (Task 10 — reuse it, do not rebuild), `lib/patterns.ts` (Task 11), `lib/docs.ts` (Task 5).

**Produces:** the real `app/page.tsx`, replacing Loop 1's placeholder.

- [ ] 16.1 **Write the copy first, separately** — read `~/graph-engineering-course/README.md` and `content/docs/README.md`, then draft a **third independent phrasing** under "Landing copy" in `state.md`. Not a paraphrase of either. This is the only new prose in the project (constraint C2)
- [ ] 16.2 Write `components/landing/Hero.tsx`
- [ ] 16.3 Write `Curriculum.tsx`, `PatternGrid.tsx`, `GetStarted.tsx`, `Maintainers.tsx`, `Footer.tsx`
- [ ] 16.4 Write `app/page.tsx` — Hero → TwoGraphsSplit (Task 17) → Curriculum → PatternGrid → GetStarted → Maintainers → Footer, each inside a `<Section>`
- [ ] 16.5 **Build and check the copy against the constraint** — confirm it reads as independent of both READMEs
- [ ] 16.6 Commit

**Task done when:** the landing page builds and the copy has been checked against both source READMEs, not just written.

The footer surfaces the sync date from `SOURCE.json`, so the gap between the site and course `main` is visible rather than hidden.

---

## Task 17 — The three animated diagrams

*Plan: `## Task 17` · 6 steps*

**Landing-page components only** — constraint C5. Not in doc pages.

- [ ] 17.1 Write `components/ui/ScrollAnimator.tsx`
- [ ] 17.2 Write `TwoGraphsSplit.tsx`
- [ ] 17.3 Write `LifecycleDiagram.tsx`
- [ ] 17.4 Write `SubgraphViewer.tsx`
- [ ] 17.5 **Place all three on the landing page and verify reduced motion** — constraint C13
- [ ] 17.6 Commit

**Task done when:** all three render, edges draw via SVG `stroke-dashoffset`, nodes snap in on scroll, and **every animation is suppressed** under `prefers-reduced-motion: reduce` — verified, not assumed.

---

## Task 18 — Sitemap, llms.txt, 404, OG image, metadata

*Plan: `## Task 18` · 7 steps*

- [ ] 18.1 Write `app/sitemap.ts`
- [ ] 18.2 Write `scripts/generate-llms-txt.mjs`
- [ ] 18.3 Write `app/not-found.tsx`
- [ ] 18.4 Create `public/og-image.png`
- [ ] 18.5 Wire metadata in `app/layout.tsx`
- [ ] 18.6 **Run the Loop 4 gate** — `npm run verify:4`
- [ ] 18.7 Commit and record loop state

**Task done when:** `/sitemap.xml`, `/llms.txt`, and `/404` all emit, and the OG image resolves through `withBasePath()`.

---

## Gate

- [ ] `npm run verify:4` green
- [ ] All Task 15–18 boxes above ticked
- [ ] Four entries in `state.md`, one per task
- [ ] Landing copy drafted in `state.md` and checked against both READMEs
- [ ] Search index size recorded
- [ ] Gate entry appended to `shared/state.md`, row set to `gate green, awaiting review`
- [ ] **Stopped.** Loop 5 not started.

See `gate.md`.
