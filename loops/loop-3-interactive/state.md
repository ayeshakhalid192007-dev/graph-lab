# Loop 3 state — Interactive Course Surfaces

**Tasks:** 10–14 · **Gate:** `npm run verify:3` · **Status:** not started

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

**Entry check:** confirm the Loop 2 row in `../shared/state.md` reads `approved` before Task 10 begins.
