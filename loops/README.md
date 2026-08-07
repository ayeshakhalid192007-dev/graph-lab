# Loops

Five separate, independent `/loop` instances build this site. **One loop per section — not one loop reused across sections, and not one combined loop spanning the whole build.**

Each loop is created fresh only after the previous loop's gate has been reviewed and approved. Each stops permanently at its own gate. Loops share no runtime state; they hand off through the files in this tree.

---

## Layout

```
loops/
├── README.md                    this file
├── shared/                      read by every loop, every time
│   ├── goal.md                  the one goal — what "done" means
│   ├── loop.md                  the protocol every loop obeys
│   ├── constraints.md           global constraints binding every task
│   ├── verification.md          gate commands and the evidence discipline
│   ├── handoff.md               the loop-to-loop handoff contract
│   └── state.md                 gate ledger · cross-loop repairs · decisions
├── loop-1-foundation/           Tasks 1–4
├── loop-2-render/               Tasks 5–9
├── loop-3-interactive/          Tasks 10–14
├── loop-4-landing/              Tasks 15–18
└── loop-5-deploy/               Tasks 19–22
```

Every loop folder holds the same four files:

| File | Holds |
| --- | --- |
| `loop.md` | Scope, boundaries, the exact `/loop` command to type, and what this loop must not touch |
| `tasks.md` | The loop's task checkboxes, with each task's files, interfaces, and verification |
| `gate.md` | The exit condition, the gate command, and what to report when stopping |
| `state.md` | This loop's task log, plus its own blockers |

---

## The five loops

| Loop | Scope | Tasks | Gate |
| --- | --- | --- | --- |
| [1 — Foundation & pipeline](loop-1-foundation/loop.md) | Repo scaffold, sync pipeline, CI checks, Blueprint tokens, app shell | 1–4 | `npm run verify:1` |
| [2 — Render layer & 86 doc pages](loop-2-render/loop.md) | content libs, link rewriting, markdown pipeline, doc route, link check | 5–9 | `npm run verify:2` |
| [3 — Interactive surfaces](loop-3-interactive/loop.md) | tracks, patterns, starters, quizzes, flashcards, projects, resources, certification | 10–14 | `npm run verify:3` |
| [4 — Landing, identity, search](loop-4-landing/loop.md) | search index + dialog, landing page, animated diagrams, sitemap/llms.txt/404/OG | 15–18 | `npm run verify:4` |
| [5 — Polish, verify, deploy](loop-5-deploy/loop.md) | responsive, a11y, dual-theme, full DoD, deploy | 19–22 | `npm run verify:all` |

The `verify:N` scripts are cumulative on purpose — Loop 3 cannot silently break Loop 2's link check.

---

## How to run them

Run each from `~/graph-lab`. Type them **one at a time, in order**, each only after the previous loop's gate has been reviewed and approved. The exact command for each loop is in its own `loop.md`; they are self-paced, with no interval argument, because build work paces itself off verification results rather than a clock.

After a loop stops:

1. Read its report — the gate output, and its `state.md`.
2. Check `shared/state.md` for anything under *Cross-loop repairs*, *Decisions*, or *Open questions*.
3. Review the work.
4. Move that loop's row in the Gate ledger to `approved`.
5. Start the next loop by hand.

**Only you move a row to `approved`.** A loop sets its own row to `gate green, awaiting review` and stops there.

---

## The five rules

1. **A loop only ever touches its own tasks.** A defect in an earlier loop's output gets fixed and recorded under *Cross-loop repairs* — that is a repair, not a licence to start later work.
2. **A loop stops permanently at its gate.** No automatic handoff.
3. **State files are the handoff.** One entry per task; one entry per gate.
4. **Verification before checkbox.** Command run, output read. Red means not done.
5. **A blocked loop stops and reports.** Blocked ≠ done.

Long form in [`shared/loop.md`](shared/loop.md).
