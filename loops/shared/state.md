# Shared state

Cross-loop state for all five loops. Per-task detail lives in each loop's own `state.md`; this file holds only what **crosses a loop boundary**.

**Status:** scaffold created, no loop has run yet.

---

## Gate ledger

One row per gate, appended when the gate goes green and the loop stops.

| Loop | Tasks | Gate command | Status | Date | Notes |
| --- | --- | --- | --- | --- | --- |
| 1 — Foundation & pipeline | 1–4 | `npm run verify:1` | not started | — | — |
| 2 — Render layer & 86 doc pages | 5–9 | `npm run verify:2` | not started | — | — |
| 3 — Interactive surfaces | 10–14 | `npm run verify:3` | not started | — | — |
| 4 — Landing, identity, search | 15–18 | `npm run verify:4` | not started | — | — |
| 5 — Polish, verify, deploy | 19–22 | `npm run verify:all` | not started | — | — |

Status values: `not started` → `in progress` → `gate green, awaiting review` → `approved`.

**A loop sets its own row to `gate green, awaiting review` and stops. Only the user moves a row to `approved`.**

---

## Cross-loop repairs

A loop that fixes a defect in an earlier loop's output records it here. Rule 1 in `loop.md`: fixing is allowed, starting later work is not.

Template:

```
### R<n> — Loop <fixing> repaired Loop <origin>, <date>

**Symptom:** what was observed, and where.
**Cause:** which task's output was wrong, and why.
**Fix:** what changed, in which files.
**Verified by:** the command run, and what it printed.
```

_None yet._

---

## Decisions

Anything that binds later loops: a deviation from the plan, a dependency added, an interface changed, a deferred idea. Recording it here is what makes it visible to a loop that has no memory of the conversation.

Template:

```
### D<n> — <short title>, <date>, Loop <n>

**Decision:** what was decided.
**Because:** the reasoning.
**Affects:** which later tasks or loops need to know.
```

### D0 — Loop scaffold lives in `loops/`, 2026-08-07, pre-Loop-1

**Decision:** The loop-to-loop handoff is a `loops/` tree — `shared/` plus one folder per loop — rather than the single root-level `LOOP-STATE.md` named in the plan. `CLAUDE.md` at the repo root carries the standing rules and is read at the start of every session. The spec and plan are copied into `plan/` so loops are self-contained within the repo.

**Because:** Five loops appending to one flat file makes each loop read four loops' worth of irrelevant history to find its own handoff. Splitting per-loop state from cross-loop state means a loop reads `shared/` plus its own folder and nothing else. Copying the plan in puts checkbox progress under version control alongside the code it describes.

**Affects:** Loop 1 Task 1 Step 7 says to create `~/graph-lab/LOOP-STATE.md`. **That step is superseded** — write to `loops/loop-1-foundation/state.md` and `loops/shared/state.md` instead. Every later instruction in the plan reading "append to `LOOP-STATE.md`" means: append the task entry to your loop's `state.md`, and the gate entry to `shared/state.md`. Loop 1 should not create a root `LOOP-STATE.md`.

### D1 — `~/graph-lab` already exists, initialised and pushed, 2026-08-07, pre-Loop-1

**Decision:** The repo directory, its git history, and its `origin` remote were created ahead of Loop 1, when this scaffold was written. `origin` is `https://github.com/ayeshakhalid192007-dev/graph-lab` — private, default branch `main`.

**Because:** The scaffold and `CLAUDE.md` had to live somewhere version-controlled before any loop ran, and the user created the remote and asked for the scaffold to be pushed.

**Affects:**
- **Loop 1 Task 1 Step 1 is partly done.** `~/graph-lab` exists, `git init -b main` has run, and there are commits. **Do not re-run `git init` and do not delete anything already in the tree.** The remaining work in that step is `.nvmrc` and `.gitignore` — note that `.gitignore` already exists and should be extended, not overwritten, if it is missing entries.
- **All five loops run from `~/graph-lab`.** The plan's Loop Charter says to start Loop 1 from `~/graph-landing` because `~/graph-lab` did not yet exist; it does now, so that instruction no longer applies.
- **The plan and spec now live at `plan/` inside this repo.** Read them there. The copies in `~/graph-landing` are the drafting originals and are no longer the ones loops tick checkboxes in.
- **C18 is unchanged.** A remote existing does not pre-authorise the Loop 5 Task 22 deploy: pushing *site code*, writing the workflow, and enabling Pages still need explicit confirmation at that step.

### D2 — `check-sync.mjs` excludes by path, not by filename glob, 2026-08-07, Loop 1

**Decision:** Task 3 Step 2's `scripts/check-sync.mjs` as written in the plan diffs with `--exclude=SOURCE.json --exclude=README.md`. That is wrong and shipped a check that could not fail. It has been changed: the two hand-maintained files, `content/README.md` and `content/SOURCE.json`, are copied into the temp tree by exact path before the diff, and the diff then runs with **no exclusions at all**.

**Because:** `diff --exclude=README.md` matches the basename at every depth. `content/` holds **44** `README.md` files and only the root one is hand-written — the other 43 are course content: 17 doc-tree READMEs (real pages) and all 24 starter kits' READMEs (the primary file the Loop 3 starter viewer shows). The plan's version exempted every one of them from the byte comparison. Task 3 Step 5 caught this exactly as designed: appending a line to `content/docs/README.md` and running `npm run sync:check` printed `sync:check OK — content/ matches af5321e3`, exit 0. A gate that cannot go red is not a gate. After the fix the same edit prints `Files …/content/docs/README.md and …/docs/README.md differ`, exit 1, and an edit to `content/starters/audit-loop/README.md` is caught too; clean content is still green.

**Affects:** Nobody needs to change code — the script's interface and its npm script name are unchanged. But **`sync:check` is now strictly stricter than the plan describes**, and every later loop runs it inside `verify:2`/`verify:3`/`verify:4`/`verify:all`. A loop that touches any file under `content/` for any reason — including a starter-kit README it assumed was "just a readme" — will now go red where the plan's version would have stayed green. That is the intent. C1 is enforced across all 224 files, not 181 of them.

---

## Open questions for the user

Questions a loop hit, recorded rather than guessed at. A loop that adds one here stops (Rule 5).

_None yet._

---

## Known deviations from the spec

The spec is authoritative. Anything this build does differently, and why, goes here so the gap is visible rather than silent.

_None yet._
