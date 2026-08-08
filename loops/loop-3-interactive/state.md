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
