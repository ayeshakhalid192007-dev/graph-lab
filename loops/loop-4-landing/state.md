# Loop 4 state — Landing Page, Blueprint Identity, Search

**Tasks:** 15–18 · **Gate:** `npm run verify:4` · **Status:** in progress — Task 15 done

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
