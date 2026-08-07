# Loop 4 — Landing Page, Blueprint Identity, Search

**Tasks:** 15–18 · **Gate:** `npm run verify:4`

---

## Read first

`CLAUDE.md` → `shared/goal.md` → `shared/constraints.md` → `shared/state.md` → this file → `tasks.md` → `../loop-3-interactive/state.md` → the plan's Loop 4 section.

---

## Entry condition

**Loop 3 gate approved.** Check the Gate ledger in `shared/state.md`: the Loop 3 row must read `approved`. If it does not, stop and say so.

---

## Exit condition

`npm run verify:4` green, and every route in the spec's route table now renders — including `/`, `/sitemap.xml`, `/llms.txt`, and `/404`.

---

## Scope

| Task | Builds |
| --- | --- |
| 15 | `scripts/build-search-index.mjs`, `lib/search.ts`, `components/ui/SearchDialog.tsx` |
| 16 | The landing page — `Hero`, `Curriculum`, `PatternGrid`, `GetStarted`, `Maintainers`, `Footer`, `app/page.tsx` |
| 17 | The three animated diagrams — `ScrollAnimator`, `TwoGraphsSplit`, `LifecycleDiagram`, `SubgraphViewer` |
| 18 | `app/sitemap.ts`, `scripts/generate-llms-txt.mjs`, `app/not-found.tsx`, `public/og-image.png`, metadata in `app/layout.tsx` |

This loop replaces Loop 1's placeholder `app/page.tsx` and fills the `SearchDialog` slot Loop 1 left empty in `NavBar`.

---

## The one place new prose is written

**Constraint C2, and this loop owns the exception.** The landing page's hero and section copy is site chrome, not course content — it is the only new prose in the entire project.

Before writing any component:

1. Open `~/graph-engineering-course/README.md` **and** `content/docs/README.md`.
2. Read how each phrases the pitch.
3. Write the landing copy as a **third independent phrasing** — same claim, different sentences. Not a paraphrase of either.
4. **Draft it in `state.md` under "Landing copy" first**, so the wording is reviewable on its own before it is buried in JSX.

That is Task 16 Step 1, and it comes before Step 2 for a reason.

---

## What this loop must NOT touch

- **Anything in Tasks 19–22.** No responsive pass, no a11y pass, no theme pass, no deploy. Loop 5 owns those, and doing them here removes the review gate that catches what you missed.
- **`content/`** — constraint C1.
- **Course prose anywhere except the landing page's own chrome** — constraint C2.
- **The three animated diagrams inside doc pages** — constraint C5. They are landing-page components. Putting them in doc pages needs a marker convention inside `docs/`, which is a course-content change.

---

## Watch for

- **Search index size.** Expected under **400 KB** before compression. If it exceeds that, the fallback is **headings-only indexing with body excerpts dropped** — not a bigger download. Record the actual size in `state.md`.
- **Search costs nothing on initial load.** The client loads the index lazily on the first keystroke or `Cmd/Ctrl-K`. No external service, no third-party script; matching is a small local function in `lib/search.ts`.
- **Scoring order:** title hits above heading hits above body hits, results grouped under their course section.
- **Verify search against three known terms** — one from a body paragraph, one from a heading, one from a page title. That is the DoD line, and Task 15 Step 4 is where it gets tested.
- **`ProgressTracker` is reused, not rebuilt.** Loop 3 Task 10 already shipped it taking `{ steps: DocMeta[] }`. Import it.
- **All motion suppressed under `prefers-reduced-motion: reduce`** — constraint C13. Edges draw via SVG `stroke-dashoffset`; nodes snap in on scroll. Task 17 Step 5 verifies reduced motion explicitly.
- **No shadows, no gradients, no glow** — constraint C11. Hairline rules and corner ticks instead.
- **`withBasePath()` on every bare `href`/`src`**, including the OG image URL.

---

## The command

Run from `~/graph-lab`:

```
/loop Read ~/graph-lab/CLAUDE.md, ~/graph-lab/loops/shared/goal.md, ~/graph-lab/loops/shared/constraints.md, ~/graph-lab/loops/shared/state.md, ~/graph-lab/loops/loop-4-landing/loop.md, and ~/graph-lab/loops/loop-3-interactive/state.md. Confirm the Loop 3 row in the Gate ledger reads approved before starting. Execute Loop 4 only (Tasks 15-18) from ~/graph-lab/plan/2026-08-07-graph-lab-implementation-plan.md using superpowers:subagent-driven-development. For Task 16 Step 1, read ~/graph-engineering-course/README.md and content/docs/README.md first, then draft the landing copy as a third independent phrasing under "Landing copy" in loops/loop-4-landing/state.md before writing any JSX. Do the next unchecked step, run its verification command and read the output, tick the checkbox in both the plan and loops/loop-4-landing/tasks.md, append an entry to loops/loop-4-landing/state.md, and commit. When all Task 15-18 checkboxes are ticked and `npm run verify:4` is green, append the gate entry to loops/shared/state.md, STOP this loop permanently, and report the gate output. Do not start Loop 5.
```
