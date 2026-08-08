# Loop 5 state — Polish, Verification, Deploy

**Tasks:** 19–22 · **Gate:** `npm run verify:all` · **Status:** not started

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

### Task 19 — Responsive and accessibility pass

**Date:** 2026-08-08
**Landed:** every page type measured at 375 / 768 / 1280, a keyboard-only pass over
all 11 page types, and three Lighthouse accessibility scores — plus four real
accessibility defects found and fixed (R4–R7 in `../shared/state.md`).
**Files:** `components/ui/SearchDialog.tsx`, `app/globals.css`,
`components/interactive/PatternBrowser.tsx`, `components/interactive/StarterViewer.tsx`.

**Verified by:**

*Step 1 — three breakpoints.* A Playwright sweep over 12 page types × 3 widths:
**36 combos, 0 with horizontal body overflow, 0 escaping elements, 0 page errors.**
Widened to **all 86 doc pages at 375px: 0 with horizontal overflow, 0 page errors.**
Code blocks scroll inside their own `div.overflow-x-auto` (e.g. 1032px of content
in a 333px box); **60 tables measured, the widest fills its container exactly —
335px in 335px available — so none overflow** at the pinned content commit.

*Sidebar collapse, at the exact boundary the DoD names:* **767px → 0 of 86 sidebar
links visible, behind a "Contents" disclosure; 768px → the disclosure is gone and
the left column renders.** Clicking "Contents" at 375px opens it (18 group
summaries); expanding all 17 groups shows all **86** links.

> Measurement note: `getBoundingClientRect()` reports non-zero boxes for content
> inside a *closed* `<details>`, because Chrome uses `content-visibility: hidden`
> on `::details-content` — layout is retained so the open/close can animate. The
> first probe read that as "86 links visible at 375px" and it was the probe that
> was wrong, confirmed against a screenshot. `Element.checkVisibility()` is the
> API that respects it. Recorded so the next person measuring this does not
> re-derive it.

*Step 2 — keyboard-only.* **322 tab stops across 11 page types — 0 without a
visible focus ring, 0 without an accessible name.** Operated by keyboard alone:
nav disclosure (Enter opens), search (`Ctrl-K` opens, ArrowDown/ArrowUp move
`aria-selected`, Enter navigates, Escape closes and returns focus to the
trigger), pattern filters (Enter on `A · Extraction` took pattern links 25 → 5,
Enter again restored 25), starter file tree (Enter on `PATTERN.md` swapped the
shown file), quiz (Enter on "Reveal the answer"), flashcards (Enter flipped TERM
→ DEFINITION, Space flipped back, Next/Previous changed cards), and the
certification checklist (Space on all 7 boxes took it `0 of 7 met` → `7 of 7 met`).

*Step 3 — Lighthouse accessibility.* Lighthouse 13.4.1, headless Chromium 149:

| Page | Score | Failing audits |
| --- | --- | --- |
| Landing `/` | **100 / 100** | none |
| Doc page `/docs/02-foundations/glossary/` | **100 / 100** | none |
| `/certification/` | **100 / 100** | none |

Lighthouse's accessibility category is a subset, so axe-core 4.13.0 was also run
over **12 page types plus the open search dialog**. It found **15 violations that
Lighthouse scored 100 over** — see R4–R7. After the fixes: **0 violations across
all 13 states.**

**Next loop needs to know:** the a11y harness lives in the session scratchpad, not
the repo — it is Playwright + axe-core + Lighthouse driven against the built
`out/` served by `python3 -m http.server`, deliberately not added to
`package.json` (C10). Re-running it means rewriting it. What it proved is
recorded here and in R4–R7 rather than in a committed script.

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

**Entry check:** confirm the Loop 4 row in `../shared/state.md` reads `approved` before Task 19 begins.

**Lighthouse scores** — Task 19 Step 3 records all three here: landing page, one doc page, `/certification/`.

**Definition of Done walk** — Task 21 Step 2 records, per DoD bullet, what was checked and what was observed. Not "done" — the actual count or the actual behaviour.
