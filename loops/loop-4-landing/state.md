# Loop 4 state — Landing Page, Blueprint Identity, Search

**Tasks:** 15–18 · **Gate:** `npm run verify:4` · **Status:** in progress — Tasks 15–17 done

Per-task log for this loop. Cross-loop material — gate entries, repairs to earlier loops, decisions binding later loops — goes in `../shared/state.md` instead.

---

## Task log

One entry per completed task, appended as it lands. Template from `../shared/handoff.md`:

```markdown
### Task <n> — <title>

**Date:** YYYY-MM-DD
**Landed:** what now exists that did not before.
**Files:** created / modified, as paths.
**Produces:** exported symbols and types later tasks import by name.
**Verified by:** the command run, and what it actually printed — a count, a
score, a page total. Not "green".
**Next loop needs to know:** anything non-obvious. Delete if nothing.
```

### Task 15 — Search: index, query, dialog

**Date:** 2026-08-08
**Landed:** local site search — a generated index, a scored matcher, and a lazy
`SearchDialog` filling the slot Loop 1 left empty in `NavBar`. No external
service, no third-party script.

**Files:** created `scripts/build-search-index.mjs`, `lib/search.ts`,
`components/ui/SearchDialog.tsx`; modified `components/ui/NavBar.tsx`,
`package.json` (`prebuild`).

**Produces:**
- `public/search-index.json` → `{ records: SearchRecord[]; inverted: Record<string, number[]>; body?: Record<string, number[]> }`.
  **`body` is a second token map the plan did not call for — see D13.**
- `SearchRecord = { route; title; section; headings: string[]; excerpt }`.
- `search(index, query, limit?): SearchHit[]` and `groupBySection(hits)` from `lib/search.ts`.
- `SearchDialog()` — no props; owns its trigger and its dialog.

**Verified by:**
- `npm run build:search` → `86 pages, 520 title/heading tokens, 4258 body-only tokens, 179888 bytes (175.7 KB)`. **Index size: 179,888 bytes = 175.7 KB**, well under the ~400 KB cap, so no fallback stage was taken.
- **The three Definition-of-Done term classes**, via `lib/search.ts` under bare Node:
  - *page title* — `glossary` → `/docs/02-foundations/glossary/` first, score 20.
  - *heading* — `provenance` → `/docs/05-part-3-the-graph-of-facts/step-8-provenance-every-claim-keeps-a-receipt/` first, score 20.
  - *body paragraph* — `heartbeat` → `/docs/01-prerequisites/loop-engineering-primer/` among 4 results. **This returned NO RESULTS before D13.**
- Prefix matching: `prov` → the provenance step page first. Nonsense: `zzzznotaword` → no results.
- **Lazy loading proven in the browser**, against the built export: on a fresh `/tracks/` load, `performance.getEntriesByType("resource")` showed **0** fetches of `search-index.json` after 1.5 s idle; **1** after opening the dialog; still **1** after typing. `grep -rl "search-index.json" out --include=*.html` returns nothing — it is never referenced in markup.
- Dialog behaviour: `Ctrl/Cmd-K` opens it, results group under section labels, the first result is `aria-selected`, `ArrowDown`/`ArrowUp` move the selection, and `Enter` navigated `/tracks/` → `/docs/02-foundations/glossary/` and closed the dialog. Empty state reads `Nothing matches zzzznotaword.`
- `npm run typecheck` silent, `npm run lint` exit 0, `npm run check:links` → `18662 internal links across 131 pages all resolve`.

**Next loop needs to know:** `prebuild` now reads
`"npm run build:starters && npm run build:search"` — **D3 is discharged.** Task 18
adds the llms.txt generator to the same key.

---

---

### Task 16 — The landing page

**Date:** 2026-08-08
**Landed:** the real `/` — Loop 1's placeholder is gone. Hero, Curriculum, pattern
grid, Get started, Maintainers, and a footer carrying the sync provenance line.

**Files:** created `components/landing/Hero.tsx`, `Curriculum.tsx`,
`PatternGrid.tsx`, `GetStarted.tsx`, `Maintainers.tsx`, `Footer.tsx`; rewrote
`app/page.tsx`.

**Verified by:**
- `npm run build` → 130 pages, `/` among them. Emitted HTML carries the headline,
  subhead, and every section heading.
- **Stat strip is computed, not typed**: the page emitted `86 PAGES · 23 PATTERNS ·
  24 STARTER KITS · 7 QUIZZES` from `getAllDocs().length`, `getAllPatterns().length`,
  `getStarterSlugs().length` and `getRoadmap().length`.
- **The copy check is mechanical** — see "Landing copy" → *Independence check*. The
  first pass **found two real violations** (a six-word overlap with `docs/README.md`'s
  G4 row, and a five-word overlap with `README.md`'s starter-kit line) and both were
  rewritten. After the rewrite: **0** six-word and **0** five-word overlaps against
  either README; the one remaining four-word match is the attribution proper noun
  `graph engineering course contributors`.
- Footer prints `Content synced from af5321e3 on 2026-08-07`, linking the sha to the
  course repo tree — the pinned-commit lag is visible on every page of the site.
- `npm run check:links` → `18710 internal links across 131 pages all resolve`;
  `typecheck` silent, `lint` exit 0.

**Next loop needs to know:** `app/page.tsx` has **no diagrams in it yet** — Task 17
Step 5 places `TwoGraphsSplit`, `LifecycleDiagram` and `SubgraphViewer` into it. The
hero stat strip is a plain `<ul>`, not a `<dl>`: a screen reader was hearing
"PAGES, 86 PAGES" from the sr-only `<dt>`.

---

### Task 17 — The three animated diagrams

**Date:** 2026-08-08
**Landed:** `ScrollAnimator` plus `TwoGraphsSplit`, `LifecycleDiagram` and
`SubgraphViewer`, all three placed on the landing page. Hand-built inline SVG, not
mermaid. Landing page only (C5).

**Files:** created `components/ui/ScrollAnimator.tsx`,
`components/landing/TwoGraphsSplit.tsx`, `LifecycleDiagram.tsx`,
`SubgraphViewer.tsx`; modified `app/page.tsx`, `app/globals.css`,
`app/layout.tsx`, `components/landing/PatternGrid.tsx`.

**Produces:** `ScrollAnimator({ children, className? })` — adds `.in-view` once on
first intersection at `threshold: 0.25`, then disconnects. The CSS contract is
`.diagram .edge` (draws via `stroke-dashoffset`, every shape carries
`pathLength="1"`) and `.diagram .node` (opacity + translate), latched by
`.diagram.in-view`.

**Verified by:** four measured conditions, via Playwright `emulateMedia` against
the built export. 3 diagram wrappers, **15 edges, 19 nodes**:

| Condition | latched | edges drawn | nodes visible | transition |
| --- | --- | --- | --- | --- |
| Normal motion, before scrolling | 0/3 | 0/15 | 0/19 | 0.9s |
| Normal motion, after scrolling through | **3/3** | **15/15** | **19/19** | 0.9s |
| `prefers-reduced-motion: reduce`, at first paint | **3/3** | **15/15** | **19/19** | **1e-05s** |
| JavaScript disabled entirely | 0/3 | **15/15** | **19/19** | 0.9s |

All three carry `role="img"` and a full sentence `aria-label` describing what the
diagram shows, since the animation carries meaning a screen reader never gets.

**Two defects found by that verification, both fixed:**

1. **Reduced motion showed a blank frame first.** `ScrollAnimator` adds `.in-view`
   on mount under reduced motion, but mount is after hydration — measured, the edges
   were still at `stroke-dashoffset: 1` at first paint. C13 asks for the finished
   diagram, not a late one. Fixed in CSS with a `@media (prefers-reduced-motion:
   reduce)` block that settles the final state at first paint, making the JS latch a
   no-op on that path.
2. **With JavaScript off, all three diagrams were permanently blank** — the draw-in
   is an enhancement, but the undrawn state was the default. Fixed with a `<noscript>`
   style block in `app/layout.tsx`.
3. Cosmetic, caught by screenshot: the pattern grid's `gap-px` over a ruled
   background painted the empty 24th cell as a solid block, because 23 patterns never
   fill a 3-column row. Now a hairline per chip.

**Next loop needs to know:** the `.diagram` CSS contract lives in `app/globals.css`
and is depended on by three components plus a `<noscript>` block in the layout.
Loop 5's theme pass should check the diagrams in dark mode — the strokes use
`var(--accent)` and `var(--ink)`, so they follow the palette, but that is reasoned,
not yet observed.

---

## Blockers

A blocker stops this loop. Record it here, then stop and report — do not invent an answer and do not work around it silently. Blocked ≠ done.

```markdown
### B<n> — <short title>, <date>

**Blocked at:** Task <n>, Step <n>.
**What is needed:** the specific input, decision, or clarification.
**What was tried:** so the user does not repeat it.
**Cannot proceed because:** why guessing would be wrong.
```

_None._

---

## Notes

Working observations that are not yet handoff material — counts seen, oddities noticed, things to confirm. Anything here that turns out to matter to a later loop gets promoted into a task entry's *Next loop needs to know*, or into `../shared/state.md`.

**Entry check:** Loop 3 was approved on 2026-08-08 — merged to `main` as PR #3, then the user instructed Loop 4 to start. The ledger row reads `approved`.

**Landing copy** — Task 16 Step 1 drafts the hero and section copy here, as its own section, before it is buried in JSX. Constraint C2: it must be a third independent phrasing, not a paraphrase of `~/graph-engineering-course/README.md` or `content/docs/README.md`. Read both first.

---

## Landing copy

Drafted 2026-08-08, Task 16 Step 1, **before** any component was written. This is
the only new prose in the project (C2). Both sources were read first:
`~/graph-engineering-course/README.md` and `content/docs/README.md`.

### What each source already says

- **`README.md`** opens on the agent: a single automated agent copes with a thin
  memory file because only one reader and one writer exist at a time; add parallel
  agents and two writers corrupt each other while a reader cannot tell a verified
  fact from a half-finished guess. It then names Graph Engineering as the practice
  of building a shared, structured memory of facts plus work history.
- **`content/docs/README.md`** opens on navigation: the directory *is* the course,
  there is one copy of the content, and there are two ways through — the core path
  and the second read.

### The third phrasing

Same claim, different sentences. It enters from neither angle: not from the agent
and not from the table of contents, but from what you lose the moment the file is
shared — the ability to attribute a line.

**Hero headline**

> Build memory that more than one agent can trust.

**Hero subhead**

> A file holds up fine while one loop owns it start to finish. Bring in a second
> worker and you can no longer say who wrote a line, when it landed, or whether
> anybody checked it. Graph Engineering swaps that file for two graphs — one
> recording what was attempted, one holding what turned out to be true — so work
> that runs in parallel stays auditable afterwards.

**Hero stat strip** (numbers computed, never typed)

> 86 PAGES · 23 PATTERNS · 24 STARTER KITS · 7 QUIZZES

**Curriculum section**

> **Seventeen steps, seven parts**
> Steps 1–13 are the core path: they end with a fact graph you can query, hand to a
> worker in slices, and check answers against. Steps 14–17 are the second read —
> putting several loops under one set of rules, keeping a graph honest as it grows,
> and learning to spot the jobs that never needed one.

**Pattern grid section**

> **Twenty-three patterns**
> Named answers to the problems that show up once a graph is carrying real traffic.
> Each one ships a starter kit that runs under either harness.

**Get started section**

> **Three steps in**
> 1. **Read Start here.** Two or three questions about what you have already built,
>    and it points you at the page to open first.
> 2. **Pick a track.** G1 through G4, beginner to expert. Each finishes where the
>    next one assumes you are.
> 3. **Clone a starter kit.** One command, no API keys, no build.

**Maintainers section**

> **Where this comes from**
> Written by the Graph Engineering Course Contributors and released under MIT. Every
> page here is rendered straight from the course repository — this site stores no
> second copy of the material and cannot drift from it.

**Footer provenance line** (generated from `SOURCE.json`)

> Content synced from `<sha8>` on `<syncedAt date>`

### Independence check

Run at Step 5 mechanically, not by eye: the shipped prose was extracted from
`components/landing/*.tsx`, normalised, and shingled against both READMEs.

**First pass caught two real violations, and both were rewritten:**

1. *"…the judgment to notice when a graph is the wrong tool"* shared **six
   consecutive words** with `docs/README.md`'s G4 row (*"Recognize when a graph is
   the wrong tool for a job"*), and the sentence around it was a light paraphrase of
   *"This is where governance, scale, and the judgment calls about when not to build
   a graph live."* Rewritten to *"putting several loops under one set of rules,
   keeping a graph honest as it grows, and learning to spot the jobs that never
   needed one."*
2. *"a runnable starter kit for Claude Code and OpenCode"* shared five words with
   `README.md`'s *"23 runnable kits for Claude Code and OpenCode"*. Rewritten to
   *"a starter kit that runs under either harness."*

**After the rewrite** — 230 words of landing prose:

| Shingle | vs `README.md` | vs `content/docs/README.md` |
| --- | --- | --- |
| 6-word | **0** | **0** |
| 5-word | **0** | **0** |
| 4-word | **1** | **0** |

The single 4-word match is `graph engineering course contributors` — an attribution
proper noun, which is correct to reuse rather than reword.

Also checked by eye, against both files:

- No sentence above appears in either README.
- The failure the hero names is **attribution** — who wrote a line, when, whether it
  was checked. `README.md` names **corruption** and **verifiability**. Overlapping
  claim, different failure foregrounded, no shared clause.
- "two graphs — one recording what was attempted, one holding what turned out to be
  true" against `README.md`'s "a graph of facts and a graph of work history": same
  distinction, opposite order, no shared wording.
- *core path* and *second read* are the course's own names for its two passes, kept
  as vocabulary; the sentences around them are new. `content/docs/README.md`'s
  "roughly two hours" framing and its "I have one loop and one memory file" quotation
  are not reused.
- Shared vocabulary that cannot be avoided and is not paraphrase: *loop*, *worker*,
  *fact graph*, *provenance*, *subgraph*, *track*, the G1–G4 names, and the step
  titles themselves.
