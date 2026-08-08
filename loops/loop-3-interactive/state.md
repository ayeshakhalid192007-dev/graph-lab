# Loop 3 state — Interactive Course Surfaces

**Tasks:** 10–14 · **Gate:** `npm run verify:3` · **Status:** in progress — all five tasks done, gate green

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

### Task 10 — Tracks page, `TrackSelector`, `ProgressTracker`

**Date:** 2026-08-08
**Landed:** `/tracks/` — the four G1–G4 track cards, the full 17-step roadmap as
seven per-Part panels, and a localStorage progress tracker over the 17 steps.
`/tracks/` is now built, so its `PENDING_ROUTES` line is deleted.

**Files:** created `lib/tracks.ts`, `components/interactive/ProgressTracker.tsx`,
`components/interactive/TrackSelector.tsx`, `app/tracks/page.tsx`; modified
`scripts/check-links.mjs` (dropped the `/tracks/` pending entry).

**Produces:**
- `TRACKS: Track[]` and `type Track = { id: "G1"|"G2"|"G3"|"G4"; name; level; startsKnowing; finishesAbleTo; covers; firstStepRoute }` from `lib/tracks.ts`.
  Note the field is **`covers: string`**, as in the plan's own code listing — not the `steps: string[]` this loop's `tasks.md` summary says.
- `ProgressTracker({ steps }: { steps: DocMeta[] })` — **the shipped prop list, for Loop 4's landing page.** One prop, no others; the caller chooses the steps. State is a `Set<string>` of `DocMeta.route` under localStorage key `graph-lab:progress`, read on mount so SSR markup and the first client render agree.
- `TrackSelector()` — no props, imports `TRACKS` itself.

**Verified by:**
- The Step 5 probe printed `all 4 track routes resolve` — all four `firstStepRoute` values are in `getAllDocs()`.
- `npm run build`: 90 static pages, `/tracks/` among the routes; the page throws at build time if `TRACKS.length !== 4` or the roadmap is not 17 steps, and it did not.
- `npm run check:links`: `17596 internal links across 91 pages all resolve`, 0 broken. Pending routes down from 13 to **12** and pending links from 925 to 753 — `/tracks/`'s 180 are now real.

**Next loop needs to know:** the roadmap panels do **not** yet link to `/quiz/<part>/`
or `/flashcards/<part>/`; those links are added in Task 12, when the routes exist,
rather than adding two more `PENDING_ROUTES` entries to a list D10 says can only shrink.

---

### Task 11 — Pattern browser and starter viewer

**Date:** 2026-08-08
**Landed:** `/patterns/` with a three-facet filter over all 23 specs, 23
`/patterns/<slug>/` pages rendering the spec through `renderMarkdown`, and a
starter viewer that fetches each kit's real files on demand. `prebuild` is wired.
Along the way, **repair R3**: the sync had been dropping every kit's Claude Code
half. See `../shared/state.md`.

**Files:** created `lib/patterns.ts`, `lib/use-stored-set.ts`,
`scripts/build-starters.mjs`, `components/interactive/PatternBrowser.tsx`,
`components/interactive/StarterViewer.tsx`, `app/patterns/page.tsx`,
`app/patterns/[slug]/page.tsx`; modified `scripts/sync-docs.mjs` (R3),
`lib/content.ts` (R3), `content/` (re-synced, 224 → 256 files, same pinned commit),
`components/interactive/ProgressTracker.tsx` (rewritten onto `useStoredSet`),
`package.json` (`prebuild`), `.gitignore`, `scripts/check-links.mjs`.

**Produces:**
- `PatternMeta = { slug; category; stage; cost; core; tools: string[]; title }`,
  `getAllPatterns()`, `getPatternBySlug()`, `getStarterSlugs()`,
  `getPatternFacets()`, `type PatternFacets` — all from `lib/patterns.ts`.
  `getPatternBySlug().body` is the spec **with frontmatter stripped** (gray-matter),
  so the `---` block does not render as a table on the page.
- `useStoredSet(key)` from `lib/use-stored-set.ts` → `{ values: Set<string>; toggle; clear }`.
  Task 14's checklist uses it too.
- `scripts/build-starters.mjs` → `public/starters/<slug>.json`, shaped
  `{ files: { path: string; content: string | null }[] }`. Gitignored — `prebuild`
  regenerates it from `content/` on every build.

**Verified by:**
- `lib/patterns.ts` under bare Node: **23 patterns**, **24 starter kits**, 7 core /
  16 extended, 0 patterns without a kit. Facets came out as 7 categories
  (`A-extraction` … `G-storage`), 4 stages (`governance`, `read`, `storage`, `write`),
  2 tools (`Claude Code`, `OpenCode`).
- `npm run build:starters` → `build:starters OK — 24 kits, 124 files`.
- **`prebuild` proven, not assumed:** deleted `public/starters/` entirely, ran
  `npm run build`, and the log shows `> npm run build:starters` → 24 JSON files back.
- `npm run build`: **114 static pages**, `/patterns` plus 23 `/patterns/[slug]`.
  `find out/patterns -maxdepth 1 -type d | tail -n +2 | wc -l` → **23**.
  `ls public/starters/*.json | wc -l` → **24**.
- `npm run check:links`: `18218 internal links across 115 pages all resolve`, 0 broken.
  Pending routes 12 → **3**; the whole `/patterns/<slug>/` derived block is gone from
  `PENDING_ROUTES`, along with its `knownPatternSlugs()` helper.
- `npm run typecheck` silent, `npm run lint` exit 0 with no output.
- **Kits shipping both harnesses: 8** — the 7 patterns whose frontmatter says
  `tools: [Claude Code, OpenCode]`, plus `_template`. Those 7 pattern pages render
  the harness switcher; the other 16 correctly do not.

**Next loop needs to know:**
- **`prebuild` is only half-wired.** It reads `"npm run build:starters"`. Loop 4
  Task 15 must extend it to `"npm run build:starters && npm run build:search"` —
  D3's warning is still live for the search index.
- `public/starters/` and `public/search-index.json` are **gitignored**. They are
  derived from `content/` and rebuilt by `prebuild`, so a clean checkout is fine,
  but nothing in `public/` should be assumed to exist before a build.
- The tool facet is real frontmatter, not `core`/`extended` — see **D11**.

---

---

### Task 12 — Quizzes and flashcards

**Date:** 2026-08-08
**Landed:** `/quiz/[part]/` × 7 and `/flashcards/[part]/` × 6, both playable and
both prerendered with their first item already in the HTML. `/tracks/` now links
each Part panel to its quiz and, where one exists, its flashcard set.

**Files:** created `components/interactive/Quiz.tsx`,
`components/interactive/Flashcards.tsx`, `app/quiz/[part]/page.tsx`,
`app/flashcards/[part]/page.tsx`; modified `app/tracks/page.tsx`,
`scripts/check-links.mjs`.

**Produces:** `Quiz({ part: number; questions: QuizQuestion[] })`,
`Flashcards({ part: number; cards: Flashcard[] })`. Both import their types from
`lib/parse-content.ts` — **no second parser was written**; these routes call the
same `parseQuiz` and `parseFlashcards` that `check-content-shape.mjs` runs in CI.

**Verified by:**
- `find out/quiz -name index.html | wc -l` → **7**. `find out/flashcards -name index.html | wc -l` → **6**.
- Per-part, through the shared parsers: questions **3 / 2 / 3 / 2 / 3 / 2 / 2**, cards **6 / 3 / 6 / 5 / 7 / – / 3**. Identical to the counts Loop 1's gate recorded, which is the point of sharing the parser.
- Part 6 emits a quiz and **no** flashcard page, by design.
- Rendered text scraped out of `out/quiz/1/index.html`: `PART 1 · QUESTION 1 OF 3 · 0 marked correct so far`, the question title, its body, and the `Reveal the answer` control. Out of `out/flashcards/1/index.html`: `PART 1 · CARD 1 OF 6`, `Term`, the first term, and `Previous` / `Next` / `Shuffle`.
- `npm run build` → 128 pages. `npm run check:links` → `18568 internal links across 128 pages all resolve`, 0 broken, pending down to **3**.
- `npm run typecheck` silent; `npm run lint` exit 0.

**Next loop needs to know:** `/flashcards/[part]/` derives its six parts by testing
for `docs/<dir>/flashcards.md` on disk rather than hardcoding `part !== 6`, so a
Part that gains a set in the course repo gets a page from a re-sync alone.

---

---

### Task 13 — Projects and resources pages

**Date:** 2026-08-08
**Landed:** `/projects/` — the eight practice projects as cards, each linking into
`/docs/projects/…` — and `/resources/` — the ten attributed sources plus the
anti-patterns page. Both `PENDING_ROUTES` lines deleted.

**Files:** created `app/projects/page.tsx`, `app/resources/page.tsx`; modified
`scripts/check-links.mjs`.

**Verified by:**
- `/projects/`: the page throws unless it finds exactly 8, and it found **8**. The
  eight `href="/docs/projects/<slug>/"` links are in the emitted HTML, one per card,
  and all eight resolve under `check:links`.
- Card copy is read out of each project page, not written here: the badges are its
  `**Difficulty:**` and `**Time:**` fields and the excerpt is the opening sentence of
  its `## The scenario` section. Rendered check on `out/projects/index.html` shows
  e.g. `Project 1 · Nodes and Edges by Hand / Beginner · 15–20 minutes / You keep a
  running list of books…`.
- `/resources/`: the page throws unless `resources/sources.md` yields exactly 10
  `## N.` headings, and it yielded **10**; `out/resources/index.html` carries 10
  matching `<h2 id>` anchors. The anti-patterns page renders below it.
- `npm run build` → 130 pages. `npm run check:links` → `18636 internal links across
  130 pages all resolve`, 0 broken. **`PENDING_ROUTES` is down to one entry**,
  `/certification/`, which Task 14 removes.
- `npm run typecheck` silent; `npm run lint` exit 0.

**Next loop needs to know:** `section === "projects"` matches **17** docs, not 8 —
the section README and the eight reference solutions under `projects/solutions/`
share the section. The page filters on `slug.length === 2`. Any later surface
counting projects needs the same filter.

---

---

### Task 14 — Certification

**Date:** 2026-08-08
**Landed:** `/certification/` — the seven Graph Ready criteria as a persisted
checklist that unlocks a canvas certificate at seven of seven, plus the defining
doc rendered below it. `PENDING_ROUTES` is now **empty**.

**Files:** created `components/interactive/GraphReadyChecklist.tsx`,
`components/interactive/CertificateGenerator.tsx`, `app/certification/page.tsx`;
modified `scripts/check-links.mjs`, `.gitignore`.

**Produces:** `GraphReadyChecklist({ criteria: string[] })` owns the checked state
(localStorage `graph-lab:graph-ready`, via `useStoredSet`) and renders
`CertificateGenerator({ criteria: string[] })` itself once all seven are checked.
Neither component hardcodes a criterion; the page parses them out of
`docs/assessments/graph-ready-certification.md` and throws unless it finds
exactly 7 non-empty rows.

**Verified by — a real walkthrough**, Playwright against the built `out/` served
on `localhost:8321`, not the dev server:

- **Pattern filters.** `A · Extraction` → `3 patterns` (document-to-facts,
  code-change-to-graph, conversation-to-claims). Adding `B · Resolution` → `6`, so
  within a group it ORs. `OpenCode` alone → `7 patterns`, exactly the 7 kits that
  ship both harnesses. `OpenCode` + `storage` → `1 pattern` (sqlite-backed-graph),
  so across groups it ANDs. `+ read` → `3`. `E · Checker` + `storage` → `0 patterns`
  and the named-recovery message *"No pattern matches every filter at once. Clear the
  category or stage filter to widen the set."*
- **Starter kit + harness switcher**, on `/patterns/document-to-facts/`: the tree
  loaded from the fetched JSON as `/`, `.claude/agents`, `.claude/skills/extract-facts`.
  Clicking **OpenCode** swapped those for `opencode`, `opencode/skills/extract-facts`,
  with the four shared root files staying put. Opening the OpenCode `SKILL.md` showed
  `--- name: extract-facts description: OpenCode equivalent of the Claude Code extr…`.
- **Quiz**, `/quiz/1/`: three questions, revealed each, answered *had it / didn't /
  had it* → `You marked 2 of 3 correct.` The running tally read `0`, `1`, `1` on the
  way through. `Start over` returned it to `QUESTION 1 OF 3 · 0 marked correct so far`.
- **Flashcards**, `/flashcards/1/`: `CARD 1 OF 6`, term `Thin-memory trick`, flipped
  to its definition, `Next`/`Previous` moved and auto-unflipped. `Shuffle` returned
  the same six terms in a different order (set-equal, sequence-unequal).
- **Tracks**: 4 track cards, 17 checkboxes. Expanding G2 revealed its start link
  `/docs/04-part-2-the-dag-of-work/`. Ticking three steps moved the bar from
  `Step 0 of 17` / `aria-valuenow="0"` to `Step 3 of 17` / `3` / `width: 17.6471%`,
  and **a full page reload came back at `Step 3 of 17` with 3 boxes still checked.**
- **Certification**: opened at `0 of 7 met` with *"7 criteria still to go. The
  certificate unlocks at 7 of 7."* The seven labels matched the doc's table rows
  verbatim. Ticking all seven flipped it to `7 of 7 met` and
  `SEVEN OF SEVEN · CERTIFICATE UNLOCKED`. With the name field empty the download
  button was `disabled`.
- **The certificate downloaded.** Typed `Ayesha Khalid`, clicked *Download
  certificate*, and the browser wrote **`graph-ready-ayesha-khalid.png`** —
  **185,434 bytes, PNG 1600 × 1200, 8-bit RGBA**. Opened it: Blueprint paper ground,
  dot grid, hairline border with accent corner ticks, `GRAPH READY` in mono, the
  name, all seven criteria ticked and numbered, `August 8, 2026`, and
  `Self-certified · graph-lab`.

**Next loop needs to know:** the certificate is drawn in the **light** palette only,
regardless of theme. A PNG has no theme to follow and it is meant to be printed on
white; that is a deliberate choice, not a missed dark-mode pass, and Loop 5 Task 20's
dual-theme sweep should not "fix" it.

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

**Entry check:** the Loop 2 row read `gate green, awaiting review` when this loop opened. The user's instruction to start Loop 3 is what moved it to `approved` — the same signal recorded against Loop 1 — and the ledger row now says so.

