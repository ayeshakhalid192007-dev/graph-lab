# Verification

**Evidence before assertions, always.** This file defines what counts as evidence.

---

## The discipline

A checkbox is ticked only after its command was run **and its output read**. Not after the code was written. Not after it "looks right". Not after a similar command passed earlier.

Never write these words about a command you did not just run:

> "should pass" · "will pass" · "passes" · "verified" · "working" · "done"

If you did not read the output, you do not know. Say so instead.

A red command means **the task is not done.** Fix it, re-run, read again. Do not tick and note the failure for later.

---

## Gate commands

Defined in `package.json` by Loop 1 Task 1 Step 2. **The `verify:N` scripts are cumulative on purpose** — Loop 3 cannot silently break Loop 2's link check.

| Gate | Command | Expands to |
| --- | --- | --- |
| Loop 1 | `npm run verify:1` | `sync:check` → `check:content-shape` → `typecheck` → `build` |
| Loop 2 | `npm run verify:2` | `verify:1` → `check:links` |
| Loop 3 | `npm run verify:3` | `verify:2` |
| Loop 4 | `npm run verify:4` | `verify:2` |
| Loop 5 | `npm run verify:all` | `sync:check` → `check:content-shape` → `typecheck` → `lint` → `build` → `check:links` |

---

## What each check proves

| Script | Proves |
| --- | --- |
| `sync:check` | `content/` is byte-identical to the commit pinned in `content/SOURCE.json`. Catches any hand-edit. |
| `check:content-shape` | All 7 quizzes and 6 flashcard sets still parse — heading counts equal `<details>` counts (3, 2, 3, 2, 3, 2, 2); flashcard tables have bold term cells (6, 3, 6, 5, 7, 3 rows). A quiz that stops parsing produces a red build, never a silently empty page. |
| `typecheck` | `tsc --noEmit` — no type errors. |
| `lint` | `eslint` clean. |
| `build` | `next build` produces a full static export. |
| `check:links` | Every internal link in the emitted `out/` resolves to a real page. A link resolving to no known page fails here rather than shipping dead. |

---

## Recording a verification

In your loop's `state.md`, an entry's **Verified by** field carries the command *and what it printed* — a count, a score, a page total, the actual line. Not the word "green".

Good:

```
**Verified by:** `npm run verify:1` — clean. `next build` emitted 3 routes;
sync:check diffed 0 files against commit a3f9c21; check-content-shape
reported 7/7 quizzes and 6/6 flashcard sets parsed.
```

Bad:

```
**Verified by:** verify:1 passed.
```

The first tells the next loop what the baseline was. The second tells it nothing.

---

## Counts worth asserting

The spec promises specific numbers. When a task produces one of these, **assert the count and record it** — a drift from these numbers is a defect even when nothing is red.

| Thing | Expected |
| --- | --- |
| Doc pages | 86 |
| Roadmap steps | 17 |
| Skill tracks | 4 (G1–G4) |
| Pattern specs | 23 |
| Starter kits | 24 |
| Quizzes | 7 |
| Flashcard sets | 6 (Part 6 is quiz-only by design) |
| Practice projects | 8 |
| Attributed sources | 10 |
| Mermaid diagrams | 20, across 20 files |
| ` ```markdown ` fences | 41 |
| Other fenced blocks (json/yaml/text/jsonl) | 23 |
| Search index size | under ~400 KB pre-compression; headings-only is the fallback |

---

## Manual verification

Some things no script asserts. These are Loop 5's work (Tasks 19–21), and they are verified by **looking**, then recording what was observed.

- Layout at **375, 768, 1280** px; sidebar collapses below 768.
- Keyboard-only pass: every interactive element reachable, visible focus state, accessible name.
- Lighthouse accessibility on the landing page, one doc page, and `/certification/` — record all three scores.
- Both themes on every page type, including all 20 mermaid diagrams in dark mode and Shiki's dual-theme switching.
- No flash of wrong theme on hard refresh, in both themes.

Record the **observation**, not the verdict: "sidebar collapsed at 767px, expanded at 768" beats "responsive OK".

---

## Proving a check actually works

Loop 1 Task 3 Step 5 does this for `sync:check`: hand-edit a synced file, confirm the check goes red, revert, confirm it goes green.

A check never observed failing is a check not known to work. Where a task asks for this, do it — a green light that cannot go red is not verification.
