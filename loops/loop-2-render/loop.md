# Loop 2 — Render Layer and the 86 Doc Pages

**Tasks:** 5–9 · **Gate:** `npm run verify:2`

---

## Read first

`CLAUDE.md` → `shared/goal.md` → `shared/constraints.md` → `shared/state.md` → this file → `tasks.md` → `../loop-1-foundation/state.md` → the plan's Loop 2 section.

---

## Entry condition

**Loop 1 gate approved.** Check the Gate ledger in `shared/state.md`: the Loop 1 row must read `approved`, not `gate green, awaiting review`. If it does not, stop and say so.

---

## Exit condition

`npm run verify:2` green — all 86 doc pages build and every internal link resolves.

---

## Scope

| Task | Builds |
| --- | --- |
| 5 | `lib/content.ts`, `lib/docs.ts` — reads `content/`, frontmatter, `SOURCE.json`; slug map, roadmap, sidebar tree, prev/next |
| 6 | `lib/links.ts` — relative `.md` link → site route |
| 7 | `lib/markdown.ts`, `components/content/CodeBlock.tsx`, `GraphDiagram.tsx` — the remark/rehype pipeline |
| 8 | The doc route and its chrome — `DocSidebar`, `DocToc`, `DocBreadcrumbs`, `DocFooterNav`, `app/docs/[...slug]/page.tsx`, `app/docs/page.tsx` |
| 9 | `scripts/check-links.mjs` — validates every internal link in the emitted `out/` |

This is the loop that turns 86 markdown files into 86 reachable web pages. It is the largest single jump in the build.

---

## What this loop must NOT touch

- **Anything in Tasks 10–22.** No tracks, patterns, quizzes, certification, landing page, or search.
- **`CodeTabs`, `Callout`, `CheckYourself`** — constraint C4. Zero content exercises them. Their degraded fallbacks are correct output: paired fences render as two ordinary code blocks, a GitHub alert renders as a plain blockquote, a comment marker renders as nothing. **Do not build them because the pipeline "could" support them.**
- **`TwoGraphsSplit`, `LifecycleDiagram`, `SubgraphViewer` in doc pages** — constraint C5. Landing-page components only. Putting them in doc pages needs a marker convention inside `docs/`, which is a course-content change.
- **MDX** — constraint C3. All component substitution is pattern-matching on ordinary markdown inside `lib/markdown.ts`.
- **`content/`** — constraint C1. If a page reads wrong, the fix belongs in the course repo, not here.

---

## Watch for

- **The three deferred components are a decision, not an oversight.** Their fallbacks are the specified behaviour. Record any content that *would* have exercised them under *Known deviations* in `shared/state.md` — that would contradict the 2026-08-07 audit and is worth knowing.
- **`lib/links.ts` resolves the way GitHub does**, then maps the repo path to a site route: `../02-foundations/glossary.md#node` → `/docs/02-foundations/glossary/#node`. A link resolving to no known page **fails the link check** rather than shipping dead.
- **Shiki highlights at build time.** Fenced blocks ship zero client-side JavaScript. Dual-theme wiring must actually switch — a code block that stays light-themed in dark mode means the `.dark` selector needs configuring. Loop 5 Task 20 re-checks this, but catching it here is cheaper.
- **Mermaid renders client-side.** Diagrams are absent from the prerendered HTML by design; each keeps its source text as a no-JS fallback. This is an accepted risk in the spec, not a bug to fix.
- **Every bare `href`/`src` goes through `withBasePath()`** from Loop 1's `lib/base-path.ts`.
- **Assert the counts.** 86 doc pages, 20 mermaid fences across 20 files, 41 ` ```markdown ` fences, 23 other fenced blocks. A drift from these is a defect even when nothing is red.

---

## Interfaces later loops import

Task 5's exports are consumed by name across Loops 3 and 4 — `getRoadmap()` alone is used by Loop 3 Tasks 10 and 14. Record the **real, shipped** signatures in `state.md`, not the planned ones, if they differ. A renamed export that goes unrecorded is how Loop 4's build breaks for a reason nobody can find.

---

## The command

Run from `~/graph-lab`:

```
/loop Read ~/graph-lab/CLAUDE.md, ~/graph-lab/loops/shared/goal.md, ~/graph-lab/loops/shared/constraints.md, ~/graph-lab/loops/shared/state.md, ~/graph-lab/loops/loop-2-render/loop.md, and ~/graph-lab/loops/loop-1-foundation/state.md. Confirm the Loop 1 row in the Gate ledger reads approved before starting. Execute Loop 2 only (Tasks 5-9) from ~/graph-lab/plan/2026-08-07-graph-lab-implementation-plan.md using superpowers:subagent-driven-development. Do the next unchecked step, run its verification command and read the output, tick the checkbox in both the plan and loops/loop-2-render/tasks.md, append an entry to loops/loop-2-render/state.md, and commit. When all Task 5-9 checkboxes are ticked and `npm run verify:2` is green, append the gate entry to loops/shared/state.md, STOP this loop permanently, and report the gate output. Do not start Loop 3.
```
