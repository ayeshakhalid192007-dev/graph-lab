# Loop 5 — Polish, Verification, Deploy

**Tasks:** 19–22 · **Gate:** `npm run verify:all`

**This is the final loop. There is no loop after it.**

---

## Read first

`CLAUDE.md` → `shared/goal.md` → `shared/constraints.md` → `shared/state.md` → this file → `tasks.md` → `../loop-4-landing/state.md` → the plan's Loop 5 section.

Also open `plan/2026-08-06-course-website-design.md` — Task 21 walks its Definition of Done line by line, and the spec is authoritative.

---

## Entry condition

**Loop 4 gate approved.** Check the Gate ledger in `shared/state.md`: the Loop 4 row must read `approved`. If it does not, stop and say so.

---

## Exit condition

Two parts, and they are separate:

1. **Tasks 19–21 complete and `npm run verify:all` green.** This is the loop's real gate. Reachable without any confirmation.
2. **Task 22 — deploy — is BLOCKED** until the user explicitly confirms. See below.

---

## Task 22 is blocked

**Constraint C18.** Creating the GitHub repo, pushing site code, and enabling Pages all require explicit user confirmation at this step.

A remote at `https://github.com/ayeshakhalid192007-dev/graph-lab` already exists and already holds this scaffold — **that does not pre-authorise the deploy.** Decision D1 in `shared/state.md` says so explicitly. Pushing the built site, writing `.github/workflows/deploy.yml`, enabling Pages, and amending the course repo are all still gated.

When you reach Task 22:

1. Finish Tasks 19–21 first.
2. Run `npm run verify:all` and read the output.
3. **Stop and ask.** Report the gate output, and ask whether to proceed with the deploy.
4. Do not create any remote repo, do not enable Pages, do not push site code, and do not touch the course repo until the user answers.

Blocked ≠ done. Report Tasks 19–21 as complete and Task 22 as awaiting confirmation.

---

## Scope

| Task | Does |
| --- | --- |
| 19 | Responsive and accessibility pass — 375 / 768 / 1280, keyboard-only, Lighthouse on three pages |
| 20 | Both-themes pass — every page type, all 20 mermaid diagrams in dark, Shiki dual-theme, no flash on load |
| 21 | Full Definition of Done verification — the spec's ten bullets, line by line, against the running site |
| 22 | Deploy — **blocked pending explicit confirmation** |

This loop adds no features. If something is missing, that is a defect to fix, not a surface to build.

---

## Verification here is by looking

Tasks 19 and 20 are not script-gated. `verify:all` will not catch a sidebar that fails to collapse or a mermaid diagram that is unreadable in dark mode. **Record the observation, not the verdict:**

> "sidebar collapsed at 767px, expanded at 768"

beats

> "responsive OK"

Task 21 is explicit about this: for each DoD bullet, record **what was checked and what was observed** — not "done", but the actual count or the actual behaviour. **Any bullet that cannot be confirmed is a defect to fix now, not a note to file.**

---

## Watch for

- **All three Lighthouse scores get recorded** — landing page, one doc page, `/certification/`. Fix everything flagged critical.
- **All 20 mermaid diagrams in dark mode specifically.** If any is unreadable, adjust `GraphDiagram`'s `themeVariables` — **not the course content** (constraint C1).
- **Shiki's dual-theme wiring actually switches.** A code block that stays light-themed in dark mode means the `.dark` selector needs configuring.
- **No flash of wrong theme** on hard refresh, in both themes.
- **Node >= 24 in three places** — when Task 22 writes `.github/workflows/deploy.yml`, keep it in step with `.nvmrc` and `package.json` engines. Never lower one in isolation (constraint C7).
- **`PAGES_BASE_PATH=/graph-lab` in CI**, unset locally (constraint C8).
- **The course repo amendment** (Task 22 Step 5) is the **only** change this project makes to `graph-engineering-course`, and it is gated with the rest of Task 22.

---

## Cross-loop repairs

This loop verifies everything, so it is the most likely to find defects in earlier loops' output. **Fix them** — that is Rule 1, and a broken thing found at the end is still broken. Record each under *Cross-loop repairs* in `shared/state.md` with symptom, cause, fix, and the command that verified it.

---

## The command

Run from `~/graph-lab`:

```
/loop Read ~/graph-lab/CLAUDE.md, ~/graph-lab/loops/shared/goal.md, ~/graph-lab/loops/shared/constraints.md, ~/graph-lab/loops/shared/state.md, ~/graph-lab/loops/loop-5-deploy/loop.md, ~/graph-lab/loops/loop-4-landing/state.md, and ~/graph-lab/plan/2026-08-06-course-website-design.md. Confirm the Loop 4 row in the Gate ledger reads approved before starting. Execute Loop 5 only (Tasks 19-22) from ~/graph-lab/plan/2026-08-07-graph-lab-implementation-plan.md using superpowers:subagent-driven-development. Task 22 is BLOCKED until I explicitly confirm the deploy — stop and ask, do not create any remote repo, do not push site code, do not enable Pages, and do not touch the course repo. The existing scaffold remote does not pre-authorise it. For Tasks 19-21, record what was observed, not the word "done". Do the next unchecked step, run its verification command and read the output, tick the checkbox in both the plan and loops/loop-5-deploy/tasks.md, append an entry to loops/loop-5-deploy/state.md, and commit. When Tasks 19-21 are ticked and `npm run verify:all` is green, append the gate entry to loops/shared/state.md, STOP, and report. This is the final loop.
```
